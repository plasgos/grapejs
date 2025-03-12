import { useState } from "react";
import { produce } from "immer";

export const useChangeContents = (selectedComponent) => {
  const customComponent = selectedComponent?.get("customComponent");

  const [contents, setContents] = useState(customComponent?.contents);

  const handleContentChange = (id, key, value) => {
    //update local state editor
    setContents((prevContent) =>
      prevContent.map((content) =>
        content.id === id
          ? {
              ...content,
              [key]: value,
            }
          : content
      )
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
  };
  return {
    contents,
    setContents,
    handleContentChange,
  };
};
