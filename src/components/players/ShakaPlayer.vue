<template>
  <div class="shaka-player"></div>
</template>

<script>
import shaka from 'shaka-player';
import config from '@/config';

export default {
  name: 'ShakaPlayer',
  components: {
  },
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
      this.log('[ShakaPlayer] - init');
      this.log('[ShakaPlayer] - version:', shaka.Player.version);
      this.log('[ShakaPlayer] - isBrowserSupported:', shaka.Player.isBrowserSupported());
      shaka.polyfill.installAll();

      this.configure();
    },
    configure() {
      // Create player.
      this.player = new shaka.Player(this.video);
      this.setConfiguration();
      this.setPlayerEvents();
    },
    setPlayerEvents() {
      this.player.addEventListener('adaptation', this.onAdaptationEvent);
      this.video.addEventListener('timeupdate', this.onTimeUpdate);
      this.video.addEventListener('timeupdate', this.onBufferedData);
    },
    load(url) {
      // Load url.
      this.player.load(url).then(() => {
        this.log('[ShakaPlayer] - video loaded');

        // console.log(this.player.getBufferedInfo());
        // console.log(this.player.getManifest());
        // console.log(this.player.getStats());
        // console.log(this.player.getVariantTracks());
        // console.log(this.player.keySystem());

        // Populate tracks.
        this.getTracks();
      }).catch((err) => {
        this.log('[ShakaPlayer] - error ', err);
      });
    },
    unload() {
      this.log('[ShakaPlayer] - unload');
      if (this.player) {
        this.player.unload();
        this.player.destroy();
        this.player = null;
      }
    },
    destroy() {
      this.log('[ShakaPlayer] - destroy');
      if (this.player) {
        this.player.destroy();
        this.player = null;
      }
    },
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
    selectTrack(id) {
      this.log('[ShakaPlayer] - selectTrack', id);
      this.player.selectVariantTrack({ id });
    },
    getTracks() {
      const tracks = this.player.getVariantTracks();
      let newTracks = [];

      tracks.forEach((o) => {
        const t = {
          id: o.id,
          name: o.bandwidth,
          active: o.active,
        };
        newTracks.push(t);
      });

      // Sort by name;
      newTracks = newTracks.sort((a, b) => (
        a.name - b.name
      ));
      this.$emit('tracks', newTracks);
    },
    enableAdaptation(enabled) {
      this.log('[ShakaPlayer] - enableAdaptation', enabled);
      this.player.configure({
        abr: { enabled },
      });
    },
    onAdaptationEvent(event) {
      this.log('[ShakaPlayer:onAdaptationEvent]', event);
      this.getTracks();
      // this.$emit('adaptation');
    },
    onTimeUpdate() {
      const stats = this.player.getStats();
      this.$emit('stats', stats);
    },
    onBufferedData() {
      let behind = 0;
      let ahead = 0;
      const { currentTime, buffered } = this.video;
      for (let i = 0; i < buffered.length; i++) { // eslint-disable-line no-plusplus
        if (buffered.start(i) <= currentTime && buffered.end(i) >= currentTime) {
          ahead = buffered.end(i) - currentTime;
          behind = currentTime - buffered.start(i);
          break;
        }
      }
      const data = `- ${behind.toFixed(0)}s / + ${ahead.toFixed(0)}s`;
      this.$emit('buffer', data);
    },


    // Logger.
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
