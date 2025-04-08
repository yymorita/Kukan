<template>
  <div style="height: 300px;">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { computed } from 'vue'

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
)

const props = defineProps({
  temperatureHistory: { type: Array, default: () => [] },
  humidityHistory: { type: Array, default: () => [] },
  labels: { type: Array, default: () => [] },
})

// 🔐 props を shallow copy
const chartData = computed(() => ({
  labels: props.labels.slice(),
  datasets: [
    {
      label: 'Temperature (°C)',
      data: props.temperatureHistory.slice(),
      borderColor: '#f87171',
      backgroundColor: 'rgba(248,113,113,0.2)',
      tension: 0.4,
    },
    {
      label: 'Humidity (%)',
      data: props.humidityHistory.slice(),
      borderColor: '#60a5fa',
      backgroundColor: 'rgba(96,165,250,0.2)',
      tension: 0.4,
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
}
</script>

<style scoped>
canvas {
  height: 100% !important;
}
</style>
