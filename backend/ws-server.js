// Node.js WebSocket + Expressサーバ
const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

// 静的ファイル配信やAPIルートなど（必要に応じて）
app.get('/', (req, res) => {
  res.send('Kukan WebSocketサーバ起動中')
})

// WebSocketクライアント（Vue）一覧
const clients = new Set()

wss.on('connection', (ws, req) => {
  console.log('🌐 クライアント接続')
  clients.add(ws)

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message)
      console.log('📥 受信:', data)

      // 快適度判定ロジック
      const isComfortable =
        data.temperature >= 20 && data.temperature <= 26 &&
        data.humidity >= 40 && data.humidity <= 60

      const response = {
        sensor_id: data.sensor_id,
        temperature: data.temperature,
        humidity: data.humidity,
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
      console.error('❌ JSONパースエラー:', err.message)
    }
  })

  ws.on('close', () => {
    console.log('❌ クライアント切断')
    clients.delete(ws)
  })
})

// サーバ起動
const PORT = 8080
server.listen(PORT, () => {
  console.log(`🚀 WebSocket + Express サーバ起動: http://localhost:${PORT}`)
})
