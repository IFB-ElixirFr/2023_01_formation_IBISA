<template>
  <h2>Moyenne des scores</h2>
  <div class="q-pa-md row items-start q-gutter-md justify-center">
    <q-card
      v-for="(c, index) in importStore.stats"
      :key="index"
      flat
      bordered
      style="width: 500px"
    >
      <q-card-section horizontal>
        <q-card-section :style="{ 'background': color(c.value)}">
          <h2>{{ c.value }}</h2>
        </q-card-section>

        <q-separator vertical />

        <q-card-section>
          <div class="row full-height full-width items-center">
            <span class="text-h4">{{ c.name }} </span>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
  <div id="boxPlotDiv" style="width: 100%; height: 90%"></div>
</template>

<script>

export default {
  async setup() {
    const importStore = useImportStore();
    await importStore.import();
    importStore.$subscribe((mutation, state) =>  importStore.createBarplot('boxPlotDiv'));
    return { importStore };
  },
  mounted() {
   this.importStore.createBarplot('boxPlotDiv');
  },
  methods: {
    color(value) {
      switch (true) {
        case value < 1:
          return 'rgba(255, 0, 0 ,0.4)';
        case value < 2:
          return 'rgba(255, 128, 0, 0.4)';
        case value < 3:
          return 'rgba(255, 255, 0 ,0.4)';
        case value < 4:
          return 'rgba(128, 255, 0 ,0.4)';
        case value <= 5:
          return 'rgba(0, 153, 0 ,0.4)';
        default:
          return "white";
      }
    },
  },
};
</script>

<style>
</style>