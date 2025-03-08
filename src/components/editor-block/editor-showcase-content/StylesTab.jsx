import SelectOptions from "../components/SelectOptions";
import { PiAlignRightSimpleFill } from "react-icons/pi";
import { TbBoxAlignBottomFilled, TbBoxAlignTopFilled } from "react-icons/tb";
import SelectCircle from "../components/SelectCircle";
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
import SelectTextAligment from "../components/SelectTextAligment";
import {
  aspectRatioOptions,
  maxColumnOptions,
} from "@/components/SelectOptions";

const imagePositionOptions = [
  { value: "top", label: "Top", icon: <TbBoxAlignTopFilled size={24} /> },
  {
    value: "center",
    label: "Center",
    icon: <PiAlignRightSimpleFill size={24} />,
  },
  {
    value: "bottom",
    label: "Bottom",
    icon: <TbBoxAlignBottomFilled size={24} />,
  },
];

const StylesTab = ({ selectedComponent }) => {
  const { wrapperStyle, handleStylesChange } =
    useChangeWrapperStyles(selectedComponent);

  return (
    <div className="flex flex-col gap-y-5">
      <SelectOptions
        label="Column"
        options={maxColumnOptions}
        value={wrapperStyle.column}
        onChange={(value) => {
          handleStylesChange("column", value);
        }}
      />

      <Accordion type="single" collapsible>
        <AccordionItem value="image">
          <AccordionTrigger className="!no-underline font-semibold bg-white px-2 rounded-t-lg data-[state=closed]:rounded-lg">
            Image
          </AccordionTrigger>
          <AccordionContent className="bg-white p-2 rounded-b-lg ">
            <div className="flex flex-col gap-y-5">
              <SelectCircle
                label="Position"
                options={imagePositionOptions}
                value={wrapperStyle.imagePosition}
                onClick={(value) => {
                  handleStylesChange("imagePosition", value);
                }}
              />

              <SelectOptions
                label="Image Ratio"
                options={aspectRatioOptions}
                value={wrapperStyle.aspectRatio}
                onChange={(value) => {
                  handleStylesChange("aspectRatio", value);
                }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

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
                value={wrapperStyle.titleColor}
                onChange={(value) => {
                  handleStylesChange("titleColor", value);
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

              <SelectTextAligment
                asChild
                value={wrapperStyle.textAligment}
                onChange={(value) => {
                  handleStylesChange("textAligment", value);
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
