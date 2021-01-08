<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <characters
      v-if="characters"
     :characters="characters"
     ></characters>
    <div>
      <v-text-field
        label="Name"
        v-model="name"
      ></v-text-field>
      <v-text-field
        label="Description"
        v-model="description"
      ></v-text-field>
      <v-btn @click="addNewCharacter">Add new character</v-btn>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
// @ is an alias to /src
import Characters from "@/components/Characters.vue";

export default {
  name: "Home",
  components: {
    Characters
  },
  data() {
    return {
      name: null,
      description: null,
    };
  },
  computed: {
    characters() {
      return this.$store.state.characters;
    }
  },
  methods: {
    ...mapActions(["fetchCharacters", "addCharacter"]),
    addNewCharacter() {
      this.addCharacter({ 
        name: this.name,
        description: this.description,
      })
      .then(() => {
        this.name = null;
        this.description = null;
      });
    },
  },
  mounted() {
    this.fetchCharacters();
  }
};
</script>
