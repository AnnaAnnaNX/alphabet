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
    </v-card-text>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ShowCharacter",
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