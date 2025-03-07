import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PiAlignRightSimpleFill } from "react-icons/pi";
import SelectCircle from "../components/SelectCircle";
import { TbLayoutDistributeVerticalFilled } from "react-icons/tb";
import { useChangeWrapperStyles } from "@/hooks/useChangeWrapperStyles";
import RangeInputSlider from "../components/RangeInputSlider";
import SelectOptions from "../components/SelectOptions";
import { shadowOptions } from "@/components/SelectOptions";
import ColorPicker from "../components/ColorPicker";
import { SlSizeFullscreen } from "react-icons/sl";
const imageVariants = [
  {
    value: "fullPage",
    label: "Full Page",
    icon: <SlSizeFullscreen size={24} />,
  },
  {
    value: "centerPage",
    label: "Center Page",
    icon: <PiAlignRightSimpleFill size={24} />,
  },
  {
    value: "contentPage",
    label: "Content Page",
    icon: <TbLayoutDistributeVerticalFilled size={24} />,
  },
];

const StylesTab = ({ selectedComponent }) => {
  const { wrapperStyle, handleStylesChange } =
    useChangeWrapperStyles(selectedComponent);

  return (
    <div className="flex flex-col gap-y-5 mt-5">
      <Accordion defaultValue="image" type="single" collapsible>
        <AccordionItem value="image">
          <AccordionTrigger className="!no-underline font-semibold bg-white px-2 rounded-t-lg data-[state=closed]:rounded-lg">
            Image
          </AccordionTrigger>
          <AccordionContent className="bg-white p-3 rounded-b-lg ">
            <div className="flex flex-col gap-y-5">
              <SelectCircle
                label="Variant"
                options={imageVariants}
                value={wrapperStyle.variant}
                onClick={(value) => {
                  handleStylesChange("variant", value);
                }}
              />

              {wrapperStyle.variant === "centerPage" && (
                <>
                  <ColorPicker
                    label="Border Color"
                    value={wrapperStyle.borderColor}
                    onChange={(value) =>
                      handleStylesChange("borderColor", value)
                    }
                  />

                  <RangeInputSlider
                    label="Width"
                    value={wrapperStyle.width}
                    onChange={(value) => handleStylesChange("width", value)}
                    min={100}
                    max={1200}
                  />
                </>
              )}

              <RangeInputSlider
                label="Rotation"
                value={wrapperStyle.rotation}
                onChange={(value) => handleStylesChange("rotation", value)}
                min={-90}
                max={90}
              />

              <SelectOptions
                label="Shadow"
                options={shadowOptions}
                value={wrapperStyle.shadow}
                onChange={(value) => handleStylesChange("shadow", value)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default StylesTab;
