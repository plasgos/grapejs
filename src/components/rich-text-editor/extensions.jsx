// extensions/FontSize.js
import { Extension } from "@tiptap/core";

export const FontSize = Extension.create({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize || null,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }

              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize: null }).run();
        },
    };
  },
});

export const InsertTextExtension = Extension.create({
  name: "insertTextExtension",

  addCommands() {
    return {
      insertCustomText:
        (text) =>
        ({ commands, editor }) => {
          const endPos = editor.state.doc.content.size;
          return commands.insertContentAt(endPos, text);
        },
    };
  },
});
