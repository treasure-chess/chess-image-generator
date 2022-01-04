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
const getBoardLayout = (pgn) => {
  const chess = new Chess();
  chess.load_pgn(pgn);
  const boardLayout = {};
  ["a", "b", "c", "d", "e", "f", "g", "h"].map((col) => {
    new Array(8).fill(null).map((_, i) => {
      const piece = chess.get(col + (i + 1));
      if (piece) boardLayout[col + (i + 1)] = piece;
    });
  });
  return boardLayout;
};

export default getBoardLayout;
