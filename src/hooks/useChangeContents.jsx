import { useState } from "react";
import { produce } from "immer";
import { useEditor } from "@grapesjs/react";

export const useChangeContents = (selectedComponent) => {
  const editor = useEditor();
  const customComponent = selectedComponent?.get("customComponent");

  const [contents, setContents] = useState(customComponent?.contents);

  const handleContentChange = (id, key, value) => {
    //update local state editor

    setContents((prevContent) =>
      produce(prevContent, (draft) => {
        const targetContent = draft.find((content) => content.id === id);
        if (targetContent) {
          targetContent[key] = value;
        }
      })
    );

    //update grapejs canvas component
    selectedComponent?.set(
      "customComponent",
      produce(selectedComponent?.get("customComponent"), (draft) => {
        draft.contents.forEach((content) => {
          if (content.id === id) {
            content[key] = value;
          }
        });
      })
    );

    editor.store();
  };

  return {
    contents,
    setContents,
    handleContentChange,
  };
};
