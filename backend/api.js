import express from 'express';
import { pool } from './db.js';

const router = express.Router();

// GET /api/sensor/today
router.get('/sensor/today', async (_req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT
        to_char(created_at AT TIME ZONE 'Asia/Tokyo', 'HH24:MI') AS label,
        temperature, humidity, pressure
      FROM sensor_data
      WHERE created_at >= date_trunc('day', now() AT TIME ZONE 'Asia/Tokyo')
      ORDER BY created_at
    `);
    res.json(rows);          // 例: [{label:"09:15",temperature:22.4,...}, ...]
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'db error' });
  }
});

export default router;
