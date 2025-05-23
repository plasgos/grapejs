import { useEffect, useState } from "react";

export const useIsEditorDirty = (editor) => {
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (!editor) return;

    const um = editor.UndoManager;

    const checkDirty = () => {
      setIsDirty(um.hasUndo());
    };

    // Dengarkan perubahan pada komponen
    editor.on("component:add", checkDirty);
    editor.on("component:remove", checkDirty);
    editor.on("component:update", checkDirty);
    editor.on("undo", checkDirty);
    editor.on("redo", checkDirty);

    return () => {
      editor.off("component:add", checkDirty);
      editor.off("component:remove", checkDirty);
      editor.off("component:update", checkDirty);
      editor.off("undo", checkDirty);
      editor.off("redo", checkDirty);
    };
  }, [editor]);

  return isDirty;
};
