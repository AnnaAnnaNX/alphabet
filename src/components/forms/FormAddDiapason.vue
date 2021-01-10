<template>
  <v-card class="pa-3">
    <v-card-title>
      Add diapason
    </v-card-title>
    <v-card-text>
      <!-- select sourcies -->
      <!-- slide for begin, end -->
      <v-text-field
        label="Name"
        v-model="name"
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
        @click="addNewCharacter"
      >Add new character</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FormAddDiapason",
  props: {
  },
  data() {
    return {
      name: null,
      description: null,
      avatar: null,
      rules: [
        value => (!value || !!value.trim()) || 'required',
        value => ((!value || value.trim() || '').length >= 5) || 'Min 5 significant characters',
        value => ((!value || value.trim() || '').length <= 100) || 'Max 100 characters',
      ],
      rulesFile: [
         value => !!value || 'required',
      ],
    };
  },
  mounted() {
    const that = this;
    const input = document.querySelector('#input-avatar');
    input.onchange = function () {
      const file = input.files[0],
        reader = new FileReader();

      reader.onloadend = function () {
        that.avatar =  reader.result;
        // console.log(reader.result);
      };

      reader.readAsDataURL(file);
    };
  },
  methods: {
    ...mapActions(["addCharacter"]),
    addNewCharacter() {
      if (this.name && this.description) {
        this.addCharacter({ 
          name: this.name,
          description: this.description,
          avatar: this.avatar,
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