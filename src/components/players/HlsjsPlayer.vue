<template>
  <div class="hlsjs-player"></div>
</template>

<script>
import Hls from 'hls.js';

export default {
  name: 'HlsjsPlayer',
  props: ['video'],
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.log('[HlsjsPlayer] - init');

      if (Hls.isSupported()) {
        this.player = new Hls();
      }

      this.log('[HlsjsPlayer] - version:', Hls.version);
    },
    configure() {},
    load(url) {
      if (!this.player) {
        this.init();
      }

      // Create player.
      this.log('[HlsjsPlayer - load', url);
      this.player.loadSource(url);
      this.player.attachMedia(this.video);

      this.setPlayerEvents();
    },
    setPlayerEvents() {
      this.player.on(Hls.Events.LEVEL_SWITCHED, this.onAdaptationEvent);
      this.player.on(Hls.Events.BUFFER_APPENDED, this.onBufferLevel);
      this.video.addEventListener('timeupdate', this.onTimeUpdate);
      this.video.addEventListener('loadeddata', this.onLoadedData);
    },
    unload() {
      this.log('[HlsjsPlayer] - unload');
      if (this.player) {
        this.player.destroy();
        this.player = null;
      }
    },
    selectTrack(id) {
      this.log('[HlsjsPlayer] - selectTrack', id);
      this.player.currentLevel = id;
    },
    getTracks() {
      this.log('[HlsjsPlayer] - getTracks');

      const tracks = this.player.levels;
      const activeTrack = tracks[this.player.currentLevel];

      let newTracks = [];
      tracks.forEach((o, i) => {
        const t = {
          id: i,
          name: `${o.bitrate} (${o.name})`,
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
      this.log('[HlsjsPlayer] - enableAdaptation', enabled);
      this.player.autoLevelCapping = enabled ? 1 : -1;
    },
    onLoadedData(event) {
      this.log('[HlsjsPlayer] - onLoadedData', JSON.stringify(event));
      this.getTracks();
    },
    onAdaptationEvent(event) {
      this.log('[HlsjsPlayer:onAdaptationEvent]', JSON.stringify(event));
      this.getTracks();
      // this.$emit('adaptation');
    },
    onBufferLevel() {
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
    onTimeUpdate() {
      const tracks = this.player.levels;
      const activeTrack = tracks[this.player.currentLevel];

      const data = {
        width: activeTrack.width,
        height: activeTrack.height,
        bitrate: activeTrack.bitrate,
      };
      this.$emit('stats', data);
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
