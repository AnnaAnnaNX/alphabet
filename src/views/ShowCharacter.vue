<template>
  <div class="pa-sm-10">
    <router-link
      v-if="character"
      class="title"
      :to="`/character/${id}`"
    >
      <!-- <v-img
        v-if="character.avatar"
        class="mt-10"
        :src="character.avatar" alt="avatar"
        style="min-width: 150px; max-width: 30vw; max-height: 30vh;"
      ></v-img> -->
      <v-avatar
        v-if="character.avatar"
        :size="150"
      >
        <img :src="character.avatar" alt="avatar" />
      </v-avatar>
      <span class="display-1 text-center mt-3">
        {{ character.name }}
      </span>
    </router-link>
    <div class="wrap-symbols">
      <v-btn
        :color="playSymbol === symbol ? 'orange' : 'primary'"
        fab
        medium
        dark
        v-for="symbol in symbols"
        :key="symbol"
        class="display-1 mx-5 my-5"
        @click="playSymbol === symbol ? stop() : play(symbol)"
      >
        {{ symbol.toUpperCase() }}
      </v-btn>
    </div>
    <v-btn
      color="primary"
      fab
      medium
      dark
      class="display-1 mx-5 my-5"
      :to="`/character/${id}/edit`"
    >
      <v-icon>
        mdi-pencil
      </v-icon>
    </v-btn>
    <v-btn
      color="primary"
      fab
      medium
      dark
      class="display-1 mx-5 my-5"
      @click="stop()"
      :disabled="!playSymbol"
    >
      <v-icon>
        mdi-stop
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { russianAlphabet, englishAlphabet } from "../constants.js";

export default {
  name: "ShowCharacter",
  components: {
  },
  data() {
    return {
      russianAlphabet,
      englishAlphabet,
      audioElement: null,
      playSymbol: null,
    };
  },
  computed: {
    id() {
      if (!this.$route.params) {
        return null;
      }
      const id = parseInt(this.$route.params.id);
      if (!(typeof id === 'number')) {
        return null;
      }
      return id;
    },
    character() {
      return this.$store.state.character;
    },
    audioObj() {
      if (!this.character) {
        return null;
      }
      const audios = this.character.audios;
      if (!audios) {
        return null;
      }
      const obj = {};
      audios.forEach((audio) => {
        if (audio.symbol)
        obj[audio.symbol] = audio;
      });
      return obj;
    },
    symbols() {
      if (!this.audioObj) {
        return null;
      }
      const arr = Object.keys(this.audioObj);
      return arr.sort();
    },
  },
  beforeDestroy() {
    this.stop();
  },
  methods: {
    ...mapActions(["fetchCharacterWithAudio"]),
    play(symbol) {
      const audio = this.audioObj[symbol];
      console.log(audio);
      if (!audio || !audio.sourcy || !audio.sourcy.link) {
        return;
      }
      const link = audio.sourcy.link;
      if (!this.audioElement) {
        this.audioElement = new Audio(`${link}#t=${audio.begin},${audio.end}`);
        this.audioElement.onloadedmetadata = () => {
          this.audioElement.play();
          this.playSymbol = symbol;
        };
      } else {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.audioElement = new Audio(`${link}#t=${audio.begin},${audio.end}`);
        this.audioElement.onloadedmetadata = () => {
          this.audioElement.play();
          this.playSymbol = symbol;
        };
      }
    },
    stop() {
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.playSymbol = null;
      }
    },
  },
  mounted() {
    this.fetchCharacterWithAudio(this.id);
  },
};
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-evenly;
  height: 200px;
  align-items: center;
}
.wrap-symbols {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>