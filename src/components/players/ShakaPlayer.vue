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
  name: 'ShakaPlayer',
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
      this.log('[ShakaPlayer] - init');
      this.log('[ShakaPlayer] - version:', shaka.Player.version);
      this.log('[ShakaPlayer] - isBrowserSupported:', shaka.Player.isBrowserSupported());
      shaka.polyfill.installAll();
      const { video } = this.$refs;
      this.video = video;

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
    onAdaptationEvent(event) {
      this.log('[ShakaPlayer:onAdaptationEvent]', event);
      this.getTracks();
      // this.$emit('adaptation');
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
