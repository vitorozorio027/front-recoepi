<template >
    <div >
      <v-container>
        <v-main>
          <div>
            <dashboard-infocards />
            <dashboard-grafico />
            <dashboard-tabela />
          </div>
        </v-main>
      </v-container>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

definePageMeta({
  layout: 'dms',
});

const TitlePages = useTitlePagesStore()
const nome = ref('SMES - Sistema de Monitoramento de EPIs')
onMounted(() => {
  TitlePages.setPageTitle(`${nome.value}`);
  TitlePages.setDrawerState(false)
});
</script>

