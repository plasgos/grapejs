import TabsEditor from "@/components/TabsEditor";
import { TabsContent } from "@/components/ui/tabs";
import BackgroundEditor from "../components/BackgroundEditor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useChangeWrapperStyles } from "@/hooks/useChangeWrapperStyles";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEditor } from "@grapesjs/react";
import { useEffect } from "react";
import { useRef } from "react";
import { produce } from "immer";
import { useState } from "react";

const EditorModalPopup = ({ selectedComponent }) => {
  const editor = useEditor();
  const editorModel = editor.getModel();

  const { wrapperStyle, handleStylesChange } =
    useChangeWrapperStyles(selectedComponent);

  const handleChangePopupname = (value) => {
    handleStylesChange("popupName", value);
  };

  const isEffectExecuted = useRef(false);

  const [popupId, setPopupId] = useState(
    selectedComponent.get("customComponent").popupId
  );
  console.log("🚀 ~ EditorModalPopup ~ popupId:", popupId);

  useEffect(() => {
    if (selectedComponent && !popupId && !isEffectExecuted.current) {
      isEffectExecuted.current = true;
      const globalOptions = editorModel.get("globalOptions");
      const newId = Math.random().toString(36).substr(2, 9);

      // Tambahkan popup baru ke dalam array
      editorModel.set("globalOptions", {
        ...globalOptions,
        popup: [
          ...globalOptions.popup,
          {
            id: newId,
            value: `Popup ${globalOptions.popup.length + 1}`,
            label: `Popup ${globalOptions.popup.length + 1}`,
            isShown: false,
          },
        ],
      });

      setPopupId(newId);
      selectedComponent.set(
        "customComponent",
        produce(selectedComponent.get("customComponent"), (draft) => {
          draft.popupId = newId;
        })
      );

      const data = selectedComponent.get("customComponent");
      console.log("🚀 ~ EditorModalPopup ~ data:", data);

      // console.log("STORE", editorModel.get("globalOptions"));
    }
  }, [editorModel, selectedComponent]);

  return (
    <TabsEditor withoutStyles>
      <TabsContent
        className="px-4 pb-5 animate__animated animate__fadeInLeft"
        value="content"
      >
        <Accordion defaultValue="item-1" type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="!no-underline bg-white rounded px-3  ">
              Popup
            </AccordionTrigger>
            <AccordionContent className="bg-white rounded p-2">
              <div className="flex flex-col gap-y-5">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={wrapperStyle.popupName || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleChangePopupname(value);
                    }}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex flex-col gap-y-5 py-1">
          {/* <DraggableList
        contents={contents}
        renderContents={(value) => renderContents(value)}
        setContents={setContents}
        editItem={editItem}
        selectedComponent={selectedComponent}
        setEditItem={setEditItem}
      >
        <Button
          onClick={handleAddContent}
          variant="outline"
          className="my-3 w-full"
        >
          Add Content <Plus />
        </Button>
      </DraggableList> */}
        </div>
      </TabsContent>

      <TabsContent
        className="px-4 pb-5 animate__animated animate__fadeInLeft"
        value="styles"
      >
        {/* <StylesTab selectedComponent={selectedComponent} /> */}
      </TabsContent>

      <TabsContent
        className="px-4 pb-5 animate__animated animate__fadeInLeft"
        value="background"
      >
        <BackgroundEditor selectedComponent={selectedComponent} />
      </TabsContent>
    </TabsEditor>
  );
};

export default EditorModalPopup;
