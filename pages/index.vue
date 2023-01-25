<template>
  <div id="main" style="width: 100%; height: 90%"></div>
</template>

<script>
export default {
  setup() {
    const importStore = useImportStore();
    importStore.import();
    importStore.$subscribe((mutation, state) =>  importStore.createChart('main'));
    return { importStore };
  },
  data() {
    return {};
  },
  mounted() {
   this.importStore.createChart('main');
  },

};
</script>

<style>
</style>