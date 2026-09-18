package db

import (
	"database/sql"
	"encoding/json"
	"strings"
	"testing"
)

func testDB(t *testing.T) *sql.DB {
	t.Helper()
	sqlDB, err := Open(":memory:")
	if err != nil {
		t.Fatalf("open: %v", err)
	}
	t.Cleanup(func() { sqlDB.Close() })
	if err := Migrate(sqlDB); err != nil {
		t.Fatalf("migrate: %v", err)
	}
	return sqlDB
}

func TestSeedIsIdempotent(t *testing.T) {
	sqlDB := testDB(t)

	if err := Seed(sqlDB); err != nil {
		t.Fatalf("seed: %v", err)
	}
	if err := Seed(sqlDB); err != nil {
		t.Fatalf("second seed: %v", err)
	}

	cities, err := ListCities(sqlDB)
	if err != nil {
		t.Fatalf("list cities: %v", err)
	}
	if len(cities) != 6 {
		t.Fatalf("want 6 cities after double seed, got %d", len(cities))
	}
}

func TestSeedStoryOrder(t *testing.T) {
	sqlDB := testDB(t)
	if err := Seed(sqlDB); err != nil {
		t.Fatalf("seed: %v", err)
	}

	detail, err := GetCityDetail(sqlDB, "krakow")
	if err != nil {
		t.Fatalf("get city: %v", err)
	}

	want := []string{"hejnal", "smok", "wieze", "lajkonik", "golebie", "rynek"}
	if len(detail.Stories) != len(want) {
		t.Fatalf("want %d stories, got %d", len(want), len(detail.Stories))
	}
	for i, id := range want {
		if detail.Stories[i].ID != id {
			t.Fatalf("story %d: want %s, got %s", i, id, detail.Stories[i].ID)
		}
	}
}

func TestGetStoryNotFound(t *testing.T) {
	sqlDB := testDB(t)
	if err := Seed(sqlDB); err != nil {
		t.Fatalf("seed: %v", err)
	}

	if _, err := GetStory(sqlDB, "krakow", "does-not-exist"); err != ErrNotFound {
		t.Fatalf("want ErrNotFound, got %v", err)
	}
}

func TestGetStoryWrongCity(t *testing.T) {
	sqlDB := testDB(t)
	if err := Seed(sqlDB); err != nil {
		t.Fatalf("seed: %v", err)
	}

	// "hejnal" exists, but not under "warsaw".
	if _, err := GetStory(sqlDB, "warsaw", "hejnal"); err != ErrNotFound {
		t.Fatalf("want ErrNotFound, got %v", err)
	}
}

func TestGetCityDetailNotFound(t *testing.T) {
	sqlDB := testDB(t)
	if err := Seed(sqlDB); err != nil {
		t.Fatalf("seed: %v", err)
	}

	if _, err := GetCityDetail(sqlDB, "atlantis"); err != ErrNotFound {
		t.Fatalf("want ErrNotFound, got %v", err)
	}
}

func TestListCitiesOrder(t *testing.T) {
	sqlDB := testDB(t)
	if err := Seed(sqlDB); err != nil {
		t.Fatalf("seed: %v", err)
	}

	cities, err := ListCities(sqlDB)
	if err != nil {
		t.Fatalf("list cities: %v", err)
	}

	want := []string{"krakow", "warsaw", "gdansk", "wroclaw", "poznan", "lublin"}
	if len(cities) != len(want) {
		t.Fatalf("want %d cities, got %d", len(want), len(cities))
	}
	for i, id := range want {
		if cities[i].ID != id {
			t.Fatalf("city %d: want %s, got %s", i, id, cities[i].ID)
		}
	}
	if cities[1].Unlocked {
		t.Fatalf("want warsaw locked")
	}
	if !cities[0].Unlocked {
		t.Fatalf("want krakow unlocked")
	}
}

func TestCityDetailHasNoGameOrLegend(t *testing.T) {
	sqlDB := testDB(t)
	if err := Seed(sqlDB); err != nil {
		t.Fatalf("seed: %v", err)
	}

	detail, err := GetCityDetail(sqlDB, "krakow")
	if err != nil {
		t.Fatalf("get city: %v", err)
	}

	// The wire payload must never leak the full story's game/legend/fact
	// into the city listing — only StorySummary's id/title/place/pin.
	payload, err := json.Marshal(detail)
	if err != nil {
		t.Fatalf("marshal: %v", err)
	}
	body := string(payload)
	for _, forbidden := range []string{`"game"`, `"legend"`, `"fact"`, `"seeToday"`} {
		if strings.Contains(body, forbidden) {
			t.Fatalf("city detail payload leaked %s: %s", forbidden, body)
		}
	}
}
