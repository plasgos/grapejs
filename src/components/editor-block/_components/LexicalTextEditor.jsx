import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

import { FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();

  const formatText = (command) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, command);
  };

  const formatElement = (command) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, command);
  };

  return (
    <div className="toolbar">
      <button onClick={() => formatText("bold")}>Bold</button>
      <button onClick={() => formatText("italic")}>Italic</button>
      <button onClick={() => formatText("underline")}>Underline</button>
      <button onClick={() => formatText("strikethrough")}>Strikethrough</button>
      <button onClick={() => formatElement("left")}>Left</button>
      <button onClick={() => formatElement("center")}>Center</button>
      <button onClick={() => formatElement("right")}>Right</button>
    </div>
  );
};

const theme = {
  paragraph: "editor-paragraph",
  heading: {
    h1: "editor-heading-h1",
    h2: "editor-heading-h2",
    h3: "editor-heading-h3",
  },
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    underline: "editor-text-underline",
    strikethrough: "editor-text-strikethrough",
  },
};

const initialConfig = {
  namespace: "MyEditor",
  theme,
  onError: (error) => {
    console.error("Editor Error", error);
  },
};

const LexicalTextEditor = ({ value, onChange }) => {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Toolbar />
      <div className="w-full bg-white  rounded-lg shadow">
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<div className="">Ketik sesuatu...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin
          onChange={(editorState) => {
            editorState.read(() => {
              const htmlString = editorState.toJSON();
              onChange(htmlString);
            });
          }}
        />
      </div>
    </LexicalComposer>
  );
};

export default LexicalTextEditor;
