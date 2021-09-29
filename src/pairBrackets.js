/**
 * Function that converts input to SlateJS text document nodes that mark brackets with colors
 * @param {string} text plaintext representing document content without any markings
 * @returns {arrayOfObjects} Children nodes of SlateJS document
 */

export default function pairBrackets(text) {
  const pairs = checkBrackets(text);
  const nodes = renderBrackets(text, pairs);
  return nodes;
}

const colorsIN = [
  "hsl(225, 100%, 50%)",
  "hsl(160, 100%, 30%)",
  "hsl(210, 100%, 50%)",
  "hsl(110, 100%, 35%)",
  "hsl(195, 100%, 50%)",
  "hsl(80, 100%, 50%)"
];
const colorsOUT = ["#00a5ff", "#1389e6", "#65c7fc"];

function checkBrackets(text) {
  const DATA = [
    { type: "()", open: "(", close: ")" },
    { type: "[]", open: "[", close: "]" },
    { type: "{}", open: "{", close: "}" }
  ];
  const bracketsChars = ["(", ")", "[", "]", "{", "}"];
  const fulltext = text.split("");
  let brackets = [];
  let indexes = [];
  let pairs = [];
  for (let j = 0; j < fulltext.length; j++) {
    for (let i = 0; i < bracketsChars.length; i++) {
      if (bracketsChars[i] === fulltext[j]) {
        brackets.push(fulltext[j]);
        indexes.push(j);
      } else {
      }
    }
  }
  // (a+b)*(a((as))) TODO test those and figure out
  let v = [...brackets]; // aktualny wektor nawiasów
  let w = [...indexes]; // aktualny wektor indeksów
  for (let j = 0; j < brackets.length / 2; j++) {
    // tyle razy ile jest par
    loop2: for (let i = 0; i < w.length - 1; i++) {
      // sprawdzam aktualny wektor nawiasów w poszukiwaniu pierwszej pary
      for (let k = 0; k < DATA.length; k++) {
        const e = DATA[k];
        const comparison = v[i] === e.open && v[i + 1] === e.close;
        // kiedy znajdę pierwszą parę dodaję ją do mojej kolekcji
        if (comparison) {
          pairs.push({
            type: e.type,
            open: w[i],
            close: w[i + 1],
            location: "in"
          });
          // i redukuję wektor (wektor indexów też)
          w.splice(i, 2);
          v.splice(i, 2);
          break loop2;
        }
      }
    }
  }
  if (w.length !== 0) {
    // GRABBING FROM OUTSIDE
    while (w.length !== 0) {
      for (let k = 0; k < DATA.length; k++) {
        const e = DATA[k];
        const comparison = v[0] === e.open && v[v.length - 1] === e.close;
        if (comparison) {
          pairs.push({
            type: e.type,
            open: w[0],
            close: w[w.length - 1],
            location: "out"
          });
          w.splice(0, 1);
          w.splice(w.length - 1, 1);
          v.splice(0, 1);
          v.splice(v.length - 1, 1);
          break;
        }
      }
      break;
    }
    if (v.length !== 0) {
      v.forEach((value, index) =>
        pairs.push({
          type: "NN",
          char: value,
          index: w[index]
        })
      );
    }
  }
  return pairs;
}
function renderBrackets(text, pairs) {
  const fulltext = text.split("");
  let newText = [...fulltext];
  newText.forEach((el, i) => {
    newText[i] = { text: el };
  });
  pairs.forEach((element, i) => {
    if (element.type === "NN") {
      newText[element.index] = {
        bracket: true,
        color: "red",
        ...newText[element.index]
      };
    } else if (element.location === "in") {
      newText[element.open] = {
        color: colorsIN[i % colorsIN.length],
        bracket: true,
        text: fulltext[element.open]
      };
      newText[element.close] = {
        color: colorsIN[i % colorsIN.length],
        bracket: true,
        text: fulltext[element.close]
      };
    } else if (element.location === "out") {
      newText[element.open] = {
        color: colorsOUT[i % colorsOUT.length],
        bracket: true,
        text: fulltext[element.open]
      };
      newText[element.close] = {
        color: colorsOUT[i % colorsOUT.length],
        bracket: true,
        text: fulltext[element.close]
      };
    }
  });
  const nodal = reconnect(newText);
  return nodal;
}

// reconnects nodes of single characters into nodes consisting of
// chunks of text with the same styling parameters
function reconnect(arrayOfObjects) {
  let reconnected = [];
  let n = 0;
  arrayOfObjects.forEach((element, i) => {
    if (
      i > 0 &&
      element.bracket === arrayOfObjects[i - 1].bracket &&
      i > 0 &&
      element.color === arrayOfObjects[i - 1].color
    ) {
      reconnected[n].text = reconnected[n].text + element.text;
    } else if (i === 0) {
      reconnected.push(element);
    } else {
      reconnected.push(element);
      n++;
    }
  });
  return reconnected;
}
