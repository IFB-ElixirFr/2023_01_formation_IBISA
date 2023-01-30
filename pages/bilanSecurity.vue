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

  <h3>Fiche bilan</h3>

  <div class="row q-col-gutter-lg">
    <div class="col-3">
      <q-select
        v-model="model"
        :options="importStore.nameUserSecurity"
        label="Pseudo"
      />
    </div>
    <div class="col" ref="bilan">
      <q-card class="my-card" v-if="model !== ''">
        <q-card-section class="text-white" style="background: #014a88">
          <div class="text-h6">
            Évaluation du besoin de sécurité pour {{ fiche.name }}
          </div>
        </q-card-section>

        <q-card-section>
          <div class="row">
            <div class="col text-center">
              <div class="text-subtitle1">Estimation du besoin de sécurité</div>
              <p class="text-h5">
                {{ fiche.interpretationScoreSecurity }}
              </p>
              <p>(score : {{ fiche.ScoreSecurity }})</p>
            </div>
            <div class="col text-center">
              <div class="text-subtitle1">Évaluation de la maturité SSI</div>
              <p class="text-h5">
                {{ fiche.interpretationScoreMaturity.Bilan }}
                <q-btn
                  icon="fa-solid fa-circle-question"
                  round
                  color="primary"
                  size="xs"
                  @click="interpretation = true"
                />
              </p>
              <p>(score : {{ fiche.ScoreMaturity }})</p>
            </div>
          </div>

          <div class="text-subtitle1 text-center">
            Type de démarche
            <p class="text-h4">{{ fiche.typeDemarche }}</p>
          </div>
        </q-card-section>

      </q-card>
    </div>
  </div>
  <q-dialog v-model="interpretation">
    <q-card>
      <q-card-section>
        <div class="text-h6">Interprétation</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <p><b>Niveau</b> : {{ fiche.interpretationScoreMaturity.Niveau }}</p>
        <p>
          <b>Description</b> <br />
          {{ fiche.interpretationScoreMaturity.Description }}
        </p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="OK"
          color="primary"
          @click="interpretation = false"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <br />
  <br />
  <br />
</template>


<script>
import { ref } from "vue";

export default {
  async setup() {
    const importStore = useImportStore();
    await importStore.import();
    return { importStore };
  },
  data() {
    return {
      model: "",
      fiche: {},
      interpretation: ref(false),
    };
  },
  watch: {
    model(newValue, oldValue) {
      if (this.model != "") {
        for (var element of this.importStore.dataComputedSecurity) {
          if (element.name == this.model) {
            this.fiche = element;
            break;
          }
        }
      }
    },
  },
};
</script>
