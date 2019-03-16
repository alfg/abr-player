const config = {
  defaultUrl: 'https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel-dash-widevine.ism/.mpd',
  defaultLicenseUrl: 'https://widevine-proxy.appspot.com/proxy',
  defaultDrm: 'widevine',
  videoItems: [
    {
      name: 'Tears of Steel (DASH Clear)',
      url: 'https://storage.googleapis.com/shaka-demo-assets/tos-ttml/dash.mpd',
    },
    {
      name: 'Tears of Steel (DASH Clear) 2',
      url: 'https://storage.googleapis.com/shaka-demo-assets/tos-ttml/dash.mpd2',
    },
    {
      name: 'Angel One (multicodec, multilingual)',
      url: 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd',
    },
    {
      name: 'Angel One (multicodec, multilingual, Widevine)',
      url: 'https://storage.googleapis.com/shaka-demo-assets/angel-one-widevine/dash.mpd',
    },
    {
      name: 'Sintel 4k (multicodec)',
      url: 'https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd',
    },
    {
      name: 'Big Buck Bunny',
      url: 'https://dash.akamaized.net/dash264/TestCases/1c/qualcomm/2/MultiRate.mpd',
    },
  ],
  licenseServers: {
    'com.microsoft.playready': 'https://test.playready.microsoft.com/service/rightsmanager.asmx?PlayRight=1&UseSimpleNonPersistentLicense=1',
    'com.widevine.alpha': 'https://cwip-shaka-proxy.appspot.com/no_auth',
  },
};

export default config;
