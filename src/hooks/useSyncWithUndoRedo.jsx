import { setEditComponent } from "@/redux/modules/landing-page/landingPageSlice";
import { useEditor } from "@grapesjs/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useSyncWithUndoRedo = (setCurrentComponent) => {
  const editor = useEditor();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!editor) return;

    const updateEditorState = () => {
      const selected = editor.getSelected();
      if (selected) {
        const updatedData = selected.get("customComponent");
        setCurrentComponent(updatedData || []);
      }
    };

    const checkUndoHistory = () => {
      const undoManager = editor.UndoManager;
      if (undoManager && undoManager.hasUndo() === false) {
        dispatch(setEditComponent(false));
      }
    };

    editor.on("undo redo", updateEditorState);
    editor.on("undo", checkUndoHistory);

    return () => {
      editor.off("undo redo", updateEditorState);
      editor.off("undo", checkUndoHistory);
    };
  }, [dispatch, editor, setCurrentComponent]);
};

export default useSyncWithUndoRedo;
