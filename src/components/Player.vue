<template>
  <div class="player container">

    <!-- Player -->
    <div class="video-container">
      <ShakaPlayer
        ref="player"
        :controls="controls"
        :autoplay="autoplay"
        v-on:log="log"
      />
    </div>

    <!-- Settings and Controls -->
    <Probe :info="probe"/>
    <Settings
      v-on:load="load"
      v-on:unload="unload"
    />

    <!-- Logger -->
    <Log v-bind:logs="logs" />
  </div>
</template>

<script>
import shaka from 'shaka-player';
import Log from '@/components/Log.vue';
import Probe from '@/components/Probe.vue';
import Settings from '@/components/Settings.vue';
import ShakaPlayer from '@/components/players/ShakaPlayer.vue';
import '@/assets/normalize.css';
import '@/assets/skeleton.css';

export default {
  name: 'Player',
  components: {
    Log,
    Probe,
    Settings,
    ShakaPlayer,
  },
  props: {},
  data() {
    return {
      autoplay: true,
      controls: true,
      logs: [],
      probe: null,
    };
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      this.log('[player] - init');
      this.probeData();
    },
    load(url) {
      this.$refs.player.load(url);
    },
    unload() {
      this.$refs.player.unload();
    },
    probeData() {
      this.log('[player] - probeSupport');
      // Uses shaka to probe browser support data.
      shaka.Player.probeSupport().then((data) => {
        this.probe = data;
      });
    },
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
