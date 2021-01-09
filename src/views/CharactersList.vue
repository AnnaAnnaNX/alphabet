<template>
  <div class="pa-sm-10">
    <div class="display-1 text-center mt-3">
      List characters
    </div>
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <characters
      v-if="characters"
     :characters="characters"
     >
      <v-dialog
        v-model="dialog"
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            fab
            medium
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card>
          <form-add-character
            v-if="dialog"
            v-on:close-modal="closeModal"
          ></form-add-character>
        </v-card>
      </v-dialog>
     </characters>

    

    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
// @ is an alias to /src
import Characters from "@/components/Characters.vue";
import FormAddCharacter from '../components/FormAddCharacter.vue';

export default {
  name: "CharactersList",
  components: {
    Characters,
    FormAddCharacter
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    characters() {
      return this.$store.state.characters;
    }
  },
  methods: {
    ...mapActions(["fetchCharacters", "addCharacter"]),
    closeModal() {
      this.dialog = false;
    },
  },
  mounted() {
    this.fetchCharacters();
  }
};
</script>
