<template>
    <div class="chart-container" style="height: 300px;">
      <Line :data="chartData" :options="chartOptions" />
    </div>
</template>
  
  <script setup>
  import { Line } from 'vue-chartjs'
  import {
    Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale,
    Title, Tooltip, Legend
  } from 'chart.js'
  import { computed } from 'vue'
  
  ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend)
  
  const props = defineProps({
    temperatureHistory: { type: Array, default: () => [] },
    humidityHistory: { type: Array, default: () => [] },
    labels: { type: Array, default: () => [] },
  })
  
  const chartData = computed(() => ({
    labels: props.labels.slice(),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: props.temperatureHistory.slice(),
        borderColor: '#f87171',
        backgroundColor: 'rgba(248,113,113,0.2)',
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'Humidity (%)',
        data: props.humidityHistory.slice(),
        borderColor: '#60a5fa',
        backgroundColor: 'rgba(96,165,250,0.2)',
        tension: 0.4,
        yAxisID: 'y1',
      },
    ]
  }))
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Temperature (°C)' },
        position: 'left',
      },
      y1: {
        beginAtZero: true,
        min: 20,
        max: 80,
        title: { display: true, text: 'Humidity (%)' },
        position: 'right',
        grid: { drawOnChartArea: false },
      },
    }
  }
  </script>
  
  <style scoped>
  .chart-wrapper {
    width: 100%;
    max-width: 100%;
    height: 300px;
    margin: 2rem auto;
    box-sizing: border-box;
    overflow-x: auto;
  }
  </style>