<template>
  <div class="pa-sm-10">
    <div class="display-1 text-center mt-3">
      Sourcies
    </div>
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
        <form-add-source
          v-if="dialog"
          v-on:close-modal="closeModal"
        ></form-add-source>
      </v-card>
    </v-dialog>
    <sourcies-table
      :sourcies="sourcies"
    ></sourcies-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SourciesTable from '../components/tables/SourciesTable.vue';
import FormAddSource from '../components/forms/FormAddSource.vue';

export default {
  name: "Sourcies",
  components: {
    SourciesTable,
    FormAddSource
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    sourcies() {
      return this.$store.state.sourcies;
    },
  },
  methods: {
    ...mapActions(["fetchSourcies"]),
    closeModal() {
      this.dialog = false;
    },
  },
  mounted() {
    this.fetchSourcies();
  },
};
</script>
