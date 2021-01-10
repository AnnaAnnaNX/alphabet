<template>
  <v-card class="pa-3">
    <v-card-title>
      Add source
    </v-card-title>
    <v-card-text>
      <v-text-field
        label="Name"
        v-model="name"
        :rules="rules"
      ></v-text-field>
      <v-text-field
        label="Link"
        v-model="link"
        :rules="rules"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue"
        text
        @click="close"
      >Close</v-btn>
      <v-btn
        color="blue"
        text
        @click="addNewSource()"
      >Add new source</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FormAddSource",
  data() {
    return {
      name: null,
      link: null,
      rules: [
        value => (!value || !!value.trim()) || 'required',
        value => ((!value || value.trim() || '').length >= 5) || 'Min 5 significant characters',
        value => ((!value || value.trim() || '').length <= 1000) || 'Max 1000 characters',
      ],
    };
  },
  methods: {
    ...mapActions(["addSource"]),
    addNewSource() {
      if (this.name && this.link) {
        this.addSource({ 
          name: this.name,
          link: this.link,
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