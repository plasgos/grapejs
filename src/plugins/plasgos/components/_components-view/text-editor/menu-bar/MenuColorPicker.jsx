import { useEffect } from "react";
import ColorPicker from "../../../_components-editor/ColorPicker";
import { produce } from "immer";

const MenuColorPicker = ({
  editor,
  selectedComponent,
  onChange,
  schemeColor,
}) => {
  const currentComponent = selectedComponent?.get("customComponent");

  function resetKeyInObject(obj, targetKey) {
    if (Array.isArray(obj)) {
      obj.forEach((item) => resetKeyInObject(item, targetKey));
      return;
    }

    if (typeof obj !== "object" || obj === null) return;

    for (const key in obj) {
      if (key === targetKey) {
        obj[key] = "__INLINE__";
      } else {
        const val = obj[key];
        if (typeof val === "object" && val !== null) {
          resetKeyInObject(val, targetKey);
        }
      }
    }
  }

  function findValueByKey(obj, targetKey) {
    if (Array.isArray(obj)) {
      for (const item of obj) {
        const result = findValueByKey(item, targetKey);
        if (result !== undefined) return result;
      }
    } else if (typeof obj === "object" && obj !== null) {
      for (const key in obj) {
        if (key === targetKey) {
          return obj[key];
        }
        const result = findValueByKey(obj[key], targetKey);
        if (result !== undefined) return result;
      }
    }
    return undefined;
  }

  const valueSchemeColor = findValueByKey(currentComponent, schemeColor);

  useEffect(() => {
    if (valueSchemeColor && editor && valueSchemeColor !== "__INLINE__") {
      console.log("RUNNNN");
      const docSize = editor.state.doc.content.size;

      // Seleksi seluruh teks
      editor.commands.setTextSelection({ from: 0, to: docSize });

      // Terapkan warna ke semua teks dari schemeColor (jika bukan override)
      editor.commands.setColor(valueSchemeColor);
    }
  }, [editor, valueSchemeColor]);

  return (
    <ColorPicker
      value={editor.getAttributes("textStyle")?.color}
      onChange={(color) => {
        editor.chain().focus().setColor(color).run();

        const updatedHtml = editor.getHTML();

        const updated = produce(currentComponent, (draft) => {
          resetKeyInObject(draft, schemeColor);
        });

        selectedComponent.set("customComponent", updated);
        onChange(updatedHtml);
      }}
    />
  );
};

export default MenuColorPicker;
