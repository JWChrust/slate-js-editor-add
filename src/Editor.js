import { Editable, Slate, withReact } from "slate-react";

import { createEditor, Node } from "slate";
import { useMemo, useCallback, useState } from "react";
import { useEditorConfig } from "./customEditorHooks";
import pairBrackets from "./pairBrackets";
const serialize = (nodes) => {
  return nodes.map((n) => Node.string(n)).join("\n");
};

export default function Editor({ document, onChange }) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const { renderElement, renderLeaf } = useEditorConfig(editor);
  const [docNodesNr, setDocNodesNr] = useState(1);

  const onChangeHandler = useCallback(
    (document) => {
      let newDoc = null;
      let nodes = null;
      let oldSelection = editor.selection;
      console.log("----------------------------------");
      console.log("DOC", document);
      if (document[0].children[0].text === "") {
        nodes = [{ text: "" }];
      } else {
        let plain = serialize(document);
        nodes = pairBrackets(plain);
      }
      setDocNodesNr(nodes.length);
      newDoc = [
        {
          type: "paragraph",
          children: nodes
        }
      ];
      console.log(
        "OLD_S",
        editor.selection?.focus.path,
        editor.selection?.focus.offset,
        editor.selection?.anchor.path,
        editor.selection?.anchor.offset,
        "   |   DOC_LEN",
        nodes.length,
        "OLD_NODES_NR",
        docNodesNr
      );
      onChange(newDoc);
      // When formatting document generates new node & the cursor gets lost
      // No such problem when deleting nodes
      if (nodes.length > docNodesNr) {
        const path = [
          0,
          Math.min(oldSelection.focus.path[1], oldSelection.anchor.path[1]) + 1
        ];
        const newPoint = { path: path, offset: 1 };
        editor.selection = { anchor: newPoint, focus: newPoint };
        console.log(
          "NEW_S, (only when node is being added)",
          editor.selection?.focus.path,
          editor.selection?.focus.offset,
          editor.selection?.anchor.path,
          editor.selection?.anchor.offset
        );
      }
    },
    [onChange, docNodesNr, editor]
  );

  return (
    <Slate editor={editor} value={document} onChange={onChangeHandler}>
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
    </Slate>
  );
}
