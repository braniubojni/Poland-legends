package middleware

import (
	"crypto/sha256"
	"encoding/hex"
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
)

// RequestLogger logs method, path, status, duration, and a truncated
// sha256 of the caller IP. It never logs the raw IP or any body.
func RequestLogger() fiber.Handler {
	return func(c *fiber.Ctx) error {
		start := time.Now()
		err := c.Next()
		duration := time.Since(start)

		sum := sha256.Sum256([]byte(c.IP()))
		ipHash := hex.EncodeToString(sum[:])[:12]

		log.Printf(
			"%s %s %d %s ip=%s",
			c.Method(), c.Path(), c.Response().StatusCode(), duration, ipHash,
		)
		return err
	}
}
