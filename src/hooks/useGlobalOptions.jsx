import { useEditor } from "@grapesjs/react";

export const useGlobalOptions = () => {
  const editor = useEditor();
  const editorModel = editor.getModel();
  // const globalOptions = editorModel.get("globalOptions");

  return editorModel.get("globalOptions") || {};
};
