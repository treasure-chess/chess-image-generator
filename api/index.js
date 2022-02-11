const getBoardLayout = require("../src/getBoardLayout");
const getBoardBase64Node = require("../src/node/getBoardBase64-node");

module.exports = async (req, res) => {
  try {
    const { moves, boardLayout, playerColor, options } = req.query;

    // Set your own default config here
    let config = {
      size: 640,
      dark: "rgb(181, 137, 98)",
      light: "rgb(241, 216, 180)",
      style: "alpha",
    };

    if (options) config = options;

    let layout = boardLayout;
    if (!layout) {
      if (!moves) throw "Either boardLayout or moves must be provided";
      layout = getBoardLayout(moves);
    }

    const buffer = await getBoardBase64Node(layout, playerColor, config);

    res.setHeader("Content-Type", "image/jpeg");
    res.send(buffer);
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      body: error.message,
    });
  }
};
