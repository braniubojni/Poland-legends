package main

import (
	"log"
	"os"
	"path/filepath"
	"time"

	"opowiesci/api/internal/db"
)

func getenv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func main() {
	dbPath := getenv("DB_PATH", "data/opowiesci.db")
	if dbPath != ":memory:" {
		if err := os.MkdirAll(filepath.Dir(dbPath), 0o755); err != nil {
			log.Fatalf("mkdir db dir: %v", err)
		}
	}

	sqlDB, err := db.Open(dbPath)
	if err != nil {
		log.Fatalf("open db: %v", err)
	}
	defer sqlDB.Close()

	if err := db.Migrate(sqlDB); err != nil {
		log.Fatalf("migrate: %v", err)
	}
	if err := db.Seed(sqlDB); err != nil {
		log.Fatalf("seed: %v", err)
	}

	app := NewApp(sqlDB, Config{
		WebOrigin:       getenv("WEB_ORIGIN", "http://localhost:5173"),
		RateLimitMax:    60,
		RateLimitWindow: time.Minute,
	})

	port := getenv("PORT", "8080")
	log.Printf("opowiesci api listening on :%s", port)
	if err := app.Listen(":" + port); err != nil {
		log.Fatalf("listen: %v", err)
	}
}
