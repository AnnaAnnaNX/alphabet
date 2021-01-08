<template>
  <div>
    <v-text-field
        label="Search"
        v-model="search"
      ></v-text-field>
    <v-data-table
        :headers="headers"
        :items="characters"
        class="elevation-1"
        :search="search"
      >
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "Characters",
  props: {
    characters: Array,
  },
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Id',
          align: 'start',
          value: 'id',
        },
        {
          text: 'Name',
          align: 'start',
          value: 'name',
        },
        {
          text: 'Description',
          value: 'description',
        },
      ],
    };
  },
};
</script>
