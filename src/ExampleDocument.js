const ExampleDocument = [
  {
    type: "paragraph",
    children: [
      { text: "Hello World! This is my paragraph inside a sample document." }
    ]
  },
  {
    type: "h1",
    children: [{ text: "Heading 1" }]
  },
  {
    type: "h2",
    children: [{ text: "Heading 2" }]
  },
  {
    type: "paragraph",
    children: [
      { text: "Hello World! This is my paragraph inside a sample document." },
      { text: "Bold code text.", bold: true, code: true },
      { text: "Italic text.", italic: true },
      { text: "Bold and underlined text.", bold: true, underline: true },
      { text: "variableFoo", code: true }
    ]
  },
  {
    type: "paragraph",
    children: [
      { text: "a" },
      { text: "(", bracket: true },
      { text: "b" },
      { text: "+" },
      { text: "c" },
      { text: ")", bracket: true }
    ]
  }
];

export default ExampleDocument;
