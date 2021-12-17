# chess-image-generator

> Generate an image of the game board final state

Adapted from https://github.com/andyruwruw/chess-image-generator

## Usage

Options are passed directly to `chess-image-generator` (options listed [here](https://github.com/andyruwruw/chess-image-generator)).

```js
const getBoardBase64 = require("@treasure-chess/chess-image-generator");

const MyComponent = () => {
  const moves = `1. e4 e6 2. d4 d5 3. Nd2 c5`;

  const options = {
    size: 640,
    dark: "rgb(181, 137, 98)",
    light: "rgb(241, 216, 180)",
    style: "neo",
  };

  const boardBase64 = await getBoardBase64(
    moves, // List of moves or PGN
    "black", // Which player to show on bottom
    options
  );

  return <img src={boardBase64} />;
};
```
