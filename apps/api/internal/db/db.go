package db

import (
	"database/sql"
	_ "embed"
	"encoding/json"
	"fmt"

	_ "modernc.org/sqlite"
)

//go:embed schema.sql
var schemaSQL string

//go:embed seed.json
var seedJSON []byte

var ErrNotFound = fmt.Errorf("not found")

func Open(path string) (*sql.DB, error) {
	dsn := path
	if path == "" {
		dsn = ":memory:"
	}
	sqlDB, err := sql.Open("sqlite", dsn)
	if err != nil {
		return nil, fmt.Errorf("open sqlite: %w", err)
	}
	if err := sqlDB.Ping(); err != nil {
		sqlDB.Close()
		return nil, fmt.Errorf("ping sqlite: %w", err)
	}
	return sqlDB, nil
}

func Migrate(sqlDB *sql.DB) error {
	if _, err := sqlDB.Exec(schemaSQL); err != nil {
		return fmt.Errorf("migrate: %w", err)
	}
	return nil
}

// Seed loads the embedded seed data on first run only (cities table empty).
func Seed(sqlDB *sql.DB) error {
	var count int
	if err := sqlDB.QueryRow("SELECT COUNT(*) FROM cities").Scan(&count); err != nil {
		return fmt.Errorf("count cities: %w", err)
	}
	if count > 0 {
		return nil
	}

	var seed seedData
	if err := json.Unmarshal(seedJSON, &seed); err != nil {
		return fmt.Errorf("parse seed: %w", err)
	}

	tx, err := sqlDB.Begin()
	if err != nil {
		return fmt.Errorf("begin seed tx: %w", err)
	}
	defer tx.Rollback()

	for i, city := range seed.Cities {
		payload, err := json.Marshal(city)
		if err != nil {
			return fmt.Errorf("marshal city %s: %w", city.ID, err)
		}
		if _, err := tx.Exec(
			"INSERT INTO cities (id, sort_order, payload) VALUES (?, ?, ?)", city.ID, i, payload,
		); err != nil {
			return fmt.Errorf("insert city %s: %w", city.ID, err)
		}
	}

	for i, story := range seed.Stories {
		payload, err := json.Marshal(story)
		if err != nil {
			return fmt.Errorf("marshal story %s: %w", story.ID, err)
		}
		if _, err := tx.Exec(
			"INSERT INTO stories (id, city_id, sort_order, payload) VALUES (?, ?, ?, ?)",
			story.ID, story.CityID, i, payload,
		); err != nil {
			return fmt.Errorf("insert story %s: %w", story.ID, err)
		}
	}

	return tx.Commit()
}

func ListCities(sqlDB *sql.DB) ([]City, error) {
	rows, err := sqlDB.Query("SELECT payload FROM cities ORDER BY sort_order ASC")
	if err != nil {
		return nil, fmt.Errorf("list cities: %w", err)
	}
	defer rows.Close()

	cities := []City{}
	for rows.Next() {
		var payload string
		if err := rows.Scan(&payload); err != nil {
			return nil, fmt.Errorf("scan city: %w", err)
		}
		var city City
		if err := json.Unmarshal([]byte(payload), &city); err != nil {
			return nil, fmt.Errorf("unmarshal city: %w", err)
		}
		cities = append(cities, city)
	}
	return cities, rows.Err()
}

func GetCityDetail(sqlDB *sql.DB, id string) (*CityDetail, error) {
	var payload string
	err := sqlDB.QueryRow("SELECT payload FROM cities WHERE id = ?", id).Scan(&payload)
	if err == sql.ErrNoRows {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, fmt.Errorf("get city %s: %w", id, err)
	}

	var city City
	if err := json.Unmarshal([]byte(payload), &city); err != nil {
		return nil, fmt.Errorf("unmarshal city %s: %w", id, err)
	}

	rows, err := sqlDB.Query(
		"SELECT payload FROM stories WHERE city_id = ? ORDER BY sort_order ASC", id,
	)
	if err != nil {
		return nil, fmt.Errorf("list stories for city %s: %w", id, err)
	}
	defer rows.Close()

	summaries := []StorySummary{}
	for rows.Next() {
		var storyPayload string
		if err := rows.Scan(&storyPayload); err != nil {
			return nil, fmt.Errorf("scan story: %w", err)
		}
		var story Story
		if err := json.Unmarshal([]byte(storyPayload), &story); err != nil {
			return nil, fmt.Errorf("unmarshal story: %w", err)
		}
		summaries = append(summaries, StorySummary{
			ID:    story.ID,
			Title: story.Title,
			Place: story.Place,
			Pin:   story.Pin,
		})
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return &CityDetail{City: city, Stories: summaries}, nil
}

func GetStory(sqlDB *sql.DB, cityID string, storyID string) (*Story, error) {
	var payload string
	err := sqlDB.QueryRow(
		"SELECT payload FROM stories WHERE city_id = ? AND id = ?", cityID, storyID,
	).Scan(&payload)
	if err == sql.ErrNoRows {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, fmt.Errorf("get story %s/%s: %w", cityID, storyID, err)
	}

	var story Story
	if err := json.Unmarshal([]byte(payload), &story); err != nil {
		return nil, fmt.Errorf("unmarshal story %s/%s: %w", cityID, storyID, err)
	}
	return &story, nil
}
