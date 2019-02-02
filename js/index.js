/* CONSTANTS DECLARATION */

const TOP_ROW = 'top-row';
const HOME_ROW = 'home-row';
const BOTTOM_ROW = 'bottom-row';
const START = 0;
const END = 1;

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

const file = (id, name) => {
  return {
    _id: id,
    _name: name,
    _sound: new Howl({
      src: ['./audio/' + name],
      volume: 1.0,
      onend: function () {
        this._playback = false;
      }
    }),
    _playback: false,

    get id () {
      return this._id;
    },

    get name () {
      return this._name;
    },
    set name (name) {
      this._name = name;
    },

    get playback() {
      return this._playback;
    },

    play () {
      this._playback = true;
      this._sound.play();
    },

    stop () {
      this._playback = false;
      this._sound.stop();
    },
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

// Library Directory Listing

/**
* Play a sound. Stops if is already playing.
*
* @param file   A file object.
*/
const previewSound = (element, file) => {
  if (file.playback == true) {
    file.stop();
  }
  else {
    file.play();
  }
};

/**
*
*/
const togglePlaybackIcon = (element, file) => {
  const id = file.id;
  const li = document.getElementById('audio-' + id);
  const icon = li.firstChild;

  if (file.playback === false) {
    icon.className = 'custom-icons play_arrow_outline icon-s';
  }
  else {
    icon.className = 'custom-icons stop icon-s';
  }
}

/**
* Return an array of file names.
*/
const retrieveListings = () => {
  const library =[ 'Clap funk.wav', 'Clap.wav', 'HH Big.wav', 'HH small.wav',
  'HH.wav', 'Impact kick.wav', 'Kick drum 1.wav', 'Kick drum 2.wav',
  'Kick drum 80s mastered 2.wav', 'Kick drum 80s mastered 3.wav',
  'Kick drum 80s mastered.wav', 'Loop funk.wav', 'Snare 2.wav',
  'Snare 3.wav', 'Snare flat 80s 2.wav', 'Snare flat 80s.wav', 'Snare.wav',
  'Tom.wav' ];

  return library;
};

/**
* Convert a list of string names into file objects.
* Return an array of file objects.
*
* @param listings   An array of string.
*/
const generateLibrary = (listings) => {
  const library = [];

  for (let i = 0; i < listings.length; i++) {
    let fileName = listings[i];
    const fileObj = file(i, fileName);
    library.push(fileObj);
  }

  return library;
};

/**
* Format markup for a single listing.
* Return a li element of this markup.
*
* @param file   A file object.
*/
const renderListing = (file) => {
  let li = document.createElement('li');

  li.id = 'audio-' + file.id;
  li.className = 'interactable';
  li.innerHTML =
  `<i class="custom-icons play_arrow_outline icon-s"></i>
  <span>${file.name}</span>`;

  li.onclick = function (e) {
    previewSound(e, file);
    togglePlaybackIcon(e, file);
  }

  return li;
};

/**
* Render the directory listing in sound library.
*
* @param library   An array of file objects.
*/
const displayListing = (library) => {
  library.forEach((file) => {
    const li = renderListing(file);
    document.getElementById('root-directory').appendChild(li);
  });
};

/* MAIN */

window.onload = function() {
  const keyboard = generateKeyboard();
  displayKeyboard(keyboard);

  const listings = retrieveListings();
  const library = generateLibrary(listings);
  displayListing(library);
};
