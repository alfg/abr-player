const config = {
  defaultMedia: {
    name: 'Tears of Steel (DASH Widevine)',
    url: 'https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel-dash-widevine.ism/.mpd',
  },
  defaultLicenseUrl: 'https://cwip-shaka-proxy.appspot.com/no_auth',
  defaultDrm: 'widevine',
  players: [
    {
      name: 'Shaka Player',
      component: 'ShakaPlayer',
    },
    {
      name: 'HasPlayer.js',
      component: 'HasPlayer',
    },
    {
      name: 'dash.js',
      component: 'DashjsPlayer',
    },
    {
      name: 'hls.js',
      component: 'HlsjsPlayer',
    },
  ],
  defaultLicenseServers: {
    'com.microsoft.playready': 'https://test.playready.microsoft.com/service/rightsmanager.asmx?PlayRight=1&UseSimpleNonPersistentLicense=1',
    'com.widevine.alpha': 'https://cwip-shaka-proxy.appspot.com/no_auth',
  },
};

export default config;
