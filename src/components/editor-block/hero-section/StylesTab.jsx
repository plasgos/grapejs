import { shadowOptions } from "@/components/SelectOptions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useChangeWrapperStyles } from "@/hooks/useChangeWrapperStyles";
import ColorPicker from "../components/ColorPicker";
import RangeInputSlider from "../components/RangeInputSlider";
import SelectOptions from "../components/SelectOptions";

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
