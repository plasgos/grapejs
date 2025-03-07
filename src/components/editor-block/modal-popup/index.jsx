import TabsEditor from "@/components/TabsEditor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { useChangeWrapperStyles } from "@/hooks/useChangeWrapperStyles";
import { produce } from "immer";
import BackgroundEditor from "../components/BackgroundEditor";

import { useEditor } from "@grapesjs/react";
import { useEffect, useRef, useState } from "react";
import SelectCircle from "../components/SelectCircle";
import StylesTab from "./StylesTab";

import { FaRegEye } from "react-icons/fa";
import { GiClick } from "react-icons/gi";
import { PiBracketsSquareLight, PiTimerBold } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ListComponents from "../components/ListComponents";

const modalOpenTypeOptions = [
  {
    value: "immediately",
    label: "Immediately",
    icon: <PiBracketsSquareLight size={20} />,
  },
  { value: "delay", label: "Delay", icon: <PiTimerBold size={20} /> },
  { value: "onClick", label: "Click Action", icon: <GiClick size={20} /> },
];

const delayOptions = [
  { value: 1000, label: "1 second" },
  { value: 2000, label: "2 second" },
  { value: 3000, label: "3 second" },
  { value: 5000, label: "5 second" },
  { value: 10000, label: "10 second" },
  { value: 15000, label: "15 second" },
  { value: 20000, label: "20 second" },
  { value: 30000, label: "30 second" },
  { value: 45000, label: "45 second" },
  { value: 60000, label: "60 second" },
  { value: 90000, label: "90 second" },
];

const EditorModalPopup = ({ selectedComponent }) => {
  const editor = useEditor();
  const editorModel = editor.getModel();

  const [popupModalOption, setPopupModalOption] = useState(
    selectedComponent.get("customComponent").popupModalOption
  );

  const { wrapperStyle, handleStylesChange } =
    useChangeWrapperStyles(selectedComponent);

  const handleChangePopupname = (value) => {
    handleStylesChange("popupName", value);
  };

  const isEffectExecuted = useRef(false);

  const [popupId, setPopupId] = useState(
    selectedComponent.get("customComponent").popupId
  );

  const handlePreviewModal = (value) => {
    selectedComponent?.set(
      "customComponent",
      produce(selectedComponent?.get("customComponent"), (draft) => {
        draft.isPreviewModal = value;
      })
    );
  };

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
  }, [editorModel, popupId, selectedComponent]);

  const handleChangePopupModalOption = (key, value) => {
    selectedComponent?.set(
      "customComponent",
      produce(selectedComponent?.get("customComponent"), (draft) => {
        draft.popupModalOption[key] = value;
      })
    );

    setPopupModalOption((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <TabsEditor withoutTransition>
      <TabsContent
        className="px-4 pb-5 animate__animated animate__fadeInLeft"
        value="content"
      >
        <div className="flex flex-col gap-y-5 bg-white p-5 rounded-lg mt-5">
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

          <SelectCircle
            label="Modal Open Type"
            options={modalOpenTypeOptions}
            value={popupModalOption.typeOpen}
            onClick={(value) => handleChangePopupModalOption("typeOpen", value)}
          />

          {popupModalOption.typeOpen === "delay" && (
            <div className="space-y-2">
              <Label>Delay Time</Label>

              <Select
                value={popupModalOption.delayDuration}
                onValueChange={(value) =>
                  handleChangePopupModalOption("delayDuration", value)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  {delayOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="ml-auto">
            <Button onClick={() => handlePreviewModal(true)} variant="outline">
              {" "}
              <FaRegEye />
              Preview
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-y-5 bg-white p-5 rounded-lg mt-5">
          <ListComponents
            editor={editor}
            selectedComponent={selectedComponent}
          />
        </div>
      </TabsContent>

      <TabsContent
        className="px-4 pb-5 animate__animated animate__fadeInLeft"
        value="styles"
      >
        <StylesTab selectedComponent={selectedComponent} />
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
