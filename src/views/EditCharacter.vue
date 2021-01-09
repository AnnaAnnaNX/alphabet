<template>
  <div class="pa-sm-10">
    <router-link
      v-if="character"
      class="title"
      :to="`/character/${id}`"
    >
      <span
        class="display-1 text-center mt-3 orange--text"
      >
        Edit
      </span>
      <v-avatar
        v-if="character.avatar"
        :size="50"
      >
        <img :src="character.avatar" alt="avatar" />
      </v-avatar>
      <span class="display-1 text-center mt-3">
        {{ character.name }}
      </span>
    </router-link>
    <v-tabs
      v-model="tab"
      centered
    >
      <v-tab>Sourcies</v-tab>
      <v-tab>Diapasons</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        1
        {{ fileNameWithAudioArray }}
        <!-- <sourcies
          :sourcies="fileNameWithAudioArray"
        ></sourcies> -->
      </v-tab-item>
      <v-tab-item>
        2
      </v-tab-item>
    </v-tabs-items>
    <!-- <div class="wrap-symbols">
      <v-btn
        color="primary"
        fab
        medium
        dark
        v-for="symbol in symbols"
        :key="symbol"
        class="display-1 mx-5 my-5"
      >
        {{ symbol.toUpperCase() }}
      </v-btn>
    </div> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "EditCharacter",
  components: {
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
    symbolWithAudioObj() {
      if (!this.character) {
        return null;
      }
      const audios = this.character.audios;
      if (!audios) {
        return null;
      }
      const obj = {};
      audios.forEach((audio) => {
        if (audio.symbol) {
          obj[audio.symbol] = audio;
        }
      });
      return obj;
    },
    fileNameWithAudioObj() {
      if (!this.character) {
        return null;
      }
      const audios = this.character.audios;
      if (!audios) {
        return null;
      }
      const obj = {};
      audios.forEach((audio) => {
        if (!audio.fileName) return;
        if (obj[audio.fileName]) {
          obj[audio.fileName].push(audio.symbol);
        } else {
          obj[audio.fileName] = [audio.symbol];
        }
      });
      return obj;
    },
    fileNameWithAudioArray() {
      if (!this.fileNameWithAudioObj) {
        return null;
      }
      return Object.keys(this.fileNameWithAudioObj).map((fileName) => {
        return {
          fileName,
          symbols: this.fileNameWithAudioObj[fileName]
        }
      });
    },
    symbols() {
      if (!this.symbolWithAudioObj) {
        return null;
      }
      const arr = Object.keys(this.symbolWithAudioObj);
      return arr.sort();
    },
  },
  data() {
    return {
      tab: null,
    };
  },
  methods: {
    ...mapActions(["fetchCharacterWithAudio"]),
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
  height: 100px;
  align-items: center;
}
.wrap-symbols {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>