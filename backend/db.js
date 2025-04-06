// backend/db.js
import Database from 'better-sqlite3'

const db = new Database('kukan.db')

// テーブル初期化
db.prepare(`
  CREATE TABLE IF NOT EXISTS readings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    temperature REAL,
    humidity REAL,
    pressure REAL,
    gas REAL
  )
`).run()

export function insertReading({ temperature, humidity, pressure, gas }) {
  db.prepare(`
    INSERT INTO readings (temperature, humidity, pressure, gas)
    VALUES (?, ?, ?, ?)
  `).run(temperature, humidity, pressure, gas)
}
