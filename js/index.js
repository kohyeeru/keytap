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

const track = (name) => {
  return {
    _name: name,
    _volume: 100,
    _loop: false,
    _key: '',

    rename (name) {
      this._name = name;
    },

    adjustVolume (amount) {
      this._volume = amount;
    },

    toggleLoop () {
      this._loop = !this._loop;
    },

    mapKey (key) {
      this._key = key;
    }
  }
}
