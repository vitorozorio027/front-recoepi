<template>
    <v-app id="inspire">
        

      <div>layouts default</div>
        <slot />
    </v-app>
  </template>

<script setup>
const TitlePages = useTitlePagesStore()
const pageTitle = ref(TitlePages.pageTitle);

watch(() => pageStore.pageTitle, (newTitle) => {
  pageTitle.value = newTitle;
});
</script>



  