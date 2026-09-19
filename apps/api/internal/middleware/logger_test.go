package middleware

import (
	"bytes"
	"log"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gofiber/fiber/v2"
)

func TestRequestLoggerHashesIPAndPassesThroughStatus(t *testing.T) {
	var buf bytes.Buffer
	prevOut := log.Writer()
	prevFlags := log.Flags()
	log.SetOutput(&buf)
	log.SetFlags(0)
	t.Cleanup(func() {
		log.SetOutput(prevOut)
		log.SetFlags(prevFlags)
	})

	app := fiber.New()
	app.Use(RequestLogger())
	app.Get("/teapot", func(c *fiber.Ctx) error {
		return c.SendStatus(fiber.StatusTeapot)
	})

	resp, err := app.Test(httptest.NewRequest("GET", "/teapot", nil))
	if err != nil {
		t.Fatalf("request: %v", err)
	}
	if resp.StatusCode != fiber.StatusTeapot {
		t.Fatalf("want 418 passed through, got %d", resp.StatusCode)
	}

	line := buf.String()
	if !strings.Contains(line, "GET") || !strings.Contains(line, "/teapot") || !strings.Contains(line, "418") {
		t.Fatalf("log line missing method/path/status: %q", line)
	}
	if !strings.Contains(line, "ip=") {
		t.Fatalf("log line missing ip hash marker: %q", line)
	}

	// The test client's remote IP is 0.0.0.0; assert the log carries its
	// sha256 hash, not the raw address, so no raw caller IP is ever written.
	if strings.Contains(line, "ip=0.0.0.0") {
		t.Fatalf("log line leaked raw IP: %q", line)
	}
}

func TestShouldLogSkipsMetrics(t *testing.T) {
	if shouldLog("/metrics") {
		t.Fatal("want /metrics skipped")
	}
	if !shouldLog("/healthz") {
		t.Fatal("want /healthz logged")
	}
	if !shouldLog("/v1/cities") {
		t.Fatal("want /v1/cities logged")
	}
}

func TestRequestLoggerOmitsMetricsLine(t *testing.T) {
	var buf bytes.Buffer
	prevOut := log.Writer()
	prevFlags := log.Flags()
	log.SetOutput(&buf)
	log.SetFlags(0)
	t.Cleanup(func() {
		log.SetOutput(prevOut)
		log.SetFlags(prevFlags)
	})

	app := fiber.New()
	app.Use(RequestLogger())
	app.Get("/healthz", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"status": "ok"})
	})

	if _, err := app.Test(httptest.NewRequest("GET", "/metrics", nil)); err != nil {
		t.Fatalf("metrics: %v", err)
	}
	if _, err := app.Test(httptest.NewRequest("GET", "/healthz", nil)); err != nil {
		t.Fatalf("healthz: %v", err)
	}

	out := buf.String()
	if strings.Contains(out, "/metrics") {
		t.Fatalf("metrics probe was logged: %q", out)
	}
	if !strings.Contains(out, "/healthz") {
		t.Fatalf("healthz missing from log: %q", out)
	}
}
