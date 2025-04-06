<template>
  <div class="dashboard">
    <h1 class="title">Kukan</h1>
    <div class="sensor-card">
      <div class="value">
        <span class="label">Temperature</span>
        <span class="data">{{ temperature }} ℃</span>
      </div>
      <div class="value">
        <span class="label">Humidity</span>
        <span class="data">{{ humidity }} %</span>
      </div>
      <div class="value">
        <span class="label">Pressure</span>
        <span class="data">{{ pressure }} hPa</span>
      </div>
      <div class="value">
        <span class="label">Gas</span>
        <span class="data">{{ gas }} Ω</span>
      </div>
      <div class="status" :class="{ comfortable: isComfortable, uncomfortable: !isComfortable }">
        {{ statusMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const temperature = ref(0)
const humidity = ref(0)
const pressure = ref(0)
const gas = ref(0)
const statusMessage = ref('')
const isComfortable = ref(false)

let socket = null

onMounted(() => {
  const WS_URL =
  import.meta.env.MODE === 'development'
    ? 'ws://localhost:8080/ws/'
    : `ws://${window.location.host}/ws/`

  const socket = new WebSocket(WS_URL)

  socket.onopen = () => {
    console.log('✅ WebSocket connected')
  }

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    console.log('📡 RECEIVE:', data)
    temperature.value = data.temperature
    humidity.value = data.humidity
    pressure.value = data.pressure
    gas.value = data.gas
    statusMessage.value = data.message
    isComfortable.value = data.isComfortable
  }

  socket.onerror = (err) => {
    console.error('WebSocket error:', err)
  }

  socket.onclose = () => {
    console.log('❌ WebSocket closed')
  }
})

onBeforeUnmount(() => {
  if (socket) socket.close()
})
</script>

<style scoped>
body, html {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 20rem 10rem;
}

.dashboard {
  font-family: 'Helvetica Neue', sans-serif;
  text-align: center;
  padding: 2vmax;
  background-color: #f9fafb;
  min-height: 100vh;
  width: 100%;
}

.title {
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  margin-bottom: 2rem;
  color: #333;
}

.sensor-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 360px;
  box-sizing: border-box;
}

.value {
  margin-bottom: 1.5rem;
}

.label {
  font-size: 1rem;
  color: #777;
  display: block;
}

.data {
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-weight: bold;
  color: #222;
}

.status {
  font-size: 1.2rem;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 1rem;
}

.comfortable {
  background-color: #d1fae5;
  color: #065f46;
}

.uncomfortable {
  background-color: #fee2e2;
  color: #991b1b;
}
</style>
