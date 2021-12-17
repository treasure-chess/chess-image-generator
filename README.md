# chess-image-generator

> Create PNG of game board in the final state

Adapted from https://github.com/andyruwruw/chess-image-generator

## Usage

In the browser:

```js
const getBoardBase64 = require("@treasure-chess/chess-image-generator");

const MyComponent = () => {
  const moves = `1. e4 e6 2. d4 d5 3. Nd2 c5`;

  const boardBase64 = await getBoardBase64(moves, "black");

  return <img src={boardBase64} />;
};
```

## Changes

- Removed `fs` and `canvas-to-buffer`, and associated functions.
- Replaced `generateBuffer()` with `generateDataURL`.

To use in a browser environment, the images of the chess pieces must be exposed. The easiest way to do this is by placing the `resources` folder in your app's `public` folder.
