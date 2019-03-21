<template>
  <div class="probe row">

    <div class="two columns">
    <h4>Player</h4>
    <ul>
      <li>
        <span class="material-icons checked" v-if="player === 'ShakaPlayer'">check_circle</span>
        <span class="material-icons" v-else>close</span>
        Shaka Player
      </li>
      <li>
        <span class="material-icons checked" v-if="player === 'HasPlayer'">check_circle</span>
        <span class="material-icons" v-else>close</span>
        HasPlayer
      </li>
    </ul>
    </div>

    <div class="two columns">
    <h4>Manifest</h4>
    <ul>
      <li>
        <span class="material-icons checked" v-if="supportsDASH">check_circle</span>
        <span class="material-icons" v-else>close</span>
        DASH
      </li>
      <li>
        <span class="material-icons checked" v-if="supportsMSS">check_circle</span>
        <span class="material-icons" v-else>close</span>
        MSS
      <li>
        <span class="material-icons checked" v-if="supportsHLS">check_circle</span>
        <span class="material-icons" v-else>close</span>
        HLS
      </li>
    </ul>
    </div>

    <div class="two columns">
    <h4>EME</h4>
    <ul>
      <li>
        <span class="material-icons checked" v-if="supportsWidevine">check_circle</span>
        <span class="material-icons" v-else>close</span>
        widevine
      </li>
      <li>
        <span class="material-icons checked" v-if="supportsPlayready">check_circle</span>
        <span class="material-icons" v-else>close</span>
        playready
      </li>
      <li>
        <span class="material-icons checked" v-if="supportsFairplay">check_circle</span>
        <span class="material-icons" v-else>close</span>
        fairplay
      </li>
      <li>
        <span class="material-icons checked" v-if="supportsPrimetime">check_circle</span>
        <span class="material-icons" v-else>close</span>
        primetime
      </li>
    </ul>
    </div>

    <div class="six columns">
    <h4>MSE</h4>
    <ul>
      <li>
        <span class="material-icons checked" v-if="supportsMp4Avc1">check_circle</span>
        <span class="material-icons" v-else>close</span>
        mp4/avc1
      </li>
      <li>
        <span class="material-icons checked" v-if="supportsMp4Hevc">check_circle</span>
        <span class="material-icons" v-else>close</span>
        mp4/hevc
      </li>
      <li>
        <span class="material-icons checked" v-if="supportsMp4Ec3">check_circle</span>
        <span class="material-icons" v-else>close</span>
        mp4/ec-3</li>
      <li>
        <span class="material-icons checked" v-if="supportsWebmVp8">check_circle</span>
        <span class="material-icons" v-else>close</span>
        webm/vp8
      </li>
      <li>
        <span class="material-icons checked" v-if="supportsWebmVp9">check_circle</span>
        <span class="material-icons" v-else>close</span>
        webm/vp9
      </li>
    </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'probe',
  props: ['player', 'info'],
  watch: {
    info() {
      console.log(this.info.manifest); // eslint-disable-line no-console
    },
  },
  computed: {
    supportsDASH() {
      return this.info && this.info.manifest.mpd;
    },
    supportsMSS() {
      return this.info && this.info.manifest.ism;
    },
    supportsHLS() {
      return this.info && this.info.manifest.m3u8;
    },
    supportsWidevine() {
      return this.info && this.info.drm['com.widevine.alpha'];
    },
    supportsPlayready() {
      return this.info && this.info.drm['com.microsoft.playready'];
    },
    supportsFairplay() {
      return this.info && this.info.drm['com.apple.fps'];
    },
    supportsPrimetime() {
      return this.info && this.info.drm['com.adobe.primetime'];
    },
    supportsMp4Avc1() {
      return this.info && this.info.media['video/mp4; codecs="avc1.42E01E"'];
    },
    supportsMp4Hevc() {
      return this.info
        && (this.info.media['video/mp4; codecs="hev1.1.6.L93.90"']
        || this.info.media['video/mp4; codecs="hvc1.1.6.L93.90"']);
    },
    supportsMp4Ec3() {
      return this.info && this.info.media['audio/mp4; codecs="ec-3"'];
    },
    supportsWebmVp8() {
      return this.info && this.info.media['video/webm; codecs="vp8"'];
    },
    supportsWebmVp9() {
      return this.info && this.info.media['video/webm; codecs="vp9"'];
    },
  },
  methods: {
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}

li {
  margin-bottom: 0;
}

li span {
  width: 30px;
  vertical-align: middle;
  color: red;
}

li span.checked {
  color: green;
}
</style>
