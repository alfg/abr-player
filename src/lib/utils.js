const utils = {
  buildTimeString(displayTime, showHour) {
    const h = Math.floor(displayTime / 3600);
    const m = Math.floor((displayTime / 60) % 60);
    let s = Math.floor(displayTime % 60);
    if (s < 10) s = `0${s}`;
    let text = `${m}:${s}`;
    if (showHour) {
      if (m < 10) text = `0${text}`;
      text = `${h}:${text}`;
    }
    return text;
  },

  probeSupport() {
    return utils.probeDrm().then((drm) => {
      const media = utils.probeMedia();
      const obj = {
        media,
        drm,
      };

      return obj;
    });
  },

  probeMedia() {
    const support = {};
    const testMimeTypes = [
      'video/mp4; codecs="avc1.42E01E"',
      'video/mp4; codecs="avc3.42E01E"',
      'video/mp4; codecs="hev1.1.6.L93.90"',
      'video/mp4; codecs="hvc1.1.6.L93.90"',
      'video/mp4; codecs="hev1.2.4.L153.B0"; eotf="smpte2084"', // HDR HEVC
      'video/mp4; codecs="hvc1.2.4.L153.B0"; eotf="smpte2084"', // HDR HEVC
      'video/mp4; codecs="vp9"',
      'video/mp4; codecs="vp09.00.10.08"',
      'audio/mp4; codecs="mp4a.40.2"',
      'audio/mp4; codecs="ac-3"',
      'audio/mp4; codecs="ec-3"',
      'audio/mp4; codecs="opus"',
      'audio/mp4; codecs="flac"',
      'video/webm; codecs="vp8"',
      'video/webm; codecs="vp9"',
      'video/webm; codecs="vp09.00.10.08"',
      'audio/webm; codecs="vorbis"',
      'audio/webm; codecs="opus"',
      'video/mp2t; codecs="avc1.42E01E"',
      'video/mp2t; codecs="avc3.42E01E"',
      'video/mp2t; codecs="hvc1.1.6.L93.90"',
      'video/mp2t; codecs="mp4a.40.2"',
      'video/mp2t; codecs="ac-3"',
      'video/mp2t; codecs="ec-3"',
      'text/vtt',
      'application/mp4; codecs="wvtt"',
      'application/ttml+xml',
      'application/mp4; codecs="stpp"',
    ];

    testMimeTypes.forEach((type) => {
      support[type] = MediaSource.isTypeSupported(type);
      const basicType = type.split(';')[0];
      support[basicType] = support[basicType] || support[type];
    });
    return support;
  },

  probeDrm() {
    const testKeySystems = [
      'org.w3.clearkey',
      'com.widevine.alpha',
      'com.microsoft.playready',
      'com.apple.fps.2_0',
      'com.apple.fps.1_0',
      'com.apple.fps',
      'com.adobe.primetime',
    ];

    const basicVideoCapabilities = [
      { contentType: 'video/mp4; codecs="avc1.42E01E"' },
      { contentType: 'video/webm; codecs="vp8"' },
    ];
    const basicConfig = {
      videoCapabilities: basicVideoCapabilities,
    };
    const offlineConfig = {
      videoCapabilities: basicVideoCapabilities,
      persistentState: 'required',
      sessionTypes: ['persistent-license'],
    };

    // Try the offline config first, then fall back to the basic config.
    const configs = [offlineConfig, basicConfig];

    const support = new Map();
    const testSystem = async (keySystem) => {
      try {
        const access = await navigator.requestMediaKeySystemAccess(keySystem, configs);
        support.set(keySystem, true);
        await access.createMediaKeys();
      } catch (e) {
        support.set(keySystem, false);
      }
    };

    const tests = testKeySystems.map((keySystem) => testSystem(keySystem));
    return Promise.all(tests).then(() => utils.asObject(support));
  },

  asObject(map) {
    const obj = {};
    map.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  },
};

export default utils;
