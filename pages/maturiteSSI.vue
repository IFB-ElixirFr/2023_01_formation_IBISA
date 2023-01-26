<template>
  <h3>Interprétation du résultats</h3>
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
        <th colspan="2">The table header</th>
        <th>Interprétation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>De 0 à 10</td>
        <td>1- Pratique informelle</td>
        <td>
          Pratiques de base mises en oeuvre de manière informelle et réactive
          sur l'initiative de ceux qui estiment en avoir besoin
        </td>
        <td style="background: #eafaf1">élémentaire</td>
      </tr>
      <tr>
        <td>De 11 à 25</td>
        <td>2 - Pratique répétable et suivie</td>
        <td>
          Pratiques de base mises en oeuvre de façon planifiée et suivie, avec
          un support relatif de l'organisme
        </td>
        <td style="background: #eafaf1">élémentaire</td>
      </tr>
      <tr>
        <td>De 26 à 40</td>
        <td>3 - Processus définis</td>
        <td>
          mise en oeuvre d'un processus décrit, adapté à l'organisme, généralisé
          et bien compris par le management et par les exécutants
        </td>
        <td style="background: #2ecc71">moyen</td>
      </tr>
      <tr>
        <td>De 41 à 50</td>
        <td>4 - Processus contrôlés</td>
        <td>
          le processus est coordonné et contrôlé à l'aide d'indicateurs
          permettant de corriger les défauts constatés
        </td>
        <td style="background: #186a3b; color: white">avancé</td>
      </tr>
      <tr>
        <td>De 51 à 60</td>
        <td>5 - Processus continuellement optimisé</td>
        <td>
          l'amélioration des processus est dynamique, institutionnalisée et
          tient compte de l'évolution du contexte
        </td>
        <td style="background: #186a3b; color: white">avancé</td>
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