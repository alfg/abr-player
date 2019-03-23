<template>
  <div class="info">
    <h4>Info</h4>

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

    <div>
          Active Resolution: {{ resolution }}
    </div>
    <div>
          Buffered: {{ buffer }}
    </div>

  </div>
</template>

<script>
export default {
  name: 'info',
  props: ['tracks', 'stats', 'buffer'],
  data() {
    return {
      selectedTrack: '',
      enableAdaptation: true,
    };
  },
  computed: {
    resolution() {
      return `${this.stats.width || 0} x ${this.stats.height || 0}`;
    },
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
</style>
