// Node.js WebSocket + Expressサーバ
const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

// 静的ファイル配信やAPIルートなど（必要に応じて）
app.get('/', (req, res) => {
  res.send('Kukan WebSocket starting.')
})

// WebSocketクライアント（Vue）一覧
const clients = new Set()

wss.on('connection', (ws, req) => {
  console.log('🌐 Client Connected.')
  clients.add(ws)

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message)
      console.log('📥 RECEIVE:', data)

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

      // フロントエンド接続クライアントにブロードキャスト
      clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(response))
        }
      })
    } catch (err) {
      console.error('❌ JSON Parse error:', err.message)
    }
  })

  ws.on('close', () => {
    console.log('❌ Client disconnected.')
    clients.delete(ws)
  })
})

// サーバ起動
const PORT = 8080
server.listen(PORT, () => {
  console.log(`🚀 WebSocket + Express Server started: http://localhost:${PORT}`)
})