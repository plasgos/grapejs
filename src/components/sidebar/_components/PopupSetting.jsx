import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEditor } from "@grapesjs/react";
import { useEffect, useReducer } from "react";
import { FaPlus } from "react-icons/fa6";
import { Navigator } from "./SortComponent";

const PopupSetting = () => {
  const editor = useEditor();

  const handleAddPopup = () => {
    editor.addComponents({ type: "popup-wrapper" });
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

  const canvasComponentTypes = editor
    .getWrapper()
    .find("*")
    .map((comp) => comp.get("type"));

  const hasPopupComponent = canvasComponentTypes.some((type) =>
    type?.startsWith("popup-")
  );

  return (
    <>
      <div className="sticky top-0 z-10  border-b shadow  p-5  bg-orange-200  flex justify-between items-center ">
        <p className="font-semibold">Settings</p>
      </div>

      <div className="p-3 h-[86vh] overflow-y-auto">
        <div className="flex justify-between items-center p-3 bg-white rounded-lg ">
          <Label className="">Add Popup</Label>

          <Button
            variant="outline"
            onClick={() => {
              handleAddPopup();
            }}
          >
            <FaPlus />
          </Button>
        </div>

        {hasPopupComponent && (
          <div className="space-y-2 my-2">
            <Label>List Popup</Label>
            <Navigator
              editor={editor}
              components={popupComponents}
              isPopupComponent
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PopupSetting;
