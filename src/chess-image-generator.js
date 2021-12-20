const { createCanvas, loadImage } = require("canvas");
const path = require("path");

// Fix for broken chess.js exports. See https://github.com/jhlywa/chess.js/issues/196
let Chess;
if (
  typeof process !== "undefined"
  && process.versions != null
  && process.versions.node != null
) {
  /* eslint-disable global-require */
  const chess = require("chess.js");
  Chess = chess.Chess;
} else {
  Chess = require("chess.js");
  /* eslint-enable global-require */
}

const {
  cols,
  white,
  black,
  defaultSize,
  defaultLight,
  defaultDark,
  defaultStyle,
  filePaths,
} = require("./config/index");
/**
 *
 * @typedef {object} Options
 * @property {number} [size] Pixel length of desired image
 * @property {string} [light] Color of light squares
 * @property {string} [dark] Color of dark squares
 * @property {"merida"|"alpha"|"cheq"} [style] Desired style of pieces
 * @property {boolean} [flipped] Whether the board is to be flipped or not
 */
/**
 * Object constructor, initializes options.
 * @param {Options} [options] Optional options
 */
function ChessImageGenerator(options = {}) {
  this.chess = new Chess();

  this.size = options.size || defaultSize;
  this.light = options.light || defaultLight;
  this.dark = options.dark || defaultDark;
  this.style = options.style || defaultStyle;
  this.flipped = options.flipped || false;

  this.ready = false;
}

ChessImageGenerator.prototype = {
  /**
   * Loads PGN into chess.js object.
   * @param {string} pgn Chess game PGN
   */
  async loadPGN(pgn) {
    if (!this.chess.load_pgn(pgn)) {
      throw new Error("PGN could not be read successfully");
    } else {
      this.ready = true;
    }
  },

  /**
   * Loads FEN into chess.js object
   * @param {string} fen Chess position FEN
   */
  async loadFEN(fen) {
    if (!this.chess.load(fen)) {
      throw new Error("FEN could not be read successfully");
    } else {
      this.ready = true;
    }
  },

  /**
   * Loads position array into chess.js object
   * @param {string[][]} array Chess position array
   */
  loadArray(array) {
    this.chess.clear();

    for (let i = 0; i < array.length; i += 1) {
      for (let j = 0; j < array[i].length; j += 1) {
        if (array[i][j] !== "" && black.includes(array[i][j].toLowerCase())) {
          this.chess.put(
            {
              type: array[i][j].toLowerCase(),
              color: white.includes(array[i][j]) ? "w" : "b",
            },
            cols[j] + (8 - i),
          );
        }
      }
    }
    this.ready = true;
  },

  /**
   * Generates buffer image based on position
   * @returns {Promise<Buffer>} Image buffer
   */
  async generateDataURL() {
    if (!this.ready) {
      throw new Error("Load a position first");
    }

    const canvas = createCanvas(this.size, this.size);
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.rect(0, 0, this.size, this.size);
    ctx.fillStyle = this.light;
    ctx.fill();

    const row = this.flipped ? (r) => r + 1 : (r) => 7 - r + 1;
    const col = this.flipped ? (c) => c : (c) => 7 - c;

    for (let i = 0; i < 8; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        if ((i + j) % 2 === 0) {
          ctx.beginPath();
          ctx.rect(
            (this.size / 8) * (7 - j + 1) - this.size / 8,
            (this.size / 8) * i,
            this.size / 8,
            this.size / 8,
          );
          ctx.fillStyle = this.dark;
          ctx.fill();
        }

        const piece = this.chess.get(cols[col(j)] + row(i));
        if (
          piece
          && piece.type !== ""
          && black.includes(piece.type.toLowerCase())
        ) {
          const image = `resources/${this.style}/${
            filePaths[`${piece.color}${piece.type}`]
          }.png`;
          const imageFile = await loadImage(path.join(__dirname, image));
          await ctx.drawImage(
            imageFile,
            (this.size / 8) * (7 - j + 1) - this.size / 8,
            (this.size / 8) * i,
            this.size / 8,
            this.size / 8,
          );
        }
      }
    }

    return canvas.toDataURL();
  },
};

module.exports = ChessImageGenerator;
