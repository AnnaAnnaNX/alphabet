<template>
  <div v-if="sourcies">
    <v-data-table
        :headers="headers"
        :items="sourcies"
        class="elevation-1"
        :search="search"
        :items-per-page="5"
        :mobile-breakpoint="0"
      >
        <template
          v-slot:item.audios="{ item }"
        >
          <div
            v-for="(obj, i) in item.audios"
            :key="i"
          >
            {{ obj.character.name }}
            <!-- 🌞 add avatar, unique characters :  -->
          </div>
        </template>        
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "SourciesTable",
  props: {
    sourcies: Array,
  },
  // computed: {
  //   sourciesWithUniqCharacter() {

  //     return arr;
  //   },
  // },
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
          text: 'File name',
          align: 'start',
          value: 'filename',
        },
        {
          text: 'Characters',
          align: 'start',
          value: 'audios',
        }
      ],
    };
  },
};
</script>

<style scoped>
</style>