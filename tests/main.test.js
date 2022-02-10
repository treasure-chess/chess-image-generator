const { writeFileSync } = require("fs");
const path = require("path");
const { Chess } = require("chess.js");

const { performance } = require("perf_hooks");

const { getBoardLayout, getBoardBase64 } = require("../src/");
const getBoardBase64Node = require("../src/node/getBoardBase64-node");

const testMoves1 =
  "1. e4 e6 2. d4 d5 3. Nd2 c5 4. Ngf3 Nf6 5. e5 Nfd7 6. c3 Nc6 7. Bd3 Qb6 8. O-O cxd4 9. cxd4 Nxd4 10. Nxd4 Qxd4 11. Nf3 Qb6 12. Qa4 a6 13. Qg4 g6 14. Bg5 Bg7 15. Rfe1 Nc5 16. Qd4 Nd7 17. Qf4 Nc5 18. Qd4 Nd7 19. Qc3 Qc5 20. Qd2 b5 21. Rac1 Qa7 22. Qb4 Bf8 23. Qa5 Qb6 24. Qxb6 Nxb6 25. Rc7 Nd7 26. Rec1 Bc5 27. b4 Bxf2+ 28. Kxf2 O-O 29. Be7 Re8 30. Bd6 Nb6 31. Ng5 Nc4 32. Nxf7 a5 33. Nh6+ Kh8 34. Be7 Rxe7 35. Rxe7 axb4 36. Ng4 Kg8 37. Bb1 d4 38. Kg3 Ra3+ 39. Kh4 Ra8 40. Rf1 1-0";

const testCanvas = async (boardLayout, playerColor, customConfig) => {
  var startCanvasTime = performance.now();
  let boardBase64 = await getBoardBase64(
    boardLayout,
    playerColor,
    customConfig
  );
  writeFileSync(
    `${path.join(__dirname, "./")}/test-${playerColor}${
      customConfig ? "-custom" : ""
    }.png`,
    boardBase64.split("base64,")[1],
    "base64"
  );
  var endCanvasTime = performance.now();
  console.log(
    `Canvas: ${((endCanvasTime - startCanvasTime) / 1000).toFixed(3)} seconds`
  );
};
const testCanvasNode = async (boardLayout, playerColor, customConfig) => {
  var startCanvasTime = performance.now();
  let boardBase64 = await getBoardBase64Node(
    boardLayout,
    playerColor,
    customConfig
  );
  writeFileSync(
    `${path.join(__dirname, "./")}/test-${playerColor}${
      customConfig ? "-custom" : ""
    }.png`,
    boardBase64.split("base64,")[1],
    "base64"
  );
  var endCanvasTime = performance.now();
  console.log(
    `Canvas: ${((endCanvasTime - startCanvasTime) / 1000).toFixed(3)} seconds`
  );
};

const testBoard = (moves) => {
  console.log("==================");
  var startBoardTime = performance.now();
  const boardLayout = getBoardLayout(moves);
  var endBoardTime = performance.now();
  console.log(
    `Board: ${((endBoardTime - startBoardTime) / 1000).toFixed(3)} seconds`
  );
  return boardLayout;
};

const test = async (moves, playerColor, customConfig) => {
  const boardLayout = testBoard(moves);
  await testCanvas(boardLayout, playerColor, customConfig);
};
const testNode = async (moves, playerColor, customConfig) => {
  const boardLayout = testBoard(moves);
  await testCanvasNode(boardLayout, playerColor, customConfig);
};

const main = async () => {
  await test(testMoves1, "white");
  await test(testMoves1, "black");

  const customConfig = {
    size: 200,
    dark: "red",
    light: "blue",
    style: "cheq",
  };
  await test(testMoves1, "white", customConfig);
  await testNode(testMoves1, "white", customConfig);
  console.log("====== done ======");
};

main();
