const { createCanvas, loadImage } = require("canvas");
const { isNode } = require("./helpers");

const {
  cols,
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
  this.size = options.size || defaultSize;
  this.light = options.light || defaultLight;
  this.dark = options.dark || defaultDark;
  this.style = options.style || defaultStyle;
  this.flipped = options.flipped || false;
}

ChessImageGenerator.prototype = {
  /**
   * Generates buffer image based on position
   * @param {string} boardLayout Pre-computed board layout object
   * @returns {Promise<Buffer>} Image buffer
   */
  async generateDataURL(boardLayout) {
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
        const piece = boardLayout[cols[col(j)] + row(i)];
        if (
          piece
          && piece.type !== ""
          && black.includes(piece.type.toLowerCase())
        ) {
          const image = `resources/${this.style}/${
            filePaths[`${piece.color}${piece.type}`]
          }.png`;
          let imagePath = `/${image}`;
          if (isNode) imagePath = `${__dirname}/${image}`;
          const imageFile = await loadImage(imagePath);
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

/**
 * Loads PGN into chess.js object, and calculates the location pieces
 * @returns {Promise<Buffer>} Image buffer
 */
// outputs base64 data for a jpeg, NOT a png
const getBoardBase64 = async (boardLayout, playerColor, options) => {
  if (!boardLayout) {
    throw new Error("no PGN passed");
  }
  let config = {
    size: 640,
    dark: "rgb(181, 137, 98)",
    light: "rgb(241, 216, 180)",
    style: "alpha",
  };
  if (options) config = options;

  let flipped = false;
  if (playerColor === "black") flipped = true;

  config.flipped = flipped;

  const imageGenerator = new ChessImageGenerator(config);
  return imageGenerator.generateDataURL(boardLayout);
};

module.exports = getBoardBase64;
