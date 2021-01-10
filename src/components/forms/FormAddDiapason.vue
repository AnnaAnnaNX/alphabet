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
        :items="sourcies || []"
        v-model="source"
        item-text="filename"
        item-value="id"
        label="Source"
        return-object
        @input="getDuration()"
      ></v-select>
      <div>
        Set diapason [need choose a source]
      </div>
      <v-row>
        <v-col>
          <div>
            <v-range-slider
              v-model="diapason"
              :min="0"
              :max="duration || 0"
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
            @click="isPlay ? stop() : play()"            
            :disabled="!duration"
          >
            <v-icon>
              {{  isPlay ? 'mdi-pause' : 'mdi-play' }}
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
        @click="save()"
      >Add new diapason</v-btn>
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
    character_id: Number,
  },
  data() {
    return {
      symbol: null,
      source: null,
      diapason: [0, 10],
      audioElement: null,
      duration: null,
      isPlay: null,
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
  beforeDestroy() {
    this.stop();
  },
  methods: {
    ...mapActions(["addDiapason"]),
    close() {
      this.$emit('close-modal');
    },
    getDuration() {
      this.duration = null;
      if (!this.source || !this.source.link) {
        return;
      }
      this.stop();    
      this.audioElement = new Audio(this.source.link);
      this.audioElement.onloadedmetadata = () => {
        this.duration = parseInt(this.audioElement.duration);
      };
    },
    play() {
      if (!this.source || !this.source.link) {
        return;
      }
      if (!this.audioElement) {
        this.audioElement = new Audio(`${this.source.link}#t=${this.diapason[0]},${this.diapason[1]}`);
        this.audioElement.onloadedmetadata = () => {
          this.audioElement.play();
          this.isPlay = true;
        };
      } else {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.audioElement = new Audio(`${this.source.link}#t=${this.diapason[0]},${this.diapason[1]}`);
        this.audioElement.onloadedmetadata = () => {
          this.audioElement.play();
          this.isPlay = true;
        };
      }
    },
    stop() {
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.isPlay = false;
      }
    },
    save() {
      if (this.symbol
        && this.source
        && this.source.id
        && this.diapason[1]) {
        this.addDiapason({ 
          sourcies_id: this.source.id,
          character_id: this.character_id,
          symbol: this.symbol,
          begin: this.diapason[0],
          end: this.diapason[1]
        })
        .then(() => {
          this.$emit('close-modal');
        });
      }
    },
  },
};
</script>

<style scoped>
</style>