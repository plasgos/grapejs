import { useRichTextEditor } from "@/hooks/useRichTextEditor";
import { EditorContent } from "@tiptap/react";
import { produce } from "immer";
import MenuBarTiptap from "./MenuBarTiptap";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

const ViewTextElement = ({ section, editor, viewId }) => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const customComponent = selectedComponent?.get("customComponent");
  const onChange = (value) => {
    if (!customComponent) return;

    const updated = (component) => {
      return produce(component, (draft) => {
        draft.text = value;
      });
    };
    selectedComponent.set("customComponent", updated(customComponent));
  };

  const editorRichText = useRichTextEditor({
    content: section?.text,
    onChange,
  });

  useEffect(() => {
    if (!editor) return;

    const handleSelect = (component) => {
      const type = component.get("type");

      if (type !== "wrapper" && type === "text-element") {
        setSelectedComponent(component);
      } else {
        setSelectedComponent(null);
      }
    };

    const handleDeselect = () => {
      setSelectedComponent(null);
    };

    editor.on("component:selected", handleSelect);
    editor.on("component:deselected", handleDeselect);
    editor.on("component:remove", () => {
      setTimeout(() => {
        setSelectedComponent(null);
      }, 1000); // bisa coba 50–100ms jika perlu
    });

    return () => {
      editor.off("component:selected", handleSelect);
      editor.off("component:deselected", handleDeselect);
      editor.off("component:remove", () => {
        setTimeout(() => {
          setSelectedComponent(null);
        }, 1000); // bisa coba 50–100ms jika perlu
      });
    };
  }, [editor]);

  function isEmptyHtml(content) {
    return !content || /^<p>(<br\s*\/?>)?<\/p>$/.test(content.trim());
  }

  const isOpenToolbar =
    selectedComponent && selectedComponent.get("type") === "text-element";

  return (
    <>
      <Popover open={selectedComponent?.cid === viewId && isOpenToolbar}>
        <PopoverTrigger className="opacity-0 pointer-events-none">
          -
        </PopoverTrigger>
        <PopoverContent className="p-1.5 relative -top-10  w-max" side="right">
          <div className="bg-white shadow-2xl rounded-xl">
            <MenuBarTiptap editor={editorRichText} />
          </div>
        </PopoverContent>
      </Popover>

      <div className="max-w-full break-all">
        <EditorContent editor={editorRichText} />
      </div>
    </>
  );
};

export default ViewTextElement;
