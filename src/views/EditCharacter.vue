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
    <v-card-text>
      {{ symbols }}
    </v-card-text>
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
</style>