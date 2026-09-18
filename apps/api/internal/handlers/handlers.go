package handlers

import (
	"database/sql"
	"errors"

	"github.com/gofiber/fiber/v2"

	"opowiesci/api/internal/db"
)

func notFound(c *fiber.Ctx) error {
	return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "not found"})
}

func Health() fiber.Handler {
	return func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"status": "ok"})
	}
}

func ListCities(sqlDB *sql.DB) fiber.Handler {
	return func(c *fiber.Ctx) error {
		cities, err := db.ListCities(sqlDB)
		if err != nil {
			return err
		}
		return c.JSON(cities)
	}
}

func GetCity(sqlDB *sql.DB) fiber.Handler {
	return func(c *fiber.Ctx) error {
		detail, err := db.GetCityDetail(sqlDB, c.Params("id"))
		if errors.Is(err, db.ErrNotFound) {
			return notFound(c)
		}
		if err != nil {
			return err
		}
		return c.JSON(detail)
	}
}

func GetStory(sqlDB *sql.DB) fiber.Handler {
	return func(c *fiber.Ctx) error {
		story, err := db.GetStory(sqlDB, c.Params("id"), c.Params("storyId"))
		if errors.Is(err, db.ErrNotFound) {
			return notFound(c)
		}
		if err != nil {
			return err
		}
		return c.JSON(story)
	}
}
