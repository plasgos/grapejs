import { useState } from "react";
import { produce } from "immer";
import { useEditor } from "@grapesjs/react";

export const useOptionalEditor = () => {
  try {
    return useEditor();
  } catch (e) {
    return null;
  }
};

export const useChangeComponentValue = (selectedComponent, editorInstance) => {
  const contextEditor = useOptionalEditor();

  const editor = editorInstance || contextEditor;

  // const editor = useEditor();

  const customComponent = selectedComponent?.get("customComponent");
  const [currentComponent, setCurrentComponent] = useState(customComponent);

  // const updateNestedValue = (obj, path, value) => {
  //   return produce(obj, (draft) => {
  //     const keys = path.split(".");

  //     if (
  //       (keys[0] === "contents" || keys[0] === "buttons") &&
  //       keys.length > 2
  //     ) {
  //       const pathSource = keys[0] === "contents" ? "contents" : "buttons";
  //       const contentId = keys[1];
  //       const targetContent = draft[pathSource]?.find(
  //         (c) => c.id === contentId
  //       );

  //       if (targetContent) {
  //         let target = targetContent;
  //         keys.slice(2).forEach((key, index, arr) => {
  //           if (index === arr.length - 1) {
  //             target[key] = value; // Set nilai terakhir
  //           } else {
  //             target = target[key]; // Turun ke dalam object
  //           }
  //         });
  //       }
  //     } else {
  //       let target = draft;
  //       keys.forEach((key, index, arr) => {
  //         if (index === arr.length - 1) {
  //           target[key] = value;
  //         } else {
  //           target = target[key];
  //         }
  //       });
  //     }
  //   });
  // };

  const updateNestedValue = (obj, path, value) => {
    return produce(obj || {}, (draft) => {
      const keys = path.split(".");

      if (
        (keys[0] === "contents" || keys[0] === "buttons") &&
        keys.length > 2
      ) {
        const pathSource = keys[0];
        const contentId = keys[1];
        const targetContent = draft[pathSource]?.find(
          (c) => c.id === contentId
        );

        if (targetContent) {
          let target = targetContent;
          keys.slice(2).forEach((key, index, arr) => {
            if (!(key in target)) {
              target[key] = {};
            }
            if (index === arr.length - 1) {
              target[key] = value;
            } else {
              target = target[key];
            }
          });
        }
      } else {
        let target = draft;
        keys.forEach((key, index, arr) => {
          if (!(key in target)) {
            target[key] = {};
          }

          if (index === arr.length - 1) {
            target[key] = value;
          } else {
            target = target[key];
          }
        });
      }
    });
  };

  const handleComponentChange = (path, value) => {
    if (editor) {
      setCurrentComponent((prev) => updateNestedValue(prev, path, value));

      selectedComponent?.set(
        "customComponent",
        updateNestedValue(
          selectedComponent?.get("customComponent"),
          path,
          value
        )
      );

      editor.store();
    }
  };

  if (!editor) return;

  return {
    currentComponent,
    setCurrentComponent,
    handleComponentChange,
  };
};
