# chess-image-generator

> Create PNG of game board in the final state

Adapted from https://github.com/andyruwruw/chess-image-generator

## Changes

- Removed `fs` and `canvas-to-buffer`, and associated functions.
- Replaced `generateBuffer()` with `generateDataURL`.

To use in a browser environment, the images of the chess pieces must be exposed. The easiest way to do this is by placing the `resources` folder in your app's `public` folder.
