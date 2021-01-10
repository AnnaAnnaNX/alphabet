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
        <template v-slot:item.audios="{ item }"
        >
          <div
            v-for="(obj, i) in item.audios"
            :key="i"
          >
            {{ obj.character.name }}
            <!-- 🌞 add avatar, unique characters :  -->
          </div>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
            color="primary"
            icon
            medium
            dark
            @click="currentPlayId === item.id ? stop() : play(item.id, item.link)"
          >
            <v-icon>
              {{ currentPlayId === item.id ? 'mdi-pause' : 'mdi-play' }}
            </v-icon>
          </v-btn>
        </template>
        <template v-slot:item.link="{ item }">
          {{ item.link.slice(0, 15) }}...
        </template>
    </v-data-table>
    <v-btn
      @click="stop"
    >
      stop
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "SourciesTable",
  props: {
    sourcies: Array,
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
          text: 'File name',
          align: 'start',
          value: 'filename',
        },
        {
          text: 'Url',
          align: 'start',
          value: 'link',
        },
        {
          text: 'Characters',
          align: 'start',
          value: 'audios',
        },
        {
          text: 'Actions',
          align: 'start',
          value: 'actions',
        }
      ],
      audioElement: null,
      currentPlayId: null,
    };
  },
  methods: {
    play(id, url) {
      const that = this;
      that.currentPlayId = null;
      if (!this.audioElement) {
        this.audioElement = new Audio(url);
        this.audioElement.onloadedmetadata = () => {
          // destination.textContent = audio.duration;
          // console.log(this.audioElement.duration);
          this.audioElement.play();
          that.currentPlayId = id;
        };
      } else {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.audioElement = new Audio(url);
        this.audioElement.onloadedmetadata = () => {
          this.audioElement.play();
          that.currentPlayId = id;
        };
      }
    },
    stop() {
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.currentPlayId = null;
      }
    },
  },
};
</script>

<style scoped>
</style>