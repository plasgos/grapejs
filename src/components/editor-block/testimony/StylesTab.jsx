import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useChangeWrapperStyles } from "@/hooks/useChangeWrapperStyles";
import ColorPicker from "../_components/ColorPicker";
import SelectFontFamily from "../_components/SelectFontFamily";
import SelectFontSize from "../_components/SelectFontSize";

import { CgChevronDown, CgChevronDownR } from "react-icons/cg";
import SelectCircle from "../_components/SelectCircle";
import SelectOptions from "../_components/SelectOptions";

const variantOptions = [
  { value: "basic", label: "Basic", icon: <CgChevronDown /> },
  { value: "card", label: "Card", icon: <CgChevronDownR /> },
];

const layoutVariants = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
];

const StylesTab = ({ selectedComponent }) => {
  const { wrapperStyle, handleStylesChange } =
    useChangeWrapperStyles(selectedComponent);

  return (
    <div className="flex flex-col gap-y-5">
      <div className="w-full flex flex-col gap-y-3 bg-white p-3 rounded-lg">
        <ColorPicker
          asChild
          label="Background Color"
          value={wrapperStyle.bgColor}
          onChange={(value) => {
            handleStylesChange("bgColor", value);
          }}
        />

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
          label="Stars Color"
          value={wrapperStyle.starsColor}
          onChange={(value) => {
            handleStylesChange("starsColor", value);
          }}
        />

        <ColorPicker
          asChild
          label="Quote Color"
          value={wrapperStyle.quoteColor}
          onChange={(value) => {
            handleStylesChange("quoteColor", value);
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
                  handleStylesChange("nameColor", value);
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

      <div className="w-full flex flex-col gap-y-3 bg-white p-3 rounded-lg">
        <ColorPicker
          asChild
          label="Profection"
          value={wrapperStyle.profectionColor}
          onChange={(value) => {
            handleStylesChange("profectionColor", value);
          }}
        />
      </div>
    </div>
  );
};

export default StylesTab;
