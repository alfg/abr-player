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

  isChrome() {
    return /Chrome/.test(navigator.userAgent)
      && /Google Inc/.test(navigator.vendor);
  },
};

export default utils;
