import { useEffect, useState } from "react";

export function useSelectedComponent(editor) {
  const [selectedComponent, setSelectedComponent] = useState(
    () => editor?.getSelected() ?? null
  );

  useEffect(() => {
    if (!editor) return;

    const handleSelect = (component) => {
      const type = component.get("type");
      if (type !== "wrapper") {
        setSelectedComponent(component);
      } else {
        setSelectedComponent(null);
      }
    };

    const handleDeselect = () => {
      setSelectedComponent(null);
    };

    const handleRemove = () => {
      setTimeout(() => {
        setSelectedComponent(null);
      }, 100);
    };
    editor.on("component:add", handleSelect);
    editor.on("component:selected", handleSelect);
    editor.on("component:deselected", handleDeselect);
    editor.on("component:remove", handleRemove);

    return () => {
      editor.off("component:selected", handleSelect);
      editor.off("component:deselected", handleDeselect);
      editor.off("component:remove", handleRemove);
    };
  }, [editor]);

  if (!editor) return;

  return selectedComponent;
}
