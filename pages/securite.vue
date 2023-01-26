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
