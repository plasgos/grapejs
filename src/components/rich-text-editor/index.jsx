import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./menu-bar";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import { Color } from "@tiptap/extension-color";
import { useRef } from "react";
import { useEffect } from "react";
import { FontSize, InsertTextExtension } from "./extensions";
import { Label } from "../ui/label";

export default function RichTextEditor({
  label,
  value,
  onChange,
  schemeColor,
}) {
  const timeoutRef = useRef(null);

  const editor = useEditor({
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
      Text,
      TextStyle,
      FontFamily,
      FontSize,
      Color,
      InsertTextExtension,
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[156px] max-h-[250px] overflow-y-auto border border-slate-300 rounded-md bg-slate-50 py-2 px-3 leading-normal focus:border-indigo-500  focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        onChange(editor.getHTML());
      }, 500); // 500ms debounce
    },
  });

  useEffect(() => {
    return () => {
      // Bersihkan timeout saat unmount
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!editor) return;

    const scaleDownFontSizes = () => {
      const editorEl = document.querySelector(".custom-tip-tap-editor");
      if (!editorEl) return;

      const nodes = editorEl.querySelectorAll("[style*='font-size']");

      nodes.forEach((node) => {
        const fontSize = node.style.fontSize;

        const match = fontSize.match(/^(\d+)px$/);
        if (match) {
          const size = parseInt(match[1], 10);
          if (size > 24) {
            node.style.fontSize = `${size * 0.5}px`; // atau ganti jadi '16px'
          }
        }
      });
    };

    editor.on("update", scaleDownFontSizes);
    editor.on("create", scaleDownFontSizes);

    return () => {
      editor.off("update", scaleDownFontSizes);
      editor.off("create", scaleDownFontSizes);
    };
  }, [editor]);

  return (
    <div className="">
      {label && <Label className="">{label}</Label>}
      <div className="relative mt-2">
        <MenuBar
          editor={editor}
          onChange={onChange}
          schemeColor={schemeColor}
        />

        <div className="custom-tip-tap-editor">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
