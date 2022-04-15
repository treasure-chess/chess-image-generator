<h1 align="center"><img width="600" style="border-radius: 30px;" src="https://github.com/treasure-chess/treasure-chess/blob/main/github-header.png?raw=true"/></h1>
<h1 align="center">Welcome to @treasure-chess/chess-image-generator 👋</h1>

<p align="center">
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://www.npmjs.com/package/@treasure-chess/chess-image-generator" target="_blank">
  <img alt="Version" src="https://img.shields.io/npm/v/@treasure-chess/chess-image-generator.svg">
  </a>
  <a href="https://twitter.com/treasurechess_" target="_blank">
    <img alt="Twitter: treasurechess_" src="https://img.shields.io/twitter/follow/treasurechess_.svg?style=social" />
  </a>
</p>

> Generate an image of the game board final state

**Almost all of the code & tooling for Treasure Chess has been open sourced**. We hope you find these resources useful. Happy hacking!

- App tooling using RedwoodJs 👉 https://github.com/pi0neerpat/redwood-devops-example
- Code specific to Treasure Chess (smart contracts, achievements, card generation, etc.) is on our organization page: https://github.com/treasure-chess

Adapted from https://github.com/andyruwruw/chess-image-generator. Updated to work in both node and browser environments, with limited features designed specifically for Treasure Chess.

## Demo

This library is deployed on vercel for testing purposes. Open this link to try it out:

http://chess-image-generator.vercel/app/api?moves=1.%20e4%20e6%202.%20d4%20d5%203.%20Nd2%20c5&playerColor=black

## Easy deployment

Vercel [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com/treasure-chess/chess-image-generator)

## Install

```sh
yarn add @treasure-chess/chess-image-generator
```

## Usage

First calculate the final state of the board using the chess.js library. You should save the output, rather than performing this step every page load, which saves up to 400ms per game.

```js
const { getBoardLayout } = require("@treasure-chess/chess-image-generator");

const moves = `1. e4 e6 2. d4 d5 3. Nd2 c5`;
const boardLayout = getBoardLayout(moves);
```

Now use the data from the previous step to create the image. See available options [here](https://github.com/andyruwruw/chess-image-generator).

```js
// Browser environments
const { getBoardBase64 } = require("@treasure-chess/chess-image-generator");
// Node environments
const getBoardBase64Node = require("@treasure-chess/chess-image-generator/src/node/getBoardBase64-node");

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

NOTE: For usage in a web app, the `/resources` folder must be placed in your app's `/public` folder.

## Run tests

```sh
yarn test
```

## Contributors ✨

👤 **Patrick Gallagher**

- Website: https://patrickgallagher.dev
- Twitter: [@pi0neerpat](https://twitter.com/pi0neerpat)
- GitHub: [@pi0neerpat](https://github.com/pi0neerpat)

👤 **Joseph Schiarizzi**

👤 **Andrew Young**

👤 **Treasure Chess Community <maintainers@niftychess.com>**

- Website: https://treasurechess.com
- Twitter: [@treasurechess\_](https://twitter.com/treasurechess_)
- GitHub: [@Treasure-Chess](https://github.com/Treasure-Chess)

## 📝 License

Copyright © 2021 Nifty Chess, Inc.<br />
This project is [MIT](https://github.com/Treasure-Chess/chess-achievements/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
