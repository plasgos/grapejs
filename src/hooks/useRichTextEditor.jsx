import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

import {
  FontSize,
  InsertTextExtension,
} from "@/components/rich-text-editor/extensions";

export function useRichTextEditor({
  content = "",
  onChange,
  mainEditor,
  isPreviewMode,
  setOpen,
}) {
  const editorTiptap = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      TextStyle,
      FontFamily,
      FontSize,
      Color,
      InsertTextExtension,
    ],
    content,
    editorProps: {
      attributes: {
        class: `p-3 border border-transparent focus:border-indigo-500  focus:outline-none ${
          !isPreviewMode && mainEditor && "hover:border-indigo-300 "
        }`,
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
    onFocus: () => {
      if (mainEditor) {
        setOpen(true);
      }
    },
    onSelectionUpdate: () => {
      if (mainEditor) {
        setOpen(true);
      }
    },
    onBlur: () => {
      const iframe = document.querySelector(".gjs-frame");
      const iframeDocument =
        iframe.contentDocument || iframe.contentWindow.document;
      iframeDocument.getSelection().empty();
    },
    autofocus: "all",
  });

  useEffect(() => {
    if (!editorTiptap) return;

    const canEdit = mainEditor !== null && isPreviewMode === false;
    editorTiptap.setEditable(canEdit);
  }, [editorTiptap, mainEditor, isPreviewMode]);

  return { editorTiptap };
}
