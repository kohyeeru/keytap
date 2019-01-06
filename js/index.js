const key = (letter) => {
  return {
    _letter: letter,
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

/**
* Convert numbers in base-10 to base-36 to generate alphabets.
* Return an array of alphabets a-z.
*/
const generateAlphabets = () => {
  const alphabets = [];
  
  for (let i = 10; i < 36; i++) {
    let letter = i.toString(36);
    alphabets.push(letter);
  }

  return alphabets;
}

/**
* Return an array of key objects from a-z.
*/
const generateKeyboard = () => {
  const keyboard = [];
  const alphabets = generateAlphabets();

  alphabets.forEach((letter) => {
    const keyObj = key(letter);
    keyboard.push(keyObj);
  });

  return keyboard;
}
