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
  <table class="tableStyle text-center tableStyleCenter">
    <thead>
      <tr>
        <th colspan="2" rowspan="2" style="background: white; border-top: 1px solid white;border-left: 1px solid white;"></th>
        <th colspan="3">Besoin de sécutité du Système</th>
      </tr>
      <tr>

        <th>Faible</th>
        <th>Moyen</th>
        <th>Fort</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td rowspan="3"> Niveau SSI de l'organisme</td>
        <td>Élémentaire</td>
        <td>Pianissimo : démarche autonome a minima</td>
        <td>Mezzo-Forte : démarche assistée approfondie</td>
        <td>Mezzo-Forte : démarche assistée approfondie</td>
      </tr>
      <tr>
        <td>Moyen</td>
        <td>Pianissimo : démarche autonome a minima</td>
        <td>Mezzo-Forte : démarche assistée approfondie</td>
        <td>Mezzo-Forte : démarche assistée approfondie</td>
      </tr>
      <tr>
        <td>Avancé</td>
        <td>Pianissimo : démarche autonome a minima</td>
        <td>Forte : hors champ de ce guide</td>
        <td>Forte : hors champ de ce guide</td>
      </tr>
    </tbody>
  </table>
  <h3>Résultats</h3>
  <div v-for="(i, index1) in  Object.entries(importStore.dataType)" :key="index1">
    <h5>{{ i[0] }}</h5>
    <ul>
      <li v-for="(j, index2) in i[1]" :key="index2" class="text-body1">{{ j }}</li>
    </ul>

  </div>
  <br />
  <br>
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
