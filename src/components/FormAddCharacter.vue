<template>
  <v-card class="pa-3">
    <v-card-title>
      Add character
    </v-card-title>
    <v-card-text>
      <v-text-field
        label="Name"
        v-model="name"
        :rules="rules"
      ></v-text-field>
      <v-text-field
        label="Description"
        v-model="description"
        :rules="rules"
      ></v-text-field>
      <v-btn
        color="blue"
        text
        @click="close"
      >Close</v-btn>
      <v-btn
        color="blue"
        text
        @click="addNewCharacter"
      >Add new character</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FormAddCharacter",
  props: {
  },
  data() {
    return {
      name: null,
      description: null,
      rules: [
        value => (!!value || !!value.trim()) || 'required',
        value => ((value.trim() || '').length >= 5) || 'Min 5 significant characters',
        value => ((value.trim() || '').length <= 100) || 'Max 100 characters',
      ],
    };
  },
  methods: {
    ...mapActions(["addCharacter"]),
    addNewCharacter() {
      if (this.name && this.description) {
        this.addCharacter({ 
          name: this.name,
          description: this.description,
        })
        .then(() => {
          this.$emit('close-modal');
        });
      }
    },
    close() {
      this.$emit('close-modal');
    },
  },
};
</script>

<style scoped>
</style>