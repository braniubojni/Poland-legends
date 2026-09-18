CREATE TABLE IF NOT EXISTS cities (
  id TEXT PRIMARY KEY,
  sort_order INTEGER NOT NULL,
  payload TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS stories (
  id TEXT PRIMARY KEY,
  city_id TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  payload TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_stories_city_id ON stories (city_id, sort_order);
