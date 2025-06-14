import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import BackgroundEditor from "@/plugins/plasgos/components/_components-editor/background";
import { produce } from "immer";

import SelectCircle from "@/plugins/plasgos/components/_components-editor/SelectCircle";
import { useEditor } from "@grapesjs/react";
import { useEffect, useRef } from "react";
import StylesTab from "./StylesTab";

import { FaRegEye } from "react-icons/fa";
import { GiClick } from "react-icons/gi";
import { PiBracketsSquareLight, PiTimerBold } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import SelectOptions from "../../_components-editor/SelectOptions";
import { useGlobalOptions } from "@/hooks/useGlobalOptions";

const modalOpenTypeOptions = [
  {
    value: "immediately",
    label: "Immediately",
    icon: <PiBracketsSquareLight size={20} />,
  },
  { value: "delay", label: "Delay", icon: <PiTimerBold size={20} /> },
  {
    value: "onClick",
    label: "Click Action ",
    icon: <GiClick size={20} />,
  },
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
  const parent = selectedComponent.parent();
  const el = parent.view?.el;
  const popupId = parent.getId();

  const editor = useEditor();
  const [globalOptions, updateGlobalOptions] = useGlobalOptions(editor);
  const editorModel = editor.getModel();

  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const { wrapperStyle, typeOpen, delayDuration } = currentComponent;

  const isEffectExecuted = useRef(false);

  const handlePreviewModal = () => {
    const parentComponent = selectedComponent?.parent();

    const parentStyle = parentComponent.getStyle();

    const update = (current) => {
      return produce(current, (draft) => {
        draft["display"] = "flex";
      });
    };

    el.classList.remove("animate-out", "fade-out-0");
    el.classList.add("animate-in", "fade-in-5");

    parentComponent.setStyle(update(parentStyle));
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
    }
  }, [editorModel, popupId, selectedComponent]);

  const handleChangePopupModalOption = (key, value) => {
    const updateValue = (component) => {
      return produce(component, (draft) => {
        draft[key] = value;
      });
    };

    selectedComponent?.set(
      "customComponent",
      updateValue(selectedComponent?.get("customComponent"))
    );

    if (value === "onClick") {
      updateGlobalOptions({
        popup: [
          ...globalOptions.popup,
          {
            id: popupId,
            value: `Popup ${globalOptions.popup.length + 1}`,
            label: `Popup ${globalOptions.popup.length + 1}`,
            isShown: false,
          },
        ],
      });
    }

    setCurrentComponent((prevComponent) => updateValue(prevComponent));
  };

  return (
    <>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInRight"
        value="content"
      >
        <div className="flex flex-col gap-y-5 bg-white p-5 rounded-lg ">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={wrapperStyle.popupName || ""}
              onChange={(e) => {
                const value = e.target.value;
                handleComponentChange("wrapperStyle.popupName", value);
              }}
            />
          </div>

          <SelectCircle
            label="Modal Open Type"
            options={modalOpenTypeOptions}
            value={typeOpen}
            onClick={(value) => handleChangePopupModalOption("typeOpen", value)}
          />

          {typeOpen === "delay" && (
            <div className="space-y-2">
              <SelectOptions
                label="Delay Time"
                options={delayOptions}
                value={delayDuration}
                onChange={(value) =>
                  handleChangePopupModalOption("delayDuration", value)
                }
              />
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
      </TabsContent>

      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInRight"
        value="styles"
      >
        <StylesTab selectedComponent={selectedComponent} />
      </TabsContent>

      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInRight"
        value="background"
      >
        <BackgroundEditor selectedComponent={selectedComponent} />
      </TabsContent>
    </>
  );
};

export default EditorModalPopup;
