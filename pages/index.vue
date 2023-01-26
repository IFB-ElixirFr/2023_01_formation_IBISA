<template>
  <h2>Atelier PGD : session 2</h2>
  <p class="text-body1">
    Cette session de formation a pour but de former des responsables et membres
    de plateformes IBISA aux principes FAIR de gestion des données . La
    formation se déroule sur 2 jours avec une alternance de présentations
    générales et techniques, ainsi que des témoignages et ateliers pratiques
    pour travailler sur différents sujets : PGD de structure, métadonnées,
    sécurité des données,...etc.
  </p>

  <p class="text-body2">
    Ce site web a pour objectif d'accompagner plusieurs sessions de cours
    proposées dans cet atelier en particulier pour :
  </p>
  <ul>
    <li>l'évaluation de nos solutions de stockage de données</li>
    <li>l'évaluation du besoin de sécurisation des données</li>
  </ul>

  <h4>Objectifs pédagogiques</h4>
  <p>
    Cette formation est organisée par le
    <a href="https://www.ibisa.net/">GIS IBISA</a> avec la participation l'<a
      href="https://www.france-bioinformatique.fr/en/home/"
      >IFB</a
    >.
  </p>
  <div
    class="
      q-gutter-md
      full-width
      row
      wrap
      justify-center
      items-center
      content-center
    "
  >
    <img src="img/IBiSA.png" style="height: 140px" />
    <img src="img/IFB-HAUT-COULEUR-PETIT.png" style="height: 140px" />
  </div>

  <p>
    Pour plus d'informations, vous pouvez aller sur le site
    <a href="https://moodle.france-bioinformatique.fr/course/view.php?id=16"
      >Moodle</a
    >
    de la formation.
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