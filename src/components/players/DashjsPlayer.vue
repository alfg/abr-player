<template>
  <div class="dashjs-player"></div>
</template>

<script>
import config from '@/config';
import dashjs from 'dashjs';

export default {
  name: 'DashjsPlayer',
  props: ['video'],
  data() {
    return {
      player: null,
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
      this.log('[DashjsPlayer] - init');

      this.player = dashjs.MediaPlayer().create();
      this.setProtection();
      this.log('[DashjsPlayer] - version:', this.player.getVersion());
    },
    configure() {},
    setProtection() {
      const protectionController = this.player.getProtectionController();
      const protData = {
        'com.widevine.alpha': {
          serverURL: config.licenseServers['com.widevine.alpha'],
        },
        'com.microsoft.playready': {
          serverURL: config.licenseServers['com.microsoft.playready'],
        },
      };
      protectionController.setProtectionData(protData);
    },
    load(url) {
      this.player.initialize(this.video, url, true);
      // this.setPlayerEvents();
    },
    setPlayerEvents() {
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
