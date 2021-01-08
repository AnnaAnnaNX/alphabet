<template>
  <div>
    <div style="position: relative;">
      <v-text-field
        placeholder="Search"
        v-model="search"
        style="padding-right: 66px;"
      >
        <template v-slot:prepend>
          <v-icon>
            mdi-magnify
          </v-icon>
        </template>
      </v-text-field>
      <div style="position: absolute; right: 0; top: 0;">
        <slot></slot>
      </div>
    </div>
    <v-data-table
        :headers="headers"
        :items="characters"
        class="elevation-1"
        :search="search"
        items-per-page="5"
        :mobile-breakpoint="0"
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
          text: 'Character',
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

<style scoped>
</style>