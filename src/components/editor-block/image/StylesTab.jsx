import { shadowOptions } from "@/components/SelectOptions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { PiAlignRightSimpleFill } from "react-icons/pi";
import { SlSizeFullscreen } from "react-icons/sl";
import { TbLayoutDistributeVerticalFilled } from "react-icons/tb";
import ColorPicker from "../_components/ColorPicker";
import RangeInputSlider from "../_components/RangeInputSlider";
import SelectCircle from "../_components/SelectCircle";
import SelectOptions from "../_components/SelectOptions";
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
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  const { wrapperStyle } = currentComponent;

  useSyncWithUndoRedo(setCurrentComponent);

  return (
    <div className="flex flex-col gap-y-5 ">
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
                  handleComponentChange("wrapperStyle.variant", value);
                }}
              />

              {wrapperStyle.variant === "centerPage" && (
                <>
                  <ColorPicker
                    label="Border Color"
                    value={wrapperStyle.borderColor}
                    onChange={(value) =>
                      handleComponentChange("wrapperStyle.borderColor", value)
                    }
                  />

                  <RangeInputSlider
                    label="Width"
                    value={wrapperStyle.width}
                    onChange={(value) =>
                      handleComponentChange("wrapperStyle.width", value)
                    }
                    min={100}
                    max={1200}
                  />
                </>
              )}

              <RangeInputSlider
                label="Rotation"
                value={wrapperStyle.rotation}
                onChange={(value) =>
                  handleComponentChange("wrapperStyle.rotation", value)
                }
                min={-90}
                max={90}
              />

              <SelectOptions
                label="Shadow"
                options={shadowOptions}
                value={wrapperStyle.shadow}
                onChange={(value) =>
                  handleComponentChange("wrapperStyle.shadow", value)
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default StylesTab;
