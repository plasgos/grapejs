import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PiAlignRightSimpleFill } from "react-icons/pi";
import { TbBoxAlignBottomFilled, TbBoxAlignTopFilled } from "react-icons/tb";
import SelectCircle from "../_components/SelectCircle";
import SelectOptions from "../_components/SelectOptions";

import {
  aspectRatioOptions,
  maxColumnOptions,
} from "@/components/SelectOptions";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import ColorPicker from "../_components/ColorPicker";
import SelectFontFamily from "../_components/SelectFontFamily";
import SelectFontSize from "../_components/SelectFontSize";
import SelectTextAligment from "../_components/SelectTextAligment";
import RangeInputSlider from "../_components/RangeInputSlider";

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
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  const { wrapperStyle } = currentComponent;
  console.log("🚀 ~ StylesTab ~ wrapperStyle:", wrapperStyle);

  useSyncWithUndoRedo(setCurrentComponent);

  const handleChangeColor = (key, value) => {
    handleComponentChange(key, value);
    // handleComponentChange("isOverrideSchemeColor", true);
  };

  return (
    <div className="flex flex-col gap-y-5">
      <SelectOptions
        label="Column"
        options={maxColumnOptions}
        value={wrapperStyle.column}
        onChange={(value) => {
          handleComponentChange("wrapperStyle.column", value);
        }}
      />

      <Accordion defaultValue="image" type="single" collapsible>
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
                  handleComponentChange("wrapperStyle.imagePosition", value);
                }}
              />

              <SelectOptions
                label="Image Ratio"
                options={aspectRatioOptions}
                value={wrapperStyle.aspectRatio}
                onChange={(value) => {
                  handleComponentChange("wrapperStyle.aspectRatio", value);
                }}
              />

              <RangeInputSlider
                label="Rounded"
                value={wrapperStyle.rounded}
                onChange={(value) =>
                  handleComponentChange("wrapperStyle.rounded", value)
                }
                min={0}
                max={50}
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
                  handleChangeColor("wrapperStyle.titleColor", value);
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
    </div>
  );
};

export default StylesTab;
