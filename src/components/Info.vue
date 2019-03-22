<template>
  <div class="info">
    <h4>Info</h4>
    <label for="tracks">Tracks</label>
    <select
      v-model="selectedTrack"
      class="u-full-width"
      @change="$emit('changeTrack', selectedTrack)">
      <option v-for="o in tracks" :key="o.id" :value="o.id">{{o.name}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'info',
  props: ['tracks'],
  data() {
    return {
      selectedTrack: '',
    };
  },
  watch: {
    tracks() {
      this.selectedTrack = this.tracks.find(o => o.active).id;
    },
  },
  methods: {
  },
};
</script>

<style scoped>
.info {
}
</style>
