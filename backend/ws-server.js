// Node.js WebSocket + Expressサーバ
import express from 'express'
import http from 'http'
import { WebSocketServer } from 'ws'
// import { insertReading } from './db.js'

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

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString())
      console.log("?? Raw data:", message.toString())
      console.log('?? RECEIVE:', data)

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
      const temperature = data.temperature
      const humidity = data.humidity
      const pressure = data.pressure
      const gas = data.gas
      // insertReading({ temperature, humidity, pressure, gas })
      // console.log(`?? Saving DB: ${temperature}°C / ${humidity}% / ${pressure}hPa / ${gas} ohms`)
      // フロントエンド接続クライアントにブロードキャスト
      clients.forEach(client => {
        if (client.readyState === ws.OPEN) {
          client.send(JSON.stringify(response))
        }
      })
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
