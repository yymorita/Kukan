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
    pressureHistory: { type: Array, default: () => [] },
    gasHistory: { type: Array, default: () => [] },
    labels: { type: Array, default: () => [] },
  })
  
  const chartData = computed(() => ({
    labels: props.labels.slice(),
    datasets: [
      {
        label: 'Pressure (hPa)',
        data: props.pressureHistory.slice(),
        borderColor: '#34d399',
        backgroundColor: 'rgba(52,211,153,0.2)',
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'Gas (Ω)',
        data: props.gasHistory.slice(),
        borderColor: '#facc15',
        backgroundColor: 'rgba(250,204,21,0.2)',
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
        beginAtZero: false,
        title: { display: true, text: 'Pressure (hPa)' },
        position: 'left',
      },
      y1: {
        beginAtZero: false,
        title: { display: true, text: 'Gas (Ω)' },
        position: 'right',
        grid: { drawOnChartArea: false },
      },
    }
  }
  </script>
  
  <style scoped>
.chart-container {
  width: 100%;        /* 🔧 親に追従 */
  height: 300px;      /* 🔧 高さを固定すると描画安定 */
  overflow-x: auto;   /* 🔧 はみ出し回避（任意） */
}
</style>