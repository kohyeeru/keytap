const key = (key) => {
  return {
    _key: key,
    _playback: false,
    _audio: '',

    play () {
      this._playback = true;
      // TODO
    },

    stop () {
      this._playback = false;
      //TODO
    },

    mapAudio (trackObj) {
      this._audio = trackObj;
    },

    unmapAudio () {
      this._audio = '';
    }
  }
}
