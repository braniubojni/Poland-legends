package main

import (
	"encoding/json"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gofiber/fiber/v2"

	"opowiesci/api/internal/db"
)

func testApp(t *testing.T, cfg Config) *fiber.App {
	t.Helper()
	sqlDB, err := db.Open(":memory:")
	if err != nil {
		t.Fatalf("open db: %v", err)
	}
	t.Cleanup(func() { sqlDB.Close() })

	if err := db.Migrate(sqlDB); err != nil {
		t.Fatalf("migrate: %v", err)
	}
	if err := db.Seed(sqlDB); err != nil {
		t.Fatalf("seed: %v", err)
	}

	return NewApp(sqlDB, cfg)
}

func defaultCfg() Config {
	return Config{WebOrigin: "http://localhost:5173", RateLimitMax: 60, RateLimitWindow: time.Minute}
}

func TestHealthz(t *testing.T) {
	app := testApp(t, defaultCfg())

	resp, err := app.Test(httptest.NewRequest("GET", "/healthz", nil))
	if err != nil {
		t.Fatalf("request: %v", err)
	}
	if resp.StatusCode != 200 {
		t.Fatalf("want 200, got %d", resp.StatusCode)
	}

	var body map[string]string
	json.NewDecoder(resp.Body).Decode(&body)
	if body["status"] != "ok" {
		t.Fatalf("want status ok, got %v", body)
	}
}

func TestListCities(t *testing.T) {
	app := testApp(t, defaultCfg())

	resp, err := app.Test(httptest.NewRequest("GET", "/v1/cities", nil))
	if err != nil {
		t.Fatalf("request: %v", err)
	}
	if resp.StatusCode != 200 {
		t.Fatalf("want 200, got %d", resp.StatusCode)
	}

	var cities []db.City
	if err := json.NewDecoder(resp.Body).Decode(&cities); err != nil {
		t.Fatalf("decode: %v", err)
	}
	if len(cities) != 6 {
		t.Fatalf("want 6 cities, got %d", len(cities))
	}
	if cities[0].ID != "krakow" {
		t.Fatalf("want krakow first, got %s", cities[0].ID)
	}
}

func TestGetCity(t *testing.T) {
	app := testApp(t, defaultCfg())

	resp, err := app.Test(httptest.NewRequest("GET", "/v1/cities/krakow", nil))
	if err != nil {
		t.Fatalf("request: %v", err)
	}
	if resp.StatusCode != 200 {
		t.Fatalf("want 200, got %d", resp.StatusCode)
	}

	var detail db.CityDetail
	if err := json.NewDecoder(resp.Body).Decode(&detail); err != nil {
		t.Fatalf("decode: %v", err)
	}
	if len(detail.Stories) != 6 {
		t.Fatalf("want 6 stories, got %d", len(detail.Stories))
	}
	if detail.Stories[0].ID != "hejnal" {
		t.Fatalf("want hejnal first, got %s", detail.Stories[0].ID)
	}
}

func TestGetCityNotFound(t *testing.T) {
	app := testApp(t, defaultCfg())

	resp, err := app.Test(httptest.NewRequest("GET", "/v1/cities/nope", nil))
	if err != nil {
		t.Fatalf("request: %v", err)
	}
	if resp.StatusCode != 404 {
		t.Fatalf("want 404, got %d", resp.StatusCode)
	}
}

func TestGetStory(t *testing.T) {
	app := testApp(t, defaultCfg())

	resp, err := app.Test(httptest.NewRequest("GET", "/v1/cities/krakow/stories/hejnal", nil))
	if err != nil {
		t.Fatalf("request: %v", err)
	}
	if resp.StatusCode != 200 {
		t.Fatalf("want 200, got %d", resp.StatusCode)
	}

	var story db.Story
	if err := json.NewDecoder(resp.Body).Decode(&story); err != nil {
		t.Fatalf("decode: %v", err)
	}
	if len(story.Game) == 0 {
		t.Fatalf("want game payload, got empty")
	}
}

func TestGetStoryNotFound(t *testing.T) {
	app := testApp(t, defaultCfg())

	resp, err := app.Test(httptest.NewRequest("GET", "/v1/cities/krakow/stories/nope", nil))
	if err != nil {
		t.Fatalf("request: %v", err)
	}
	if resp.StatusCode != 404 {
		t.Fatalf("want 404, got %d", resp.StatusCode)
	}
}

func TestCORSHeader(t *testing.T) {
	app := testApp(t, defaultCfg())

	req := httptest.NewRequest("GET", "/healthz", nil)
	req.Header.Set("Origin", "http://localhost:5173")
	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("request: %v", err)
	}
	if got := resp.Header.Get("Access-Control-Allow-Origin"); got != "http://localhost:5173" {
		t.Fatalf("want CORS origin echoed, got %q", got)
	}
}

func TestCORSRejectsUnknownOrigin(t *testing.T) {
	app := testApp(t, defaultCfg())

	req := httptest.NewRequest("GET", "/healthz", nil)
	req.Header.Set("Origin", "http://evil.example")
	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("request: %v", err)
	}
	if got := resp.Header.Get("Access-Control-Allow-Origin"); got != "" {
		t.Fatalf("want no CORS header for unknown origin, got %q", got)
	}
}

func TestGetStoryWrongCity(t *testing.T) {
	app := testApp(t, defaultCfg())

	// "hejnal" exists under krakow, not warsaw — must 404, not fall through.
	resp, err := app.Test(httptest.NewRequest("GET", "/v1/cities/warsaw/stories/hejnal", nil))
	if err != nil {
		t.Fatalf("request: %v", err)
	}
	if resp.StatusCode != 404 {
		t.Fatalf("want 404, got %d", resp.StatusCode)
	}
}

func TestRateLimit(t *testing.T) {
	cfg := Config{WebOrigin: "http://localhost:5173", RateLimitMax: 2, RateLimitWindow: time.Minute}
	app := testApp(t, cfg)

	for i := 0; i < 2; i++ {
		resp, err := app.Test(httptest.NewRequest("GET", "/healthz", nil))
		if err != nil {
			t.Fatalf("request %d: %v", i, err)
		}
		if resp.StatusCode != 200 {
			t.Fatalf("request %d: want 200, got %d", i, resp.StatusCode)
		}
	}

	resp, err := app.Test(httptest.NewRequest("GET", "/healthz", nil))
	if err != nil {
		t.Fatalf("request 3: %v", err)
	}
	if resp.StatusCode != 429 {
		t.Fatalf("want 429, got %d", resp.StatusCode)
	}
	if resp.Header.Get("Retry-After") == "" {
		t.Fatalf("want Retry-After header on 429")
	}
}
