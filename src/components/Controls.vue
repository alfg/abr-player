<template>
  <div class="controls player-controls">
    <button class="material-icons" v-on:click="pause" v-if="playing">pause_arrow</button>
    <button class="material-icons" v-on:click="play" v-else>play_arrow</button>
    <input
      class="seekBar"
      type="range"
      step="any"
      min="0"
      v-bind:max="duration"
      v-bind:value="currentTime"
      @change="onSeekChange"
     />
    <button class="rewindButton material-icons">fast_rewind</button>
    <div class="currentTime">{{timeString}} / {{durationString}}</div>
    <button class="fastForwardButton material-icons">fast_forward</button>
    <button
      class="muteButton material-icons"
      v-on:click="setMute">{{ volume === 0 ? 'volume_mute' : 'volume_up' }}
    </button>
    <input
      class="volumeBar"
      type="range"
      step="any"
      min="0"
      max="1"
      v-bind:value="volume"
      v-bind:style="{
        background: 'linear-gradient(to right, rgb(204, 204, 204) '
          + volume * 100 + '%, rgb(0, 0, 0) '
          + volume * 100 + '%, rgb(0, 0, 0) 100%)'
      }"
      @change="onVolumeChange"
    />
  </div>
</template>

<script>
import utils from '@/lib/utils';
import '@/assets/player-controls.css';

export default {
  name: 'controls',
  components: {},
  props: ['video'],
  data() {
    return {
      player: null,
      loaded: false,
      playing: false,
      seeking: false,
      duration: 0,
      currentTime: 0,
      volume: 0.70,
      savedVolume: 0.70,
      muted: false,
    };
  },
  computed: {
    timeString() {
      return utils.buildTimeString(this.currentTime);
    },
    durationString() {
      return utils.buildTimeString(this.duration);
    },
  },
  watch: {
    video() {
      // Initialize when video is ready.
      this.player = this.video;
      this.init();
    },
  },
  created() {},
  mounted() {},
  methods: {
    init() {
      this.player.volume = this.volume;
      this.setPlayerEvents();
    },

    setPlayerEvents() {
      // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
      this.player.addEventListener('playing', this.onPlaying);
      this.player.addEventListener('pause', this.onPause);
      this.player.addEventListener('durationchange', this.onDurationChange);
      this.player.addEventListener('timeupdate', this.onTimeUpdate);
      this.player.addEventListener('volumechange', this.onVolumeChange);
    },

    play() {
      this.player.play();
    },

    pause() {
      this.player.pause();
    },

    stop() {
      this.player.stop();
    },

    seekTo(value) {
      this.player.currentTime = value;
    },

    setMute() {
      this.muted = !this.muted;
      if (this.muted) {
        this.savedVolume = this.volume;
        this.volume = 0;
      } else {
        this.volume = this.savedVolume;
      }
      this.player.volume = this.volume;
    },

    onPlaying() {
      this.playing = true;
    },

    onPause() {
      this.playing = false;
    },

    onSeekChange(event) {
      this.seeking = true;
      if (event.target && event.target.value) {
        this.seekTo(event.target.value);
      }
    },

    onVolumeChange(event) {
      if (event.target && event.target.value) {
        this.player.volume = parseFloat(event.target.value);
        this.volume = parseFloat(event.target.value);
      } else if (event.target && event.target.volume) {
        this.player.volume = parseFloat(event.target.volume);
        this.volume = parseFloat(event.target.volume);
      }
      this.muted = this.volume === 0;
    },

    onDurationChange(event) {
      this.duration = event.target.duration;
    },

    onTimeUpdate(event) {
      this.currentTime = event.target.currentTime;
    },
  },
};
</script>

<style scoped>
.controls {
  margin: 10px 0;
  text-align: left;
}
.controls button:hover,
.controls button:focus {
  color: #fff;
}
</style>
