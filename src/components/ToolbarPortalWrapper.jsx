import { useEditor } from "@grapesjs/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ToolbarOptions from "./ToolbarOptions";

const ToolbarPortalWrapper = () => {
  const editor = useEditor();
  const [toolbarEl, setToolbarEl] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);

  useEffect(() => {
    const el = document.querySelector(".gjs-toolbar");
    setToolbarEl(el);

    if (!editor) return;

    const updateToolbar = () => {
      const selected = editor.getSelected();
      if (!selected || selected === editor.getWrapper()) {
        setSelectedComponent(null);
      } else {
        setSelectedComponent(selected);
      }
    };

    editor.on("component:selected", updateToolbar);
    editor.on("component:deselected", updateToolbar);
    editor.on("component:remove", updateToolbar);

    return () => {
      editor.off("component:selected", updateToolbar);
      editor.off("component:deselected", updateToolbar);
      editor.off("component:remove", updateToolbar);
    };
  }, [editor]);

  if (!toolbarEl || !selectedComponent) return null;

  return createPortal(<ToolbarOptions editor={editor} />, toolbarEl);
};

export default ToolbarPortalWrapper;
