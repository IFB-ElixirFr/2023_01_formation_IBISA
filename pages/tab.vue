<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="val in importStore.colnames" class="text-left">
          {{ val }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(val, indextr2) in importStore.dataTable" :key="indextr2">
        <td v-for="(v, index2) in val" :key="index2">{{ v }}</td>
      </tr>
    </tbody>
  </table>
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