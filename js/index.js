/* CONSTANTS DECLARATION */

const TOP_ROW = 'top-row';
const HOME_ROW = 'home-row';
const BOTTOM_ROW = 'bottom-row';
const START = 0;
const END = 1;

const FOLDER = 0;
const FILE = 1;

/* OBJECTS */

// Keyboard

const key = (letter) => {
  return {
    _letter: letter,
    _playback: false,
    _audio: '',

    get letter() {
      return this._letter;
    },

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
};

const track = (name) => {
  return {
    _name: name,
    _volume: 100,
    _loop: false,
    _key: '',

    get name () {
      return this._name;
    },
    set name (name) {
      this._name = name;
    },

    get volume () {
      return this._volume;
    },
    set volume (amount) {
      this._volume = amount;
    },

    toggleLoop () {
      this._loop = !this._loop;
    },

    mapKey (key) {
      this._key = key;
    }
  }
};

// Sound Library

const library = [
  { type: 'FOLDER', name: 'Drums'},
  { type: 'FILE', name: 'Clap funk.wav' },
  { type: 'FILE', name: 'Clap.wav' },
  { type: 'FILE', name: 'HH Big.wav' },
  { type: 'FILE', name: 'HH small.wav' },
  { type: 'FILE', name: 'HH.wav' },
  { type: 'FILE', name: 'Impact kick.wav' },
  { type: 'FILE', name: 'Kick drum 1.wav' },
  { type: 'FILE', name: 'Kick drum 2.wav' },
  { type: 'FILE', name: 'Kick drum 80s mastered 2.wav' },
  { type: 'FILE', name: 'Kick drum 80s mastered 3.wav' },
  { type: 'FILE', name: 'Kick drum 80s mastered.wav' },
  { type: 'FILE', name: 'Loop funk.wav' },
  { type: 'FILE', name: 'Snare 2.wav' },
  { type: 'FILE', name: 'Snare 3.wav' },
  { type: 'FILE', name: 'Snare flat 80s 2.wav' },
  { type: 'FILE', name: 'Snare flat 80s.wav' },
  { type: 'FILE', name: 'Snare.wav' },
  { type: 'FILE', name: 'Tom.wav' },
];

const file = (name) => {
  return {
    _name: name,
    _extension: '',
    _playback: false,

    get name () {
      return this._name;
    },
    set name (name) {
      this._name = name;
    },

    play () {
      this._playback = true;
      // TODO
    },

    stop () {
      this._playback = false;
      //TODO
    }
  }
};

const folder = () => {
  return {
    _name: 'new folder',
    _files: [],
    _isOpen: false,

    get name () {
      return this._name;
    },
    set name (name) {
      this._name = name;
    },

    addNewFile (file) {
      this._files.push(file);
    }

    removeFile (file) {
      // TODO
    }
  }
};

/* FUNCTIONS DECLARATION */

// Keyboard

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
};

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
};

/**
* Return a range array of [start, end] indicating the indices of keys
* on the keyboard given the {@code rowType}.
*
* @param rowType    Indicates top, home, or bottom row of keyboard.
*/
const getKeyRange = (rowType) => {
  const range = [];

  switch(rowType) {
    case TOP_ROW:
      range.push(0, 9);
      break;

    case HOME_ROW:
      range.push(10, 18);
      break;

    case BOTTOM_ROW:
      range.push(19, 25);
      break;
  }

  return range;
};

/**
* Format markup for a single key.
* Return a div element of this markup.
*
* @param key   A key object.
*/
const renderKey = (key) => {
  let div = document.createElement('div');

  div.className = 'key';
  div.innerHTML =
  `<span class="key-lettering">${key.letter}</span>
  <div class="controls">
    <i class="material-icons icon-s">play_arrow</i>
    <i class="material-icons icon-s">loop</i>
    <div class="volume-control"></div>
  </div>`;

  return div;
};

/**
* Render a row of keys.
*
* @param keyboard   An array of key objects.
* @param rowType    Indicates top, home, or bottom row of keyboard.
*/
const displayKeyRow = (keyboard, rowType) => {
  const range = getKeyRange(rowType);

  for (let i = range[START]; i <= range[END]; i++) {
    let key = keyboard[i];
    const div = renderKey(key);
    document.getElementById(rowType).appendChild(div);
  }
};

/**
* Render the on-screen keyboard.
*
* @param keyboard   An array of key objects.
*/
const displayKeyboard = (keyboard) => {
  displayKeyRow(keyboard, TOP_ROW);
  displayKeyRow(keyboard, HOME_ROW);
  displayKeyRow(keyboard, BOTTOM_ROW);
};

/* MAIN */

window.onload = function() {
  const keyboard = generateKeyboard();
  displayKeyboard(keyboard);
};