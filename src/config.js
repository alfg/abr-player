const config = {
  defaultUrl: 'https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel-dash-widevine.ism/.mpd',
  defaultLicenseUrl: 'https://widevine-proxy.appspot.com/proxy',
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
  ],
  mediaItems: [
    {
      name: 'Tears of Steel (DASH Widevine)',
      url: 'https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel-dash-widevine.ism/.mpd',
    },
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
    {
      name: 'Super Speedway (Smooth Streaming Clear)',
      url: 'http://playready.directtaps.net/smoothstreaming/SSWSS720H264/SuperSpeedway_720.ism/Manifest',
    },
    {
      name: 'Super Speedway (Smooth Streaming PlayReady)',
      url: 'http://playready.directtaps.net/smoothstreaming/SSWSS720H264PR/SuperSpeedway_720.ism/Manifest',
    },
    {
      name: 'Custom',
      url: '',
    },
  ],
  licenseServers: {
    'com.microsoft.playready': 'https://test.playready.microsoft.com/service/rightsmanager.asmx?PlayRight=1&UseSimpleNonPersistentLicense=1',
    'com.widevine.alpha': 'https://cwip-shaka-proxy.appspot.com/no_auth',
  },
};

export default config;
