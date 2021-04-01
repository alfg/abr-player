<template>
  <div class="player container">

    <!-- Players -->
    <div class="video-container">

      <!-- Video container for players -->
      <video
        ref="video"
        :controls="controls"
        :autoPlay="autoplay"
      />
      <ShakaPlayer
        v-if="video && selectedPlayer === 'ShakaPlayer'"
        ref="player"
        :video="video"
        v-on:tracks="onGetTracks"
        v-on:stats="onStats"
        v-on:buffer="onBuffer"
        v-on:log="log"
      />
      <HasPlayer
        v-else-if="video && selectedPlayer === 'HasPlayer'"
        ref="player"
        :video="video"
        v-on:tracks="onGetTracks"
        v-on:stats="onStats"
        v-on:buffer="onBuffer"
        v-on:log="log"
      />
      <DashjsPlayer
        v-else-if="video && selectedPlayer === 'DashjsPlayer'"
        ref="player"
        :video="video"
        v-on:tracks="onGetTracks"
        v-on:stats="onStats"
        v-on:buffer="onBuffer"
        v-on:log="log"
      />
      <HlsjsPlayer
        v-else-if="video && selectedPlayer === 'HlsjsPlayer'"
        ref="player"
        :video="video"
        v-on:tracks="onGetTracks"
        v-on:stats="onStats"
        v-on:buffer="onBuffer"
        v-on:log="log"
      />
    </div>

    <!-- Controls -->
    <Controls
      :video="this.$refs.video"
      v-on:play="play"
      v-on:pause="pause"
    />

    <!-- Probe & Settings -->
    <Probe :player="selectedPlayer" :info="probe"/>
    <Settings
      v-on:load="load"
      v-on:unload="unload"
      v-on:changePlayer="onChangePlayer"
    />

    <!-- Player Tracks -->
    <Tracks
      :tracks="tracks"
      :stats="stats"
      :buffer="buffer"
      v-on:changeTrack="onChangeTrack"
      v-on:onEnableAdaptationChange="onEnableAdaptation"
    />

    <!-- Player Stats -->
    <Stats :stats="stats" :buffer="buffer" />

    <!-- Logger -->
    <Log v-bind:logs="logs" />
  </div>
</template>

<script>
import Controls from '@/components/Controls.vue';
import Tracks from '@/components/Tracks.vue';
import Log from '@/components/Log.vue';
import Probe from '@/components/Probe.vue';
import Settings from '@/components/Settings.vue';
import Stats from '@/components/Stats.vue';
import {
  ShakaPlayer, HasPlayer, DashjsPlayer, HlsjsPlayer,
} from '@/components/players';
import utils from '@/lib/utils';
import '@/assets/normalize.css';
import '@/assets/skeleton.css';

export default {
  name: 'Player',
  components: {
    Controls,
    Log,
    Tracks,
    Probe,
    Settings,
    ShakaPlayer,
    HasPlayer,
    DashjsPlayer,
    HlsjsPlayer,
    Stats,
  },
  props: {},
  data() {
    return {
      selectedPlayer: 'ShakaPlayer',
      autoplay: true,
      controls: false,
      logs: [],
      probe: null,
      video: null,
      tracks: [],
      stats: {},
      buffer: '0',
      controlkey: 0,
    };
  },
  computed: {},
  created() {
    this.init();
  },
  mounted() {
    this.video = this.$refs.video;
  },
  methods: {
    init() {
      this.log('[player] - init');
      this.probeData();
    },
    onChangePlayer(event) {
      this.log('[player] - changeplayer', event);
      this.selectedPlayer = event;
    },
    probeData() {
      this.log('[player] - probeSupport');

      utils.probeSupport().then((data) => {
        this.probe = data;
      });
    },

    // Common player methods.
    load(settings) {
      const { url, licenseUrl, drm } = settings;
      this.$refs.player.load(url, licenseUrl, drm);
    },
    unload() {
      this.$refs.player.unload();
      this.stats = {};
      this.buffer = '0';
    },
    play() {
      const { video } = this.$refs.player;
      video.play();
    },
    pause() {
      const { video } = this.$refs.player;
      video.pause();
    },

    // Common player events.
    onGetTracks(event) {
      this.log('[player] - onGetTracks');
      this.tracks = event;
    },
    onChangeTrack(event) {
      this.log('[player] - onChangeTrack', event);
      this.$refs.player.selectTrack(event);
    },
    onEnableAdaptation(event) {
      this.log('[player] - onEnableAdaptation', event);
      this.$refs.player.enableAdaptation(event);
    },
    onStats(event) {
      this.stats = event;
    },
    onBuffer(event) {
      this.buffer = event;
    },

    // Logger.
    log(...message) {
      console.log(message.join(' ')); // eslint-disable-line no-console
      // logs gets updated and passed to <Log /> prop.
      this.logs = this.logs.concat(message.join(' '));
    },
  },
};
</script>

<style scoped>
.player {
  text-align: left;
}

.player .video-container {
  /* height: 480px; */
  margin: 0 auto;
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
