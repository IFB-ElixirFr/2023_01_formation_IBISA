<template>
  <h2>Résultats</h2>
  <div class="q-pa-md">
    <q-table
      title="Evaluation du stockage de données"
      :rows="importStore.dataDic"
      :columns="importStore.colnames"
      row-key="name"
    />
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