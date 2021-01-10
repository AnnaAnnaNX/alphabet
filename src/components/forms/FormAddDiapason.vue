<template>
  <v-card class="pa-3">
    <v-card-title>
      Add diapason
    </v-card-title>
    <v-card-text>
      <!-- select sourcies -->
      <v-select
        :items="symbols"
        v-model="symbol"
        label="Symbol"
      ></v-select>
      <v-select
        v-if="sourcies"
        :items="sourcies"
        v-model="source"
        item-text="filename"
        item-value="id"
        label="Source"
        return-object
        @input="getDuration()"
      ></v-select>
      <v-row v-if="duration">
        <v-col>
          <div>
            <v-range-slider
              v-model="diapason"
              :min="0"
              :max="duration"
              class="align-center"
            >
              <template v-slot:prepend>
                {{ 0 }}
              </template>
              <template v-slot:append>
                {{ duration }}
              </template>
            </v-range-slider>
            <div>
              Diapason: {{ diapason }}
            </div>
          </div>
        </v-col>
        <v-col>
          <v-btn
            icon
          >
            <v-icon>
              mdi-play
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue"
        text
        @click="close"
      >Close</v-btn>
      <v-btn
        color="blue"
        text
      >Add new character</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import { englishAlphabet, russianAlphabet } from "../../constants.js";

export default {
  name: "FormAddDiapason",
  props: {
    sourcies: Array,
  },
  data() {
    return {
      symbol: null,
      source: null,
      diapason: [0, 10],
      audioElement: null,
      duration: null,
    };
  },
  computed: {
    symbols() {
      return [
        ...englishAlphabet,
        ...russianAlphabet
      ];
    },
  },
  methods: {
    ...mapActions(["addCharacter"]),
    close() {
      this.$emit('close-modal');
    },
    getDuration() {
      console.log('getDuration');
      this.duration = null;
      if (!this.source || !this.source.link) {
        return;
      }
      this.audioElement = new Audio(this.source.link);
      this.audioElement.onloadedmetadata = () => {
        this.duration = parseInt(this.audioElement.duration);
      };
    },
  },
};
</script>

<style scoped>
</style>