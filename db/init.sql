CREATE TABLE IF NOT EXISTS sensor_data (
  id          SERIAL PRIMARY KEY,
  temperature REAL,
  humidity    REAL,
  pressure    REAL,
  gas         REAL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
