<script setup>
import { ref, onMounted, computed  } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart, LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip
} from 'chart.js';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip);

const labels = ref([]);
const tempData = ref([]);
const humData  = ref([]);
const pressData = ref([]);

const fetchData = async () => {
  const res = await fetch('/api/sensor/today');
  const json = await res.json();
  labels.value     = json.map(v => v.label);
  tempData.value   = json.map(v => v.temperature);
  humData.value    = json.map(v => v.humidity);
  pressData.value  = json.map(v => v.pressure);
};

onMounted(() => {
  fetchData();
  // 1 分ごとにポーリングしたい場合
  setInterval(fetchData, 60_000);
});

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: 'Temperature (°C)',
      data: tempData.value,
      borderWidth: 2,
      tension: 0.3
    },
    {
      label: 'Humidity (%)',
      data: humData.value,
      borderWidth: 2,
      tension: 0.3
    },
  ]
}));

const chartOptions = {
  responsive: true,
  interaction: { mode: 'index', intersect: false },
  scales: {
    y: { beginAtZero: false }
  }
};
</script>

<template>
  <Line :data="chartData" :options="chartOptions" />
</template>
