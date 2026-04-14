<template >
    <div >
      <v-container>
        <v-main>
          <usuarios />
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

onMounted(() => {
  TitlePages.setPageTitle('SMES - Cadastro de Usuários');
  TitlePages.setDrawerState(true)
});
</script>

