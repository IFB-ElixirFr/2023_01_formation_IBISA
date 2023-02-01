<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-img
            src="img/IFB-HAUT-BLANC-PETIT.png"
            style="height: 20px; width: 40px"
          />
          Les ateliers du GIS IBiSA
        </q-toolbar-title>
        <q-tabs align="left">
          <q-route-tab to="/" label="Home" />
          <q-tab label="Stockage">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup to="/stats">
                  <q-item-section>Statistiques</q-item-section>
                </q-item>
                <q-item clickable v-close-popup to="/chart">
                  <q-item-section>Radar</q-item-section>
                </q-item>
                <q-item clickable v-close-popup to="/tab">
                  <q-item-section>Tableau</q-item-section>
                </q-item>
                <q-item clickable v-close-popup to="/about">
                  <q-item-section>Les champs</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-tab>
          <q-tab label="Sécurisation">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup to="/securite">
                  <q-item-section>Sécurité</q-item-section>
                </q-item>
                <q-item clickable v-close-popup to="/maturiteSSI">
                  <q-item-section>Maturité SSI</q-item-section>
                </q-item>
                <q-item clickable v-close-popup to="/typeDemarche">
                  <q-item-section>Type de démarche</q-item-section>
                </q-item>
                <q-item clickable v-close-popup to="/bilanSecurity">
                  <q-item-section>Fiche bilan</q-item-section>
                </q-item>
                <q-item clickable v-close-popup to="/statsSecurity">
                  <q-item-section>Statistiques</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <div class="window-height q-pa-lg">
          <router-view />
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-fab icon="fa-solid fa-question" direction="up" color="primary">
            <q-fab-action
              @click="
                openInNewTab(
                  'https://github.com/IFB-ElixirFr/2023_01_formation_IBISA/issues'
                )
              "
              color="cyan-6"
              icon="fa-solid fa-triangle-exclamation"
            />
            <q-fab-action
              @click="
                openInNewTab(
                  'https://github.com/IFB-ElixirFr/2023_01_formation_IBISA/discussions'
                )
              "
              color="cyan-6"
              icon="fa-solid fa-comments"
            />
            <q-fab-action
              @click="
                openInNewTab(
                  'https://github.com/IFB-ElixirFr/2023_01_formation_IBISA'
                )
              "
              color="cyan-6"
              icon="fa-brands fa-github"
            />
          </q-fab>
        </q-page-sticky>
      </q-page>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white" align="center">
      <div class="q-py-sm">
        This website is maintained by IFB-ElixirFr - 2023
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  methods: {
    onClick() {},
    openInNewTab(url) {
      window.open(url, "_blank", "noreferrer");
    },
  },
};
</script>


<style>
</style>