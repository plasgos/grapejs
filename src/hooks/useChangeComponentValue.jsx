import { useState } from "react";
import { produce } from "immer";
import { useEditor } from "@grapesjs/react";

export const useChangeComponentValue = (selectedComponent) => {
  const editor = useEditor();
  const customComponent = selectedComponent?.get("customComponent");

  const [currentComponent, setCurrentComponent] = useState(customComponent);

  // const updateNestedValue = (obj, path, value) => {
  //   return produce(obj, (draft) => {
  //     const keys = path.split(".");

  //     if (keys[0] === "contents" && keys.length > 2) {
  //       const contentKey = keys[1];

  //       // Cek apakah key adalah angka (menggunakan indeks langsung)
  //       const contentIndex = Number(contentKey);
  //       let targetContent;

  //       if (!isNaN(contentIndex)) {
  //         // Jika key adalah angka, akses langsung berdasarkan index
  //         targetContent = draft.contents[contentIndex];
  //       } else {
  //         // Jika key bukan angka, gunakan pencarian berdasarkan ID
  //         targetContent = draft.contents.find((c) => c.id === contentKey);
  //       }

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
    return produce(obj, (draft) => {
      const keys = path.split(".");

      if (keys[0] === "contents" && keys.length > 2) {
        const contentId = keys[1];
        const targetContent = draft.contents.find((c) => c.id === contentId);

        if (targetContent) {
          let target = targetContent;
          keys.slice(2).forEach((key, index, arr) => {
            if (index === arr.length - 1) {
              target[key] = value; // Set nilai terakhir
            } else {
              target = target[key]; // Turun ke dalam object
            }
          });
        }
      } else {
        let target = draft;
        keys.forEach((key, index, arr) => {
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
    setCurrentComponent((prev) => updateNestedValue(prev, path, value));

    selectedComponent?.set(
      "customComponent",
      updateNestedValue(selectedComponent?.get("customComponent"), path, value)
    );

    editor.store();
  };

  return {
    currentComponent,
    setCurrentComponent,
    handleComponentChange,
  };
};
