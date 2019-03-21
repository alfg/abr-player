<template>
  <div class="player container">

    <!-- Players -->
    <div class="video-container" v-if="selectedPlayer === 'ShakaPlayer'">
      <ShakaPlayer
        ref="player"
        :controls="controls"
        :autoplay="autoplay"
        v-on:log="log"
      />
    </div>
    <div class="video-container" v-else-if="selectedPlayer === 'HasPlayer'">
      <HasPlayer
        ref="player"
        :controls="controls"
        :autoplay="autoplay"
        v-on:log="log"
      />
    </div>

    <!-- Controls -->
    <Controls
      :video="video"
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
import HasPlayer from '@/components/players/HasPlayer.vue';
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
    HasPlayer,
  },
  props: {},
  data() {
    return {
      selectedPlayer: 'ShakaPlayer',
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
  watch: {
    selectedPlayer() {
      console.log('selected player changed');
      this.video = this.$refs.player.video;
    },
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
    onChangePlayer(event) {
      this.log('[player] - changeplayer', event);
      this.selectedPlayer = event;
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
  /* height: 480px; */
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
