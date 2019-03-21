<template>
  <div class="player container">

    <!-- Player & Controls -->
    <div class="video-container">
      <ShakaPlayer
        ref="player"
        :controls="controls"
        :autoplay="autoplay"
        v-on:log="log"
      />
    </div>
    <Controls
      :video="video"
      v-on:play="play"
      v-on:pause="pause"
    />

    <!-- Probe & Settings -->
    <Probe :info="probe"/>
    <Settings
      v-on:load="load"
      v-on:unload="unload"
    />

    <!-- <button v-on:click="play">play</button>
    <button v-on:click="pause">pause</button> -->

    <!-- Logger -->
    <Log v-bind:logs="logs" />
  </div>
</template>

<script>
import shaka from 'shaka-player';
import Controls from '@/components/Controls.vue';
import Log from '@/components/Log.vue';
import Probe from '@/components/Probe.vue';
import Settings from '@/components/Settings.vue';
import ShakaPlayer from '@/components/players/ShakaPlayer.vue';
import '@/assets/normalize.css';
import '@/assets/skeleton.css';

export default {
  name: 'Player',
  components: {
    Controls,
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
      video: null,
    };
  },
  computed: {},
  created() {
    this.init();
  },
  mounted() {
    this.video = this.$refs.player.video;
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
    play() {
      const { video } = this.$refs.player;
      video.play();
    },
    pause() {
      const { video } = this.$refs.player;
      video.pause();
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
