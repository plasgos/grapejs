import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { setEditComponent } from "@/redux/modules/landing-page/landingPageSlice";
import { useMemo, useState } from "react";
import { BsImageAlt } from "react-icons/bs";
import { HiAdjustments } from "react-icons/hi";
import { MdClose, MdDeblur } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import ComponentStyleEditor from "./ComponentStyleEditor";

import { Button } from "@/components/ui/button";
import { useEditor } from "@grapesjs/react";
import { useEffect } from "react";

const EditorSheet = () => {
  const editor = useEditor();
  const { editComponent } = useSelector((state) => state.landingPage);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("content");

  const component = editor?.getSelected()?.get("customComponent");

  const isEditableTransition = !!(component && "animation" in component);
  const isEditableStyles = !!(component && "wrapperStyle" in component);
  const isEditableBackground = !!(component && "background" in component);

  const tabs = useMemo(() => {
    return [
      {
        label: "Content",
        value: "content",
        icon: <TbEdit size={20} />,
        isEditable: true,
      },
      {
        label: "Styles",
        value: "styles",
        icon: <HiAdjustments size={20} />,
        isEditable: isEditableStyles,
      },
      {
        label: "Transition",
        value: "transition",
        icon: <MdDeblur size={20} />,
        isEditable: isEditableTransition,
      },
      {
        label: "Background",
        value: "background",
        icon: <BsImageAlt size={18} />,
        isEditable: isEditableBackground,
      },
    ];
  }, [isEditableBackground, isEditableStyles, isEditableTransition]);

  const filteredTabs = tabs.filter((tab) => tab.isEditable);

  useEffect(() => {
    if (editComponent) {
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          dispatch(setEditComponent(""));
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [dispatch, editComponent]);

  return (
    <>
      <div className="flex flex-col h-[94vh] shadow bg-[#FEEBDB] w-full">
        <div className="sticky top-0 z-10 bg-white border-b p-3 flex justify-between items-center rounded-t-lg">
          <h3 className="text-lg font-semibold">{editComponent}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              dispatch(setEditComponent(""));
              editor.select(null);
            }}
            className="text-xs"
          >
            <MdClose className="scale-125" />
          </Button>
        </div>

        <Tabs
          onValueChange={(value) => setActiveTab(value)}
          defaultValue={activeTab}
        >
          <TabsList className="bg-white">
            {filteredTabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                className="w-full p-0 data-[state=active]:border-orange-400 data-[state=active]:border-b-[3px] data-[state=active]:text-orange-400"
                value={tab.value}
              >
                <div className="flex flex-col  items-center pt-3">
                  <div
                    className={`flex justify-center items-center rounded-full ${
                      activeTab === tab.value
                        ? "bg-[#FF8E29] text-[#FFF4EA]"
                        : "bg-muted"
                    } p-2`}
                  >
                    {tab.icon}
                  </div>
                  <p className="font-semibold text-sm my-2">{tab.label}</p>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className=" bg-[#FEEBDB] h-[730px] overflow-y-auto overflow-x-hidden">
            <ComponentStyleEditor
              editor={editor}
              selectedComponent={editor?.getSelected()}
            />
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default EditorSheet;
