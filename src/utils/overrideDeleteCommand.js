export const overrideDeleteCommand = (editor) => {
  // Override fungsi delete default
  editor.Commands.add("core:component-delete", {
    run(editor) {
      const editorModel = editor.getModel();

      const globalOptions = editorModel.get("globalOptions");

      const selected = editor.getSelected();
      if (selected) {
        if (selected.get("type") === "modal-popup") {
          //   console.log("REMOVE POPUP");

          editorModel.set("globalOptions", {
            ...globalOptions,
            popup: globalOptions.popup.filter(
              (opt) => opt.id !== selected.get("customComponent").popupId
            ),
          });

          selected.remove();
        } else {
          selected.remove();
        }

        editor.select(editor.getWrapper());
      }
    },
  });
};
