<template>
  <div class="has-player"></div>
</template>

<script>
import MediaPlayer from 'hasplayer.js';
import config from '@/config';

export default {
  name: 'HasPlayer',
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
      this.log('[HasPlayer] - init');

      this.player = new MediaPlayer();
      this.player.init(this.video);

      this.log('[HasPlayer] - version:', this.player.getVersion());
      this.log('[HasPlayer] - DashJS version:', this.player.getVersionDashJS());
    },
    configure() {},
    load(url, licenseUrl, drm) {
      const stream = {
        url,
      };

      // Set protection data if DRM is provided.
      if (drm) {
        stream.protData = this.setProtData(licenseUrl, drm);
      }

      // Create player.
      this.log('[HasPlayer - load', JSON.stringify(stream));
      this.player.load(stream);

      this.setPlayerEvents();
    },
    setProtData(licenseUrl, drm) {
      const playreadyUrl = drm === 'playready' && licenseUrl
        ? licenseUrl
        : config.defaultLicenseServers['com.microsoft.playready'];

      const protData = {
        'com.microsoft.playready': {
          laURL: playreadyUrl,
        },
      };
      return protData;
    },
    setPlayerEvents() {
      // http://orange-opensource.github.io/hasplayer.js/development/doc/jsdoc/MediaPlayer.html#event
      this.player.addEventListener('play_bitrate', this.onAdaptationEvent);
      this.player.addEventListener('download_bitrate', this.onDownloadBitrate);
      this.player.addEventListener('bufferLevel_updated', this.onBufferLevel);
      this.video.addEventListener('loadeddata', this.onLoadedData);
    },
    unload() {
      this.log('[HasPlayer] - unload');
      if (this.player) {
        this.player.stop();
        this.player = null;
      }
    },
    destroy() {
      this.log('[HasPlayer] - destroy');
      if (this.player) {
        this.player.reset();
        this.player = null;
      }
    },
    selectTrack(id) {
      this.log('[HasPlayer] - selectTrack', id);
      this.player.setQualityFor('video', id);
    },
    getTracks() {
      this.log('[HasPlayer] - getTracks');

      const tracks = this.player.getVideoBitrates();
      const activeTrack = tracks[this.player.getQualityFor('video')];

      let newTracks = [];
      tracks.forEach((o, i) => {
        const t = {
          id: i,
          name: o,
          active: o === activeTrack,
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
      this.log('[HasPlayer] - enableAdaptation', enabled);
      this.player.setAutoSwitchQuality(enabled);
    },
    onLoadedData(event) {
      this.log('[HasPlayer] - onLoadedData', JSON.stringify(event));
      this.getTracks();
    },
    onAdaptationEvent(event) {
      this.log('[HasPlayer:onAdaptationEvent]', JSON.stringify(event));
      this.getTracks();
      // this.$emit('adaptation');
    },
    onDownloadBitrate(event) {
      this.log('[HasPlayer:onDownloadBitrate]', JSON.stringify(event));
      const data = {
        width: event.detail.width,
        height: event.detail.height,
        bitrate: event.detail.bitrate,
      };
      this.$emit('stats', data);
    },
    onBufferLevel(event) {
      const data = {
        buffer: event.detail.level,
      };

      const output = `+ ${data.buffer.toFixed(0)}s`;
      this.$emit('buffer', output);
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
