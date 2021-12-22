<h1 align="center">Welcome to @treasure-chess/chess-image-generator 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/@treasure-chess/chess-image-generator" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@treasure-chess/chess-image-generator.svg">
  </a>
  <a href="https://github.com/treasure-chess/chess-image-generator/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://twitter.com/niftychess" target="_blank">
    <img alt="Twitter: niftychess" src="https://img.shields.io/twitter/follow/niftychess.svg?style=social" />
  </a>
</p>

> Generate an image of the game board final state

Adapted from https://github.com/andyruwruw/chess-image-generator. Updated to work in both node and browser environments, with a limited feature set specifically for Treasure Chess.

## Install

```sh
yarn add @treasure-chess/chess-image-generator
```

## Usage

First calculate the final state of the board using the chess.js library. You can save the output, rather than having to perform this step every time (takes up to 400ms per game).

```js
const { getBoardLayout } = require("@treasure-chess/chess-image-generator");

const moves = `1. e4 e6 2. d4 d5 3. Nd2 c5`;
const boardLayout = getBoardLayout(moves);
```

Now use the data from the previous step. Options are passed directly to `chess-image-generator` (options listed [here](https://github.com/andyruwruw/chess-image-generator)).

```js
const { getBoardBase64 } = require("@treasure-chess/chess-image-generator");

const MyComponent = () => {
  const options = {
    size: 640,
    dark: "rgb(181, 137, 98)",
    light: "rgb(241, 216, 180)",
    style: "neo",
  };

  const boardBase64 = await getBoardBase64(
    boardLayout,
    "black", // Which player to show on bottom
    options
  );

  return <img src={boardBase64} />;
};
```

## Run tests

```sh
yarn test
```

## Authors

👤 **Andrew Young**

👤 **Joseph Schiarizzi**

👤 **Patrick Gallagher**

- Website: https://niftychess.com
  - Twitter: [@niftychess](https://twitter.com/niftychess)
  - GitHub: [@treasure-chess](https://github.com/treasure-chess)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
