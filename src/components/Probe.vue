<template>
  <div class="probe">
    <h4>Browser Compatibility</h4>
    <div class="row">
      <div class="three columns">
      <ul>
        <li v-for="(value, key) in supportedDrms" :key="key">
          <span class="material-icons checked" v-if="value">check_circle</span>
          <span class="material-icons" v-else>close</span>
          {{key}}
        </li>
      </ul>
      </div>

      <div class="nine columns">
      <ul class="codecs">
        <li v-for="(value, key) in supportedMedia" :key="key">
          <span class="material-icons checked" v-if="value">check_circle</span>
          <span class="material-icons" v-else>close</span>
          {{key}}
        </li>
      </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'probe',
  props: ['info'],
  watch: {},
  computed: {
    supportedDrms() {
      const drms = [
        'com.widevine.alpha',
        'com.microsoft.playready',
        'com.apple.fps',
        'org.w3.clearkey',
      ];
      const drm = this.info && this.info.drm;
      if (drm) {
        const filtered = drms.filter((key) => drms.includes(key))
          .reduce((obj, key) => {
            obj[key] = drm[key]; // eslint-disable-line no-param-reassign
            return obj;
          }, {});
        return filtered;
      }
      return {};
    },
    supportedMedia() {
      const medias = [
        'video/mp4; codecs="avc1.42E01E"',
        'video/mp4; codecs="hev1.1.6.L93.90"',
        'video/mp4; codecs="hev1.1.6.L90.90"',
        'video/mp4; codecs="hvc1.1.6.L93.90"',
        'audio/mp4; codecs="ac-3"',
        'audio/mp4; codecs="ec-3"',
        'audio/mp4; codecs="flac"',
        'audio/mp4; codecs="mp4a.40.2"',
        'audio/mp4; codecs="opus"',
        'video/webm; codecs="vp8"',
        'video/webm; codecs="vp9"',
      ];
      const media = this.info && this.info.media;
      if (media) {
        const filtered = medias.filter((key) => medias.includes(key))
          .reduce((obj, key) => {
            obj[key] = media[key]; // eslint-disable-line no-param-reassign
            return obj;
          }, {});
        return filtered;
      }
      return {};
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

.codecs li {
  display: inline-block;
  width: 50%;
}
</style>
