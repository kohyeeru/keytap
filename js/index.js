/* CONSTANTS DECLARATION */

const TOP_ROW = 'top-row';
const HOME_ROW = 'home-row';
const BOTTOM_ROW = 'bottom-row';
const START = 0;
const END = 1;

/* OBJECTS */

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

/* FUNCTIONS DECLARATION */

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
}

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
}

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
}

/**
* Render the on-screen keyboard.
*
* @param keyboard   An array of key objects.
*/
const displayKeyboard = (keyboard) => {
  displayKeyRow(keyboard, TOP_ROW);
  displayKeyRow(keyboard, HOME_ROW);
  displayKeyRow(keyboard, BOTTOM_ROW);
}

/* MAIN */

window.onload = function() {
  const keyboard = generateKeyboard();
  displayKeyboard(keyboard);
}
