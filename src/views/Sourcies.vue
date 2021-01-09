<template>
  <div class="pa-sm-10">
    <div class="display-1 text-center mt-3">
      Sourcies
    </div>
    <sourcies-table
      :sourcies="sourcies"
    ></sourcies-table>
    
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SourciesTable from '../components/tables/SourciesTable.vue';

export default {
  name: "Sourcies",
  components: {
    SourciesTable
  },
  data() {
    return {
    };
  },
  computed: {
    sourcies() {
      return this.$store.state.sourcies;
    },
  },
  methods: {
    ...mapActions(["fetchSourcies"]),
  },
  mounted() {
    this.fetchSourcies();
  },
};
</script>
