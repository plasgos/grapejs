export const overrideCopyCommand = (editor) => {
  const originalCopy = editor.Commands.get("core:copy");

  editor.Commands.add("core:copy", {
    run(editor) {
      const selected = editor.getSelected();
      if (!selected) return;

      originalCopy.run(editor); // Jalankan copy bawaan

      // Setelah copy, pilih wrapper
      editor.select(editor.getWrapper());
    },
  });
};
