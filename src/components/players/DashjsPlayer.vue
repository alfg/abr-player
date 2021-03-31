<template>
  <div class="dashjs-player"></div>
</template>

<script>
import dashjs from 'dashjs';
import config from '@/config';

export default {
  name: 'DashjsPlayer',
  props: ['video'],
  data() {
    return {
      player: null,
      interval: null,
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
      this.log('[DashjsPlayer] - version:', this.player.getVersion());
    },
    configure() {},
    setProtection(licenseUrl, drm) {
      const playreadyUrl = drm === 'playready' && licenseUrl
        ? licenseUrl
        : config.defaultLicenseServers['com.microsoft.playready'];

      const widevineUrl = drm === 'widevine' && licenseUrl
        ? licenseUrl
        : config.defaultLicenseServers['com.widevine.alpha'];

      const protData = {
        'com.widevine.alpha': {
          serverURL: widevineUrl,
        },
        'com.microsoft.playready': {
          serverURL: playreadyUrl,
        },
      };
      this.player.setProtectionData(protData);
    },
    load(url, licenseUrl, drm) {
      if (!this.player) {
        this.init();
      }
      this.setProtection(licenseUrl, drm);
      this.player.initialize(this.video, url, true);
      this.setPlayerEvents();
      this.setMetricInterval();
    },
    setPlayerEvents() {
      this.video.addEventListener('loadeddata', this.onLoadedData);
      this.player.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, this.onAdaptationEvent);
    },
    setMetricInterval() {
      this.interval = setInterval(() => {
        this.updateMetrics();
      }, 2000);
    },
    selectTrack(id) {
      this.log('[DashjsPlayer] - selectTrack', id);
      this.player.setQualityFor('video', id);
    },
    getTracks() {
      this.log('[DashjsPlayer] - getTracks');

      const tracks = this.player.getBitrateInfoListFor('video');
      const activeTrack = this.player.getQualityFor('video');

      let newTracks = [];
      tracks.forEach((o) => {
        const t = {
          id: o.qualityIndex,
          name: o.bitrate,
          active: o.qualityIndex === activeTrack,
        };
        newTracks.push(t);
      });

      // // Sort by name;
      newTracks = newTracks.sort((a, b) => (
        a.name - b.name
      ));
      this.$emit('tracks', newTracks);
    },
    enableAdaptation(enabled) {
      this.log('[DashjsPlayer] - enableAdaptation', enabled);
      this.player.setAutoSwitchQualityFor('video', enabled);
    },
    updateMetrics() {
      const dashMetrics = this.player.getDashMetrics();

      // Get active track ID.
      const activeTrack = this.player.getQualityFor('video');

      // Current buffer stats.
      const bufferlevel = dashMetrics.getCurrentBufferLevel('video');

      // Current track Stats.
      const { bitrateList } = this.player.getCurrentTrackFor('video');
      const { width, height, bandwidth } = bitrateList[activeTrack];

      const data = {
        buffer: bufferlevel,
        width,
        height,
        bitrate: bandwidth,
      };

      const output = `+ ${data.buffer.toFixed(0)}s`;
      this.$emit('buffer', output);
      this.$emit('stats', data);
    },
    onAdaptationEvent(event) {
      this.log('[DashjsPlayer:onAdaptationEvent]', JSON.stringify(event));
      this.getTracks();
      // this.$emit('adaptation');
    },
    onLoadedData(event) {
      this.log('[DashjsPlayer] - onLoadedData', JSON.stringify(event));
      this.getTracks();
    },
    onDownloadBitrate(event) {
      this.log('[DashjsPlayer:onDownloadBitrate]', JSON.stringify(event));

      // const data = {
      //   width: event.detail.width,
      //   height: event.detail.height,
      //   bitrate: event.detail.bitrate,
      // };
      // this.$emit('stats', data);
    },
    unload() {
      this.log('[DashjsPlayer] - unload');
      if (this.player) {
        clearInterval(this.interval);
        this.player.destroy();
        this.player = null;
      }
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
