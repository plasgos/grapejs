import { aspectRatioOptions, shadowOptions } from "@/components/SelectOptions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import RangeInputSlider from "../_components/RangeInputSlider";
import SelectOptions from "../_components/SelectOptions";
import { objectViewOptions } from "../list-images/StylesTab";

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
              <SelectOptions
                label="Image Ratio"
                options={aspectRatioOptions}
                value={wrapperStyle.aspectRatio}
                onChange={(value) => {
                  handleComponentChange("wrapperStyle.aspectRatio", value);
                }}
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

              <SelectOptions
                label="Object View"
                options={objectViewOptions}
                value={wrapperStyle.objectView}
                onChange={(value) => {
                  handleComponentChange("wrapperStyle.objectView", value);
                }}
              />

              {wrapperStyle.objectView === "object-cover" && (
                <RangeInputSlider
                  label="Rounded"
                  value={wrapperStyle.rounded}
                  onChange={(value) =>
                    handleComponentChange("wrapperStyle.rounded", value)
                  }
                  min={0}
                  max={50}
                />
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default StylesTab;
