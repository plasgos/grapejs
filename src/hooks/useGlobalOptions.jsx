import { useEffect, useState } from "react";

export const useGlobalOptions = (editor) => {
  const [globalOptions, setGlobalOptions] = useState(
    () => editor?.getModel()?.get("globalOptions") || {}
  );

  useEffect(() => {
    const handleUpdate = () => {
      // Update the local state whenever the globalOptions change in the editor
      setGlobalOptions(editor.getModel().get("globalOptions"));
    };

    // Listen to changes in the editor's globalOptions and update the React state
    editor.on("update:globalOptions", handleUpdate);

    return () => {
      // Cleanup the event listener on unmount
      editor.off("update:globalOptions", handleUpdate);
    };
  }, [editor]);

  const updateGlobalOptions = (newOptions) => {
    const editorModel = editor.getModel();
    const currentOptions = editorModel.get("globalOptions");
    editorModel.set("globalOptions", { ...currentOptions, ...newOptions });

    // Trigger a custom event to notify React components about the update
    editor.trigger("update:globalOptions");
  };

  return [globalOptions, updateGlobalOptions];
};
