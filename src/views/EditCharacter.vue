<template>
  <div class="pa-sm-10">
    <div class="title">
      <span
        class="display-1 text-center mt-3 orange--text"
      >
        Edit
      </span>
      <router-link
        v-if="character"
        :to="`/character/${id}`"
      >
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
    </div>
    <diapasons-table
      v-if="character"
      :audios="character.audios"
    ></diapasons-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import DiapasonsTable from "../components/tables/DiapasonsTable.vue";

export default {
  name: "EditCharacter",
  components: {
    DiapasonsTable
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