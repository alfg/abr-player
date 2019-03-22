<template>
  <div class="has-player">
    <video
      ref="video"
      :controls="controls"
      :autoPlay="autoplay"
    />
  </div>
</template>

<script>
import config from '@/config';
import MediaPlayer from 'hasplayer.js';

export default {
  name: 'HasPlayer',
  components: {
  },
  props: ['controls', 'autoplay'],
  data() {
    return {
      player: null,
      video: null,
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.log('[HasPlayer] - init');
      const { video } = this.$refs;
      this.video = video;

      this.player = new MediaPlayer();
      this.player.init(this.video);

      this.log('[HasPlayer] - version:', this.player.getVersion());
      this.log('[HasPlayer] - DashJS version:', this.player.getVersionDashJS());
    },
    configure() {
    },
    load(url) {
      const stream = {
        url,
        protData: {
          'com.microsoft.playready': {
            laURL: config.licenseServers['com.microsoft.playready'],
          },
        },
      };
      this.log('[HasPlayer - load', JSON.stringify(stream));

      // Create player.
      this.player.load(stream);

      console.log(this.player.getMetricsFor('video'));
      console.log(this.player.getQualityFor('video'));
      console.log(this.player.getVideoBitrates());
    },
    unload() {
      this.log('[HasPlayer] - unload');
      if (this.player) {
        this.player.stop();
        this.player = null;
      }
    },
    destroy() {
      // this.log('[HasPlayer] - destroy');
      // if (this.player) {
      //   this.player.destroy();
      //   this.player = null;
      // }
    },
    log(...message) {
      this.$emit('log', ...message);
    },
  },
};
</script>

<style scoped>
video {
  background: #aaa;
  height: 100%;
  width: 100%;
}
</style>
