<template>
  <div class="shaka-player">
    <video
      ref="video"
      :controls="controls"
      :autoPlay="autoplay"
    />
  </div>
</template>

<script>
import shaka from 'shaka-player';
import config from '@/config';

export default {
  name: 'Player',
  components: {
  },
  props: ['controls', 'autoplay'],
  data() {
    return {
      player: null,
    };
  },
  watch: {},
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      this.log('[ShakaPlayer] - init');
      this.log('[ShakaPlayer] - version:', shaka.Player.version);
      this.log('[ShakaPlayer] - isBrowserSupported:', shaka.Player.isBrowserSupported());
      shaka.polyfill.installAll();
    },
    configure() {},
    load(url) {
      // Create player.
      const { video } = this.$refs;
      this.player = new shaka.Player(video);
      this.setConfiguration();

      // Load url.
      this.player.load(url).then(() => {
        this.log('[ShakaPlayer] - video loaded');
      }).catch((err) => {
        this.log('[ShakaPlayer] - error ', err);
      });
    },
    unload() {
      if (this.player) {
        this.player.unload();
        this.player.destroy();
      }
    },
    play() {},
    pause() {},
    destroy() {},
    setConfiguration() {
      this.setProtection();
    },
    setProtection() {
      this.player.configure({
        drm: {
          servers: config.licenseServers,
        },
      });
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
