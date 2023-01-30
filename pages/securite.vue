<template>
  <h3>Estimation des besoins de sécurité</h3>

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
  <table class="tableStyle">
    <thead>
      <tr>
        <th>Somme</th>
        <th>Besoin de sécurité du système</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>De 0 à 6</td>
        <td>1- Faible</td>
      </tr>
      <tr>
        <td>De 7 à 9</td>
        <td>2- Moyen</td>
      </tr>
      <tr>
        <td>De 10 à 16</td>
        <td>3- Fort</td>
      </tr>
    </tbody>
  </table>
  <h3>Résultats</h3>
  <div class="row q-col-gutter-md q-py-lg">
    <div
      class="col-3"
      v-for="(n, index) in importStore.dataSecurity"
      :key="index"
    >
      <div
        class="text-center shadow-1 q-pa-sm"
        :style="{ background: color(n.ScoreSecurity) }"
      >
        <h2>{{ n.ScoreSecurity }}</h2>
        <h4>{{ n.name }}</h4>
      </div>
    </div>
  </div>
  <br />
</template>


<script>
export default {
  async setup() {
    const importStore = useImportStore();
    await importStore.import();
    return { importStore };
  },
  methods: {
    color(value) {
      switch (true) {
        case value <= 6:
          return "yellow";
        case value <= 9:
          return "orange";
        case value <= 16:
          return "red";
        default:
          return "white";
      }
    },
  },
};
</script>
