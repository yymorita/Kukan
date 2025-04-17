// Node.js WebSocket + Expressサーバ
import express from 'express'
import http from 'http'
import { WebSocketServer } from 'ws'
import { pool } from './db.js'

const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({ server , path: '/ws' })

// 静的ファイル配信やAPIルートなど（必要に応じて）
app.get('/', (req, res) => {
  res.send('Kukan WebSocket starting.')
})

// WebSocketクライアント（Vue）一覧
const clients = new Set()

wss.on('connection', (ws, req) => {
  console.log('?? HTTP upgrade request to:', req.url)
  console.log('?? Web Socket Client Connected.')
  clients.add(ws)

  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message.toString())
      console.log('?? RECEIVE:', data)

      const { temperature, humidity, pressure, gas } = data;
      if ([temperature, humidity, pressure, gas].some(v => v === undefined)) {
        return ws.send(JSON.stringify({ error: 'invalid payload' }));
      }
      // 快適度判定ロジック
      const isComfortable =
        data.temperature >= 20 && data.temperature <= 26 &&
        data.humidity >= 40 && data.humidity <= 60

      const response = {
        sensor_id: data.sensor_id,
        temperature: data.temperature,
        humidity: data.humidity,
        pressure: data.pressure,
        gas: data.gas,
        isComfortable: isComfortable,
        message: isComfortable ? 'Comfortable' : 'Unconfortable',
        timestamp: data.timestamp,
      }
      const query = `
      INSERT INTO sensor_data
        (temperature, humidity, pressure, gas)
        VALUES ($1, $2, $3, $4)
        RETURNING id, created_at
    `;
      const values = [temperature, humidity, pressure, gas];
      const { rows } = await pool.query(query, values);
      console.log(`?? Saving DB: ${temperature}°C / ${humidity}% / ${pressure}hPa / ${gas} ohms`)
      // フロントエンド接続クライアントにブロードキャスト
      clients.forEach(client => {
        if (client.readyState === ws.OPEN) {
          client.send(JSON.stringify(response))
        }
      })
      ws.send(JSON.stringify({ status: 'ok', record: rows[0] }));
    } catch (err) {
      console.error('? JSON Parse error:', err.message)
    }
  })

  ws.on('close', () => {
    console.log('? Client disconnected.')
    clients.delete(ws)
  })
})

// サーバ起動
const PORT = 8080
server.listen(PORT, () => {
  console.log(`?? WebSocket + Express Server started: http://localhost:${PORT}`)
})
