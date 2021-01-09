<template>
  <div class="pa-sm-10">
    <div
      v-if="character"
      class="title"
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
    </div>
    <div class="wrap-symbols">
      <v-btn
        color="primary"
        fab
        medium
        dark
        v-for="symbol in [...symbols, ...symbols,...symbols, ...symbols]"
        :key="symbol"
        class="display-1 mx-5 my-5"
      >
        {{ symbol.toUpperCase() }}
      </v-btn>
    </div>
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