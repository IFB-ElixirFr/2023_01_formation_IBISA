<template>
  <h3>Statistiques</h3>

  <p>
    Le questionnaire a été construit à partir du fichier
    <code>Evaluation de la démarche d'homologation 2017 - v.2</code> disponible
    sur le site de
    <a
      href="https://www.ssi.gouv.fr/guide/lhomologation-de-securite-en-neuf-etapes-simples/"
      target="_blank"
      >ANSSI</a
    >.
  </p>

  <h4>Estimation du besoin de sécurité</h4>
  <div class="q-pa-md row items-start q-gutter-md justify-center">
    <q-card
      v-for="(c, index) in importStore.dataStatsSecurity"
      :key="index"
      flat
      bordered
      style="width: 100%"
    >
      <q-card-section horizontal>
        <q-card-section
          :style="{ background: color(c.score) }"
        >
          <div style="width: 200px">
            <h2>{{ c.score }}</h2>
          </div>
        </q-card-section>

        <q-separator vertical />

        <q-card-section>
          <div class="row full-height full-width items-center">
            <span class="text-h5">{{ c.question }} </span>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>

  <h4>Évaluation de la maturité SSI</h4>
  <div class="q-pa-md row items-start q-gutter-md justify-center">
    <q-card
      v-for="(c, index) in importStore.dataStatsMaturity"
      :key="index"
      flat
      bordered
      style="width: 100%"
    >
      <q-card-section horizontal>
        <q-card-section
          :style="{ background: color(c.score) }"
        >
          <div style="width: 200px">
            <h2>{{ c.score }}</h2>
          </div>
        </q-card-section>

        <q-separator vertical />

        <q-card-section>
          <div class="row full-height full-width items-center">
            <span class="text-h5">{{ c.question }} </span>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
  <br />
  <br />
  <br />
</template>


<script>
export default {
  async setup() {
    const importStore = useImportStore();
    await importStore.import();
    return { importStore };
  },
  data() {
    return {};
  },
  methods: {
    color(value) {
      value = parseFloat(value.replaceAll(",", "."));
      switch (true) {
        case value < 1:
          return "rgba(255, 0, 0 ,0.4)";
        case value < 2:
          return "rgba(255, 128, 0, 0.4)";
        case value < 3:
          return "rgba(255, 255, 0 ,0.4)";
        case value < 4:
          return "rgba(128, 255, 0 ,0.4)";
        case value <= 5:
          return "rgba(0, 153, 0 ,0.4)";
        default:
          return "white";
      }
    },
  },
};
</script>
