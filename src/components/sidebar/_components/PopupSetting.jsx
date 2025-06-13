import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useGlobalOptions } from "@/hooks/useGlobalOptions";
import { useEditor } from "@grapesjs/react";
import { useEffect } from "react";
import { Navigator } from "./SortComponent";
import { useReducer } from "react";

const PopupSetting = () => {
  const editor = useEditor();
  const [globalOptions, updateGlobalOptions] = useGlobalOptions(editor);
  const { isActivePopup } = globalOptions || {};

  const handleAddPopup = () => {
    editor.addComponents({ type: "modal-popup" });
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

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const update = () => forceUpdate();
    editor.on("component:add", update);
    editor.on("component:remove", update);
    editor.on("component:clone", update);
    editor.on("component:update", update);

    return () => {
      editor.off("component:add", update);
      editor.off("component:remove", update);
      editor.off("component:clone", update);
      editor.off("component:update", update);
    };
  }, [editor]);

  const components = editor.getComponents()?.models;

  const popupComponents = components.filter((comp) =>
    comp?.get("category")?.toLowerCase().includes("popup")
  );
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

        <div className="p-3 h-[86vh] overflow-y-auto">
          <Navigator
            editor={editor}
            components={popupComponents}
            isPopupComponent
          />
        </div>
      </div>
    </>
  );
};

export default PopupSetting;
