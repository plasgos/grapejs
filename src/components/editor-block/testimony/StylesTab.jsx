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
import SelectTextAligment from "../_components/SelectTextAligment";

const StylesTab = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);
  const { wrapperStyle } = currentComponent || {};
  console.log("🚀 ~ StylesTab ~ wrapperStyle:", wrapperStyle);

  const handleChangeMainColor = (key, value) => {
    const update = (component) => {
      return produce(component, (draft) => {
        draft.wrapperStyle[key] = value;
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
      <Accordion defaultValue="card" type="single" collapsible>
        <AccordionItem value="card">
          <AccordionTrigger className="!no-underline font-semibold bg-white px-2 rounded-t-lg data-[state=closed]:rounded-lg">
            Card
          </AccordionTrigger>
          <AccordionContent className="bg-white p-2 rounded-b-lg ">
            <div className="flex flex-col gap-y-5">
              <ColorPicker
                asChild
                label="Background Color"
                value={wrapperStyle.cardColor}
                onChange={(value) => {
                  handleComponentChange("wrapperStyle.cardColor", value);
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>

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

      <Accordion defaultValue="desc" type="single" collapsible>
        <AccordionItem value="desc">
          <AccordionTrigger className="!no-underline font-semibold bg-white px-2 rounded-t-lg data-[state=closed]:rounded-lg">
            Description
          </AccordionTrigger>
          <AccordionContent className="bg-white p-2 rounded-b-lg ">
            <div className="flex flex-col gap-y-5">
              <ColorPicker
                asChild
                label="Color"
                value={wrapperStyle.descriptionColor}
                onChange={(value) => {
                  handleChangeMainColor("descriptionColor", value);
                }}
              />

              <SelectFontFamily
                asChild
                label="Font Family"
                fontFamily={wrapperStyle.descriptionFontFamily}
                fontWeight={wrapperStyle.descriptionFontWeight}
                onChangefontFamily={(value) => {
                  handleComponentChange(
                    "wrapperStyle.descriptionFontFamily",
                    value
                  );
                }}
                onChangefontWeight={(value) => {
                  handleComponentChange(
                    "wrapperStyle.descriptionFontWeight",
                    value
                  );
                }}
              />

              <SelectFontSize
                asChild
                label="Size"
                value={wrapperStyle.descriptionFontSize}
                onChange={(value) => {
                  handleComponentChange(
                    "wrapperStyle.descriptionFontSize",
                    value
                  );
                }}
              />

              <SelectTextAligment
                asChild
                value={wrapperStyle.textAligment}
                onChange={(value) => {
                  handleComponentChange("wrapperStyle.textAligment", value);
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
