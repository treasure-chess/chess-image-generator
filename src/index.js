const ChessImageGenerator = require("./chess-image-generator");
// Fix for broken chess.js exports. See https://github.com/jhlywa/chess.js/issues/196
let Chess;
if (
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null
) {
  /* eslint-disable global-require */
  const chess = require("chess.js");
  Chess = chess.Chess;
} else {
  Chess = require("chess.js");
  /* eslint-enable global-require */
}

/**
 * Loads PGN into chess.js object, and calculates the location pieces
 * @param {string} pgn Chess game PGN
 */
const getBoardLayout = (pgn) => {
  const chess = new Chess();
  chess.load_pgn(pgn);
  let boardLayout = {};
  ["a", "b", "c", "d", "e", "f", "g", "h"].map((col) => {
    new Array(8)
      .fill(null)
      .map((_, i) => (boardLayout[col + (i + 1)] = chess.get(col + (i + 1))));
  });
  return boardLayout;
};

// outputs base64 data for a jpeg, NOT a png
const getBoardBase64 = async (boardLayout, playerColor, options) => {
  if (!boardLayout) {
    throw new Error("no PGN passed");
  }
  let config = {
    size: 640,
    dark: "rgb(181, 137, 98)",
    light: "rgb(241, 216, 180)",
    style: "neo",
  };
  if (options) config = options;

  let flipped = false;
  if (playerColor === "black") flipped = true;

  const imageGenerator = new ChessImageGenerator({
    ...config,
    flipped,
  });
  return await imageGenerator.generateDataURL(boardLayout);
};

module.exports = { getBoardLayout, getBoardBase64 };
