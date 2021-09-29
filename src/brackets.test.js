// import { checkBrackets } from "./App";

// // // describe("Testy nawiasów", () => {

// // // });

// test("Test 1: ()", () => {
//   expect(checkBrackets("()")).toEqual([{ type: "()", open: 0, close: 1 }]);
// });
// //            0 1 2   4 5   7 8 9   1 2
// test("Test 2: [ ( ( a ) [ b ] ) ( c ) ]", () => {
//   expect(checkBrackets("[((a)[b])(c)]")).toEqual([
//     { type: "()", open: 2, close: 4 },
//     { type: "[]", open: 5, close: 7 },
//     { type: "()", open: 1, close: 8 },
//     { type: "()", open: 9, close: 11 },
//     { type: "[]", open: 0, close: 12 }
//   ]);
// });

// test("Test 3: [{})([]]", () => {
//   expect(checkBrackets("[{})([]]")).toEqual([
//     { type: "{}", open: 1, close: 2 },
//     { type: "[]", open: 5, close: 6 },
//     { type: "[]", open: 0, close: 7 },
//     { type: "NN", char: ")", index: 3 },
//     { type: "NN", char: "(", index: 4 }
//   ]);
// });
