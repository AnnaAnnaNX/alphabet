<template>
  <div class="pa-sm-10">
    <div class="display-1 text-center mt-3">
      edit character # {{ $route.params.id }}
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
