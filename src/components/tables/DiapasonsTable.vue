<template>
  <div v-if="audios">
    <v-data-table
      :headers="headers"
      :items="audios"
      class="elevation-1"
      :search="search"
      :items-per-page="5"
      :mobile-breakpoint="0"
    >     
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "DiapasonsTable",
  props: {
    audios: Array,
  },
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'id',
          align: 'start',
          value: 'id',
        },
        {
          text: 'symbol',
          align: 'start',
          value: 'symbol',
        },
        {
          text: 'Filename',
          align: 'start',
          value: 'fileName',
        },
        {
          text: 'Begin',
          align: 'start',
          value: 'begin',
        },
        {
          text: 'End',
          align: 'start',
          value: 'end',
        }
      ],
    };
  },
};
</script>

<style scoped>
</style>