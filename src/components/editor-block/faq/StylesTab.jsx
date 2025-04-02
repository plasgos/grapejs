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
import { CgChevronDown, CgChevronDownR } from "react-icons/cg";
import SelectCircle from "../_components/SelectCircle";

const variantOptions = [
  { value: "basic", label: "Basic", icon: <CgChevronDown /> },
  { value: "card", label: "Card", icon: <CgChevronDownR /> },
];

const StylesTab = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const { wrapperStyle } = currentComponent;

  return (
    <div className="flex flex-col gap-y-5">
      <div className="w-full bg-white p-3 rounded-lg">
        <SelectCircle
          label="Variant"
          options={variantOptions}
          value={wrapperStyle.variant}
          onClick={(value) =>
            handleComponentChange("wrapperStyle.variant", value)
          }
        />
      </div>

      <div className="w-full flex flex-col gap-y-3 bg-white p-3 rounded-lg">
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
          label="Icon Color"
          value={wrapperStyle.iconColor}
          onChange={(value) => {
            handleComponentChange("wrapperStyle.iconColor", value);
          }}
        />
      </div>

      <Accordion defaultValue="title" type="single" collapsible>
        <AccordionItem value="title">
          <AccordionTrigger className="!no-underline font-semibold bg-white px-2 rounded-t-lg data-[state=closed]:rounded-lg">
            Title
          </AccordionTrigger>
          <AccordionContent className="bg-white p-2 rounded-b-lg ">
            <div className="flex flex-col gap-y-5">
              <ColorPicker
                asChild
                label="Color"
                value={wrapperStyle.color}
                onChange={(value) => {
                  handleComponentChange("wrapperStyle.color", value);
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
    </div>
  );
};

export default StylesTab;
