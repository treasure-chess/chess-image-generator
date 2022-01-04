import ChessImageGenerator from "./chess-image-generator";
import { isNode } from "./helpers";

// Fix for broken chess.js exports. See https://github.com/jhlywa/chess.js/issues/196
let Chess;
if (isNode) {
  const chess = require("chess.js");
  Chess = chess.Chess;
} else {
  Chess = require("chess.js");
}

/**
 * Loads PGN into chess.js object, and calculates the location pieces
 * @param {string} pgn Chess game PGN
 */
export const getBoardLayout = (pgn) => {
  const chess = new Chess();
  chess.load_pgn(pgn);
  const boardLayout = {};
  ["a", "b", "c", "d", "e", "f", "g", "h"].map((col) => {
    new Array(8)
      .fill(null)
      .map((_, i) => (boardLayout[col + (i + 1)] = chess.get(col + (i + 1))));
  });
  return boardLayout;
};

/**
 * Loads PGN into chess.js object, and calculates the location pieces
 * @returns {Promise<Buffer>} Image buffer
 */
// outputs base64 data for a jpeg, NOT a png
export const getBoardBase64 = async (boardLayout, playerColor, options) => {
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
