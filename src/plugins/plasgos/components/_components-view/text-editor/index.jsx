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

const TextEditor = ({
  selectedComponent,
  editor,
  value,
  onChange,
  keyColor,
  colorValue,
}) => {
  const { isPreviewMode } = useSelector((state) => state.landingPage);

  const [open, setOpen] = useState(false);
  const { editorTiptap } = useRichTextEditor({
    content: value,
    onChange,
    mainEditor: editor,
    isPreviewMode,
  });

  const useSchemeColor = !!colorValue && colorValue !== "__INLINE__";

  return (
    <div className="relative">
      <Popover key={selectedComponent?.cid} open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          style={{
            top: -45,
          }}
          className="invisible absolute"
        >
          x
        </PopoverTrigger>
        <PopoverContent side="right" className="w-max p-2.5 ring-1">
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
          if (!isPreviewMode) {
            setOpen(true);
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
