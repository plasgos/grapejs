import { useRichTextEditor } from "@/hooks/useRichTextEditor";
import { EditorContent } from "@tiptap/react";

import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRef, useState } from "react";
import MenuBarTextEditor from "./menu-bar";

const TextEditor = ({
  selectedComponent,
  editor,
  value,
  onChange,
  keyColor,
  colorValue,
}) => {
  const { isPreviewMode } = useSelector((state) => state.landingPage);

  const editorRef = useRef(null);

  const [open, setOpen] = useState(false);
  const { editorTiptap } = useRichTextEditor({
    content: value,
    onChange,
    mainEditor: editor,
    isPreviewMode,
    setOpen,
  });

  const useSchemeColor = !!colorValue && colorValue !== "__INLINE__";

  const handleOpenChange = (value) => {
    setOpen(value);
  };

  return (
    <div className="relative" ref={editorRef}>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger
          style={{
            top: -50,
          }}
          className="invisible absolute"
        >
          x
        </PopoverTrigger>
        <PopoverContent side="left" className="w-max p-2.5 ring-1">
          <MenuBarTextEditor
            onChange={onChange}
            editor={editorTiptap}
            selectedComponent={selectedComponent}
            schemeColor={keyColor}
          />
        </PopoverContent>
      </Popover>

      <EditorContent
        onClick={() => {
          if (editor) {
            editorTiptap.commands.focus();
          }
        }}
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
