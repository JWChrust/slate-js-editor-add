import "./styles.css";
import { useState } from "react";
import Editor from "./Editor";

const emptySlateDoc = [
  {
    type: "paragraph",
    children: [{ text: "" }]
  }
];

export default function App() {
  const [doc, setDoc] = useState(emptySlateDoc);
  // const [text, setText] = useState("");
  // const [content, setContent] = useState(null);
  // const handleText = (e) => {
  //   const text = e.target.value;
  //   const paired = pairBrackets(text);
  //   setText(text);
  //   setContent(paired);
  // };
  const handleDocChange = (document) => {
    console.log("OUTPUT", document);
    document[0].children.forEach((element) => {
      console.log(element.text);
    });
    setDoc(document);
    console.log("----------------------------------");
  };

  return (
    <div className="App">
      <h1>JWC</h1>
      <h2>Dafault REACT.js template</h2>
      <div
        style={{
          border: "solid 3px red",
          background: "lightgrey",
          color: "black"
        }}
      >
        <Editor id="editor" document={doc} onChange={handleDocChange} />
      </div>
      {/* <input onChange={(e) => handleText(e)} value={text}></input> */}
      {/* {content && (
        <p>
          {content.map((element, i) => (
            <span key={i} style={element?.style}>
              {element.content}
            </span>
          ))}
        </p>
      )} */}
    </div>
  );
}
