<template>
  <div class="player container">
    <div class="video-container">
      <video
        ref="video"
        :controls="controls"
        :autoPlay="autoplay"
      />
    </div>

    <Probe :info="probe"/>

    <label for="drm">Select Media</label>
    <select v-model="url" class="u-full-width">
      <option v-for="o in mediaItems" :key="o.id" :value="o.url">{{o.name}}</option>
    </select>

    <div v-if="url === '' || isCustom">
      <label>Media URL</label>
      <input
        v-model="url"
        class="u-full-width"
        type="text"
      />

      <label>License Server URL</label>
      <input
        v-model="licenseUrl"
        class="u-full-width"
        type="text"
      />

      <label for="drm">DRM</label>
      <select v-model="drm" class="u-full-width" id="drm">
        <option value="none">None</option>
        <option value="widevine">Widevine</option>
        <option value="playready">PlayReady</option>
      </select>
    </div>

    <div class="control-buttons">
      <button v-on:click="load" class="button-primary">Load Media</button>
      <button v-on:click="stop">Unload</button>
    </div>

    <Log v-bind:logs="debugLog" />
  </div>
</template>

<script>
import shaka from 'shaka-player';
import config from '@/config';
import Log from '@/components/Log.vue';
import Probe from '@/components/Probe.vue';
import '@/assets/normalize.css';
import '@/assets/skeleton.css';
import '@/assets/player-controls.css';

const {
  defaultUrl,
  defaultLicenseUrl,
  defaultDrm,
  mediaItems,
} = config;

export default {
  name: 'Player',
  components: {
    Log,
    Probe,
  },
  props: {},
  data() {
    return {
      player: null,
      autoplay: true,
      controls: true,
      url: defaultUrl,
      licenseUrl: defaultLicenseUrl,
      drm: defaultDrm,
      mediaItems,
      debugLog: [],
      probe: null,
    };
  },
  computed: {
    isCustom() {
      return (
        this.$route.query.url
        || this.$route.query.licenseUrl
        || this.$route.query.drm
      );
    },
  },
  mounted() {
    this.setQueryParams();
    this.init();
  },
  methods: {
    setQueryParams() {
      // Check if query params are set.
      if (this.$route.query.url) {
        this.url = this.$route.query.url;
      }
      if (this.$route.query.licenseUrl) {
        this.licenseUrl = this.$route.query.licenseUrl;
      }
      if (this.$route.query.drm) {
        this.drm = this.$route.query.drm.toLowerCase();
      }
    },
    init() {
      this.log('[player] - init');
      shaka.polyfill.installAll();

      this.log('[player] - version: ', shaka.Player.version);
      this.log('[player] - isBrowserSupported: ', shaka.Player.isBrowserSupported());

      shaka.Player.probeSupport().then((data) => {
        this.log('[player] - probeSupport ', data);
        console.log(data.media);
        this.probe = data;
      });
    },
    load() {
      // Create player.
      const { video } = this.$refs;
      this.player = new shaka.Player(video);
      this.setConfiguration();

      // Load url.
      this.player.load(this.url).then(() => {
        console.log('video loaded'); // eslint-disable-line no-console
      }).catch((err) => {
        console.log(err); // eslint-disable-line no-console
      });
    },
    stop() {
      this.player.unload();
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
    log(...message) {
      console.log(message.join(' '));
      // debugLog gets updated and passed to <Log /> prop.
      this.debugLog = this.debugLog.concat(message.join(' '));
    },
  },
};
</script>

<style scoped>
.player {
  text-align: left;
}

.player .video-container {
  height: 480px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.player video {
  background: #aaa;
  height: 100%;
  width: 100%;
}

.player button {
  margin: 0 2px;
}

.player-buttons {
  display: inline-block;
  margin-bottom: 10px;
}

.player-buttons span {
  margin-left: 10px;
}
</style>
