const ChessImageGenerator = require("./chess-image-generator");

// outputs base64 data for a jpeg, NOT a png
const getBoardBase64 = async (pgn, playerColor, options) => {
  if (!pgn) {
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

  await imageGenerator.loadPGN(pgn);
  const base64str = await imageGenerator.generateDataURL();

  return base64str;
};

module.exports = getBoardBase64;
