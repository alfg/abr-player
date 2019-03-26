<template>
  <div class="stats">
    <h4>Stats</h4>
    <table class="">
      <tr>
        <td>Active Resolution</td>
        <td>{{resolution}}</td>
      </tr>
      <tr>
        <td>Buffered</td>
        <td>{{buffer}}</td>
      </tr>
      <tr>
        <td>Bitrate</td>
        <td>{{stats.bitrate}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'stats',
  props: ['stats', 'buffer'],
  data() {
    return {
    };
  },
  computed: {
    resolution() {
      return `${this.stats.width || 0} x ${this.stats.height || 0}`;
    },
  },
  methods: {
  },
};
</script>

<style scoped>
</style>
