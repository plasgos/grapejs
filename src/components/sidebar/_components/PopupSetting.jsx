import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useGlobalOptions } from "@/hooks/useGlobalOptions";
import { useEditor } from "@grapesjs/react";
import { useEffect } from "react";

const PopupSetting = () => {
  const editor = useEditor();
  const [globalOptions, updateGlobalOptions] = useGlobalOptions(editor);
  const { isActivePopup } = globalOptions || {};

  const handleAddPopup = () => {
    editor.addComponents({ type: "modal-popup" });

    const selected = editor.select("modal-popup");
    console.log("🚀 ~ handleAddPopup ~ selected:", selected);

    if (selected) {
      const currentChildren = selected.components();
      console.log("🚀 ~ handleAddPopup ~ currentChildren:", currentChildren);

      const newChild = {
        type: "text",
        content: "Child baru dengan set",
      };

      const newChildren = [...currentChildren.models, newChild];

      selected.set("components", newChildren);
    }
  };

  const handleRemovePopup = () => {
    const allComponents = editor.getComponents(); // root-level
    const modalComponent = allComponents.find(
      (comp) => comp.get("type") === "modal-popup"
    );

    if (modalComponent) {
      modalComponent.remove();
    }
  };

  useEffect(() => {
    if (editor) {
      editor.on("component:add", (component) => {
        const type = component.get("type");

        if (type === "modal-popup") {
          editor.select(component);
        }
      });
    }
  }, [editor]);

  //   useEffect(() => {
  //     if (editor) {
  //       const wrapper = editor.getWrapper();

  //       if (isActivePopup) {
  //         if (wrapper) {
  //           wrapper.set("droppable", false);
  //         }
  //       } else {
  //         if (wrapper) {
  //           wrapper.set("droppable", true);
  //         }
  //       }
  //     }
  //   }, [editor, isActivePopup]);

  return (
    <>
      <div className="sticky top-0 z-10  border-b shadow  p-4 bg-orange-200  flex justify-between items-center ">
        <p className="font-semibold">Settings</p>
      </div>

      <div className="p-4 h-[86vh] overflow-y-auto">
        <div className="flex flex-col gap-y-3 p-3 bg-white rounded-lg">
          <div className="flex justify-between items-center m-3">
            <Label className="">Add Popup</Label>
            <Switch
              checked={isActivePopup}
              onCheckedChange={(checked) => {
                updateGlobalOptions({ isActivePopup: checked });

                if (editor) {
                  if (checked) {
                    handleAddPopup(editor);
                  } else {
                    handleRemovePopup(editor);
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupSetting;
