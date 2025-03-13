import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useChangeWrapperStyles } from "@/hooks/useChangeWrapperStyles";
import ColorPicker from "../components/ColorPicker";
import SelectFontFamily from "../components/SelectFontFamily";
import SelectFontSize from "../components/SelectFontSize";

import { CgChevronDown, CgChevronDownR } from "react-icons/cg";
import SelectCircle from "../components/SelectCircle";

const variantOptions = [
  { value: "basic", label: "Basic", icon: <CgChevronDown /> },
  { value: "card", label: "Card", icon: <CgChevronDownR /> },
];

const StylesTab = ({ selectedComponent }) => {
  const { wrapperStyle, handleStylesChange } =
    useChangeWrapperStyles(selectedComponent);

  return (
    <div className="flex flex-col gap-y-5">
      <div className="w-full bg-white p-3 rounded-lg">
        <SelectCircle
          label="Variant"
          options={variantOptions}
          value={wrapperStyle.variant}
          onClick={(value) => handleStylesChange("variant", value)}
        />
      </div>

      <div className="w-full flex flex-col gap-y-3 bg-white p-3 rounded-lg">
        <ColorPicker
          asChild
          label="Border Color"
          value={wrapperStyle.borderColor}
          onChange={(value) => {
            handleStylesChange("borderColor", value);
          }}
        />

        <ColorPicker
          asChild
          label="Icon Color"
          value={wrapperStyle.iconColor}
          onChange={(value) => {
            handleStylesChange("iconColor", value);
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
                  handleStylesChange("color", value);
                }}
              />

              <SelectFontFamily
                asChild
                label="Font Family"
                fontFamily={wrapperStyle.fontFamily}
                fontWeight={wrapperStyle.fontWeight}
                onChangefontFamily={(value) => {
                  handleStylesChange("fontFamily", value);
                }}
                onChangefontWeight={(value) => {
                  handleStylesChange("fontWeight", value);
                }}
              />

              <SelectFontSize
                asChild
                label="Size"
                value={wrapperStyle.fontSize}
                onChange={(value) => {
                  handleStylesChange("fontSize", value);
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
