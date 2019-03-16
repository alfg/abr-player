<template>
  <div class="player container">
    <video
      ref="video"
      :controls="controls"
      :autoPlay="autoplay"
    />

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

    <div class="control-buttons">
      <button v-on:click="load" class="button-primary">Load Media</button>
      <button v-on:click="stop">Stop</button>
    </div>


    <!--
    <div class="player-controls" v-if="connected">
      <button class="material-icons" v-on:click="pause" v-if="playing">pause_arrow</button>
      <button class="material-icons" v-on:click="play" v-else>play_arrow</button>
      <input class="seekBar" type="range" step="any" min="0" v-bind:max="duration" v-bind:value="currentTime" @change="onSeekChange">
      <button class="rewindButton material-icons">fast_rewind</button>
      <div class="currentTime">{{timeString}}</div>
      <button class="fastForwardButton material-icons">fast_forward</button>
      <button class="muteButton material-icons" v-on:click="setMute" v-if="muted">volume_mute</button>
      <button class="muteButton material-icons" v-on:click="setMute" v-else>volume_up</button>
      <input
        class="volumeBar"
        type="range"
        step="any"
        min="0"
        max="1"
        v-bind:value="volume"
        v-bind:style="{ background: 'linear-gradient(to right, rgb(204, 204, 204) ' + volume * 100 + '%, rgb(0, 0, 0) ' + volume * 100 + '%, rgb(0, 0, 0) 100%)' }"
        @change="onVolumeChange"
      />
    </div>
 -->
    <!-- <Log v-bind:logs="debugLog" /> -->
  </div>
</template>

<script>
import shaka from 'shaka-player';
import config from '@/config';
import '@/assets/normalize.css';
import '@/assets/skeleton.css';
import '@/assets/player-controls.css';

const { defaultUrl, defaultLicenseUrl, defaultDrm } = config;

export default {
  name: 'Player',
  props: {},
  data() {
    return {
      player: null,
      autoplay: true,
      controls: true,
      url: defaultUrl,
      licenseUrl: defaultLicenseUrl,
      drm: defaultDrm,
    }
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
      shaka.polyfill.installAll();
      const video = this.$refs.video;
      this.player = new shaka.Player(video);
      this.player.configure({
        drm: {
          servers: config.licenseServers
        }
      });
      // this.setProtection();
    },
    load() {
      this.player.load(this.url).then(() => {
        console.log('video loaded');
      }).catch((err) => {
        console.log(err);
      });
    },
    stop() {
    },

    setProtection() {
      this.player.configure({
        drm: {
          servers: config.licenseServers
        }
      });
    }

  },
};
</script>

<style scoped>
.player {
  text-align: left;
}

.player video {
  background: #aaa;
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
