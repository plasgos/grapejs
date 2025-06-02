export const overrideDeleteCommand = (editor) => {
  editor.Commands.add("core:component-delete", {
    run(editor) {
      const selected = editor.getSelected();
      const wrapper = editor.getWrapper();

      if (selected && selected === wrapper) {
        return;
      }

      const editorModel = editor.getModel();
      const globalOptions = editorModel.get("globalOptions");

      if (selected) {
        const parent = selected.parent();
        const siblings = parent?.components();
        const index = siblings?.indexOf(selected);

        // Jika type-nya modal-popup, update globalOptions
        if (selected.get("type") === "modal-popup") {
          editorModel.set("globalOptions", {
            ...globalOptions,
            popup: globalOptions.popup.filter(
              (opt) => opt.id !== selected.get("customComponent")?.popupId
            ),
          });
        }

        // Remove the selected component
        selected.remove();

        // Pilih komponen sebelumnya jika ada, jika tidak pilih wrapper
        if (siblings && index > 0) {
          const previousComponent = siblings.at(index - 1);
          editor.select(previousComponent);
        } else {
          editor.select(wrapper);
        }
      }
    },
  });
};
