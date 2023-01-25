<template>
  <h2>Champs</h2>
  <div >
    <p>
      Cette page permet d'évaluer votre solution de stockage à travers les
      indicateurs suivants
    </p>
    <ul>
      <li v-for="(item, index) in importStore.colnames" :key="index">
        {{ item.name }}
      </li>
    </ul>
  </div>
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