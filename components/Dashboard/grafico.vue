<template>
  <div class="py-6 mt-6">
    <div>
      <v-row>
        <v-col cols="5">
          <p class="text-caption mb-2 ml-4 text-disabled">Tipo de Filtro</p>
          <v-select
            v-model="selectFilter"
            :items="['Filtro por Data', 'Filtro por Usuário']"
            density="compact"
          >
            <template v-slot:selection="{ item }">
              <p class="text-caption font-weight-bold">{{ item.title }}</p>
            </template>
          </v-select>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="3">
          <p class="text-caption mb-2 ml-4 text-disabled">Data Inicial</p>
          <v-text-field type="date" density="compact"></v-text-field>
        </v-col>
        <v-col cols="3">
          <p class="text-caption mb-2 ml-4 text-disabled">Data Final</p>
          <v-text-field type="date" density="compact"></v-text-field>
        </v-col>
      </v-row>
      <div class="text-end">
        <v-btn variant="flat" color="teal-lighten-1">Filtrar</v-btn>
      </div>

      <v-card elevation="4" class="mt-4 border">
        <v-card-item>
          <canvas id="line-chart"></canvas>
        </v-card-item>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const selectFilter = ref('Filtro por Data');

onMounted(() => {
  const ctx = document.getElementById('line-chart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Quantidade de Usuários Cadastrados',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgba(255, 99, 132, 1)', // Vermelho que combina
          borderWidth: 2,
          fill: false,
        },
        {
          label: 'Quantidade de Usuários Ativos',
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          fill: false,
        },
        {
          label: 'Quantidade de Usuários Desativados',
          data: [18, 48, 77, 9, 100, 27, 60],
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        title: {
          display: true,
          text: 'Estatísticas de Cadastro e Inspeções',
          font: {
            size: 17, // Ajusta o tamanho do texto do título
          },
        },
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Mês',
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Quantidade',
          },
        },
      },
    },
  });
});
</script>

<style scoped>
.v-card {
  height: 350px; /* Ajusta a altura do card para ficar harmoniosa */
}
.v-card-item {
  align-items: center;
  height: 100%;
}
canvas {
  width: 100% !important;
  height: 100% !important;
  max-height: 350px
}
</style>
