import { useRichTextEditor } from "@/hooks/useRichTextEditor";
import { EditorContent } from "@tiptap/react";

import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import MenuBarTextEditor from "./menu-bar";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setIsEditTextEditor } from "@/redux/modules/landing-page/landingPageSlice";
import { useRef } from "react";

const TextEditor = ({
  selectedComponent,
  editor,
  value,
  onChange,
  keyColor,
  colorValue,
}) => {
  const { isPreviewMode, isEditTextEditor } = useSelector(
    (state) => state.landingPage
  );

  const editorRef = useRef(null);
  const popoverRef = useRef(null);
  const isTypingRef = useRef(false);
  const [isFocused, setIsFocused] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  console.log("🚀 ~ open:", open);
  const { editorTiptap } = useRichTextEditor({
    content: value,
    onChange,
    mainEditor: editor,
    isPreviewMode,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (editor) {
      if (!editorTiptap) return;

      const onUpdate = () => {
        isTypingRef.current = true;
        setOpen(true);

        // Reset typing flag setelah delay
        setTimeout(() => {
          isTypingRef.current = false;
        }, 2000);
      };

      editorTiptap.on("transaction", onUpdate);
      return () => {
        editorTiptap.off("transaction", onUpdate);
      };
    }
  }, [editor, editorTiptap]);

  useEffect(() => {
    if (!editor) {
      setTimeout(() => {
        setOpen(false);
      }, 0);
    }
  }, [editor]);

  const useSchemeColor = !!colorValue && colorValue !== "__INLINE__";

  const handleOpenChange = (value) => {
    if (!value && isTypingRef.current) {
      return; // Jangan tutup jika sedang mengetik
    }
    setOpen(value);
  };

  return (
    <div className="relative" ref={editorRef}>
      <Popover
        key={selectedComponent?.cid}
        open={open}
        onOpenChange={handleOpenChange}
      >
        <PopoverTrigger
          style={{
            top: -45,
          }}
          className="invisible absolute"
        >
          x
        </PopoverTrigger>
        <PopoverContent
          onInteractOutside={(e) => {
            // Cegah penutupan jika:
            // 1. Klik di editor
            // 2. Sedang mengetik
            if (editorRef.current?.contains(e.target) || isTypingRef.current) {
              e.preventDefault();
            }
          }}
          side="right"
          className="w-max p-2.5 ring-1"
        >
          <MenuBarTextEditor
            onChange={onChange}
            editor={editorTiptap}
            selectedComponent={selectedComponent}
            schemeColor={keyColor}
            setOpen={setOpen}
          />
        </PopoverContent>
      </Popover>

      <EditorContent
        onClick={() => editorTiptap.commands.focus()}
        editor={editorTiptap}
        className={cn("rich-text break-all w-full", {
          "with-scheme-color": useSchemeColor,
        })}
        style={{
          ...(useSchemeColor ? { "--richTextColor": colorValue } : {}),
        }}
      />
    </div>
  );
};

export default TextEditor;
