<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-img
            src="img/IFB-HAUT-BLANC-PETIT.png"
            style="height: 20px; width: 40px"
          />

          Évaluation de notre solution de stockage de données
        </q-toolbar-title>
        <q-tabs align="left">
          <q-route-tab to="/" label="Home" />
          <q-route-tab to="/stats" label="Stats" />
          <q-route-tab to="/chart" label="Chart" />
          <q-route-tab to="/tab" label="Tab" />
          <q-route-tab to="/about" label="About" />
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <div class="window-height q-pa-lg">
          <router-view />
        </div>
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
};
</script>


<style>
</style>