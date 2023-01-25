<template>
  <p>
    Cette page permet d'évaluer votre solution de stockage à travers les
    indicateurs suivants
  </p>
  <ul>
    <li v-for="(item, index) in importStore.colnames" :key="index">
      {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  async setup() {
    const importStore = useImportStore();
    await importStore.import();
    return { importStore };
  },
};
</script>

<style>
</style>