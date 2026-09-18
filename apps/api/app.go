package main

import (
	"database/sql"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/limiter"

	"opowiesci/api/internal/handlers"
	"opowiesci/api/internal/middleware"
)

type Config struct {
	WebOrigin       string
	RateLimitMax    int
	RateLimitWindow time.Duration
}

func NewApp(sqlDB *sql.DB, cfg Config) *fiber.App {
	app := fiber.New(fiber.Config{
		DisableStartupMessage: true,
	})

	app.Use(cors.New(cors.Config{
		AllowOrigins: cfg.WebOrigin,
	}))
	app.Use(middleware.RequestLogger())
	app.Use(limiter.New(limiter.Config{
		Max:        cfg.RateLimitMax,
		Expiration: cfg.RateLimitWindow,
		KeyGenerator: func(c *fiber.Ctx) string {
			return c.IP()
		},
		LimitReached: func(c *fiber.Ctx) error {
			c.Set("Retry-After", strconv.Itoa(int(cfg.RateLimitWindow.Seconds())))
			return c.Status(fiber.StatusTooManyRequests).JSON(fiber.Map{"error": "rate limit exceeded"})
		},
	}))

	app.Get("/healthz", handlers.Health())
	app.Get("/v1/cities", handlers.ListCities(sqlDB))
	app.Get("/v1/cities/:id", handlers.GetCity(sqlDB))
	app.Get("/v1/cities/:id/stories/:storyId", handlers.GetStory(sqlDB))

	return app
}
