<template>
  <div class="tracks">
    <div v-if="tracks.length > 0">
      <label for="tracks">Tracks</label>
      <select
        v-model="selectedTrack"
        class="u-full-width"
        @change="$emit('changeTrack', selectedTrack)">
        <option v-for="o in tracks" :key="o.id" :value="o.id">{{o.name}}</option>
      </select>
      <label for="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          v-model="enableAdaptation"
          @change="$emit('onEnableAdaptationChange', enableAdaptation)">
        <span class="label-body">Enable Adaptation</span>
      </label>
    </div>
  </div>
</template>

<script>

export default {
  name: 'tracks',
  props: ['tracks'],
  data() {
    return {
      selectedTrack: '',
      enableAdaptation: true,
    };
  },
  watch: {
    tracks() {
      this.selectedTrack = this.tracks.find((o) => o.active).id;
    },
  },
};
</script>

<style scoped>
</style>
