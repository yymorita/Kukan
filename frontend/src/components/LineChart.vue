<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'
import { ref, computed, toRef } from 'vue'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

const props = defineProps({
  temperatureHistory: Array,
  humidityHistory: Array,
  labels: Array,
})

// keyをラベル文字列に依存させる（※履歴が変わったときに再描画）
const chartKey = computed(() => props.labels.join(','))

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Temperature (°C)',
      borderColor: '#f87171',
      backgroundColor: 'rgba(248,113,113,0.2)',
      data: props.temperatureHistory,
      tension: 0.4,
    },
    {
      label: 'Humidity (%)',
      borderColor: '#60a5fa',
      backgroundColor: 'rgba(96,165,250,0.2)',
      data: props.humidityHistory,
      tension: 0.4,
    },
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: false,
      ticks: { stepSize: 5 },
    },
  },
}
</script>

<template>
  <div>
    <Line :data="chartData" :options="chartOptions" :key="chartKey" />
  </div>
</template>

<style scoped>
div {
  height: 300px;
}
</style>
