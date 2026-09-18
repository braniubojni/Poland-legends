package db

import "encoding/json"

type Copy struct {
	En string `json:"en"`
	Pl string `json:"pl"`
}

type Coords struct {
	Lat float64 `json:"lat"`
	Lng float64 `json:"lng"`
}

type City struct {
	ID       string `json:"id"`
	Name     Copy   `json:"name"`
	Unlocked bool   `json:"unlocked"`
	Coords   Coords `json:"coords"`
	Blurb    Copy   `json:"blurb"`
}

type StoryImage struct {
	Light string `json:"light"`
	Dark  string `json:"dark"`
}

// Game is a discriminated union (quiz | order | towers) on the TS side.
// It is stored and served as-is, never decoded field-by-field.
type Story struct {
	ID       string          `json:"id"`
	CityID   string          `json:"cityId"`
	Title    Copy            `json:"title"`
	Place    Copy            `json:"place"`
	Pin      Coords          `json:"pin"`
	Image    StoryImage      `json:"image"`
	Legend   Copy            `json:"legend"`
	Fact     Copy            `json:"fact"`
	SeeToday Copy            `json:"seeToday"`
	Game     json.RawMessage `json:"game"`
}

type StorySummary struct {
	ID    string `json:"id"`
	Title Copy   `json:"title"`
	Place Copy   `json:"place"`
	Pin   Coords `json:"pin"`
}

type CityDetail struct {
	City
	Stories []StorySummary `json:"stories"`
}

type seedData struct {
	Cities  []City  `json:"cities"`
	Stories []Story `json:"stories"`
}
