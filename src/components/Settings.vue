<template>
<div class="settings">
  <h4>Settings</h4>
  <div class="row">
    <div class="four columns">
      <label for="player">Player</label>
      <select
        v-model="selectedPlayer"
        class="u-full-width"
        @change="$emit('changePlayer', selectedPlayer)">
        <option v-for="o in players" :key="o.id" :value="o.component">{{o.name}}</option>
      </select>
    </div>

    <div class="eight columns">
      <label for="drm">Select Media</label>
      <select v-model="selectedMedia" class="u-full-width">
        <optgroup :label="o.name" v-for="o in sources.items" :key="o.id">
          <option
            v-for="i in o.submenu"
            :key="i.id"
            :value="{ name: i.name, url: i.url }"
          >{{i.name}}</option>
        </optgroup>
      </select>
    </div>
  </div>

  <div v-if="selectedMedia.name === 'Custom' || isCustom">
    <label>Media URL</label>
    <input
      v-model="selectedMedia.url"
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
    <button
      class="button-primary"
      v-on:click="$emit('load', { url: selectedMedia.url, licenseUrl, drm })">
      Load Media
    </button>
    <button v-on:click="$emit('unload')">Unload</button>
  </div>
</div>
</template>

<script>
import config from '@/config';
import sources from '@/sources.json';

const {
  defaultMedia,
  defaultLicenseUrl,
  defaultDrm,
  players,
} = config;

export default {
  name: 'Settings',
  components: {},
  data() {
    return {
      sources,
      players,
      selectedPlayer: 'ShakaPlayer',
      selectedMedia: defaultMedia,
      licenseUrl: defaultLicenseUrl,
      drm: defaultDrm,
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
  },
  methods: {
    setQueryParams() {
      // Check if query params are set.
      if (this.$route.query.url) {
        this.selectedMedia.url = this.$route.query.url;
      }
      if (this.$route.query.licenseUrl) {
        this.licenseUrl = this.$route.query.licenseUrl;
      }
      if (this.$route.query.drm) {
        this.drm = this.$route.query.drm.toLowerCase();
      }
    },
  },
};
</script>

<style scoped>
.settings {
  margin-bottom: 10px;
}

.settings button {
  margin: 0 2px;
}
</style>
