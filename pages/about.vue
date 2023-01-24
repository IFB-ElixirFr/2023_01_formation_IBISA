<template>
  <p>
    Cette page permet d'évaluer votre solution de stockage à travers les
    indicateurs suivants
  </p>
  <v-list lines="one">
    <v-list-item
      v-for="item in colHeaders"
      :key="item"
      :title="item"
    ></v-list-item>
  </v-list>
</template>

<script>

</script>

<style>
</style>