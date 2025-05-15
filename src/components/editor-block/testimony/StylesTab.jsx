import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import ColorPicker from "../_components/ColorPicker";
import SelectFontFamily from "../_components/SelectFontFamily";
import SelectFontSize from "../_components/SelectFontSize";

import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { produce } from "immer";

const StylesTab = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);
  const { wrapperStyle } = currentComponent || {};

  const handleChangeMainColor = (key, value) => {
    const update = (component) => {
      return produce(component, (draft) => {
        draft.wrapperStyle[key] = value;
        draft.isOverrideSchemeColor = true;
      });
    };

    selectedComponent?.set(
      "customComponent",
      update(selectedComponent.get("customComponent"))
    );

    setCurrentComponent((prevComponent) => update(prevComponent));
  };

  return (
    <div className="flex flex-col gap-y-5">
      <div className="w-full flex flex-col gap-y-3 bg-white p-3 rounded-lg">
        <ColorPicker
          asChild
          label="Background Color"
          value={wrapperStyle.bgColor}
          onChange={(value) => {
            handleComponentChange("wrapperStyle.bgColor", value);
          }}
        />

        <ColorPicker
          asChild
          label="Border Color"
          value={wrapperStyle.borderColor}
          onChange={(value) => {
            handleComponentChange("wrapperStyle.borderColor", value);
          }}
        />

        <ColorPicker
          asChild
          label="Stars Color"
          value={wrapperStyle.starsColor}
          onChange={(value) => {
            handleComponentChange("wrapperStyle.starsColor", value);
          }}
        />

        <ColorPicker
          asChild
          label="Quote Color"
          value={wrapperStyle.quoteColor}
          onChange={(value) => {
            handleComponentChange("wrapperStyle.quoteColor", value);
          }}
        />
      </div>

      <Accordion defaultValue="title" type="single" collapsible>
        <AccordionItem value="title">
          <AccordionTrigger className="!no-underline font-semibold bg-white px-2 rounded-t-lg data-[state=closed]:rounded-lg">
            Name
          </AccordionTrigger>
          <AccordionContent className="bg-white p-2 rounded-b-lg ">
            <div className="flex flex-col gap-y-5">
              <ColorPicker
                asChild
                label="Color"
                value={wrapperStyle.nameColor}
                onChange={(value) => {
                  handleChangeMainColor("nameColor", value);
                }}
              />

              <SelectFontFamily
                asChild
                label="Font Family"
                fontFamily={wrapperStyle.fontFamily}
                fontWeight={wrapperStyle.fontWeight}
                onChangefontFamily={(value) => {
                  handleComponentChange("wrapperStyle.fontFamily", value);
                }}
                onChangefontWeight={(value) => {
                  handleComponentChange("wrapperStyle.fontWeight", value);
                }}
              />

              <SelectFontSize
                asChild
                label="Size"
                value={wrapperStyle.fontSize}
                onChange={(value) => {
                  handleComponentChange("wrapperStyle.fontSize", value);
                }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="w-full flex flex-col gap-y-3 bg-white p-3 rounded-lg">
        <ColorPicker
          asChild
          label="Profection"
          value={wrapperStyle.profectionColor}
          onChange={(value) => {
            handleChangeMainColor("profectionColor", value);
          }}
        />
      </div>
    </div>
  );
};

export default StylesTab;
