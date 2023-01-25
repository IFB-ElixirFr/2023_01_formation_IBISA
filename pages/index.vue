<template>
  <h2>Bienvenue</h2>
  <p>
    Bienvenue sur le site compagnon de la formation FAIR pour IBISA. 
  </p>
</template>

<script>
export default {
  setup() {
    const importStore = useImportStore();
    importStore.import();
    return { importStore };
  },
};
</script>

<style>
</style>