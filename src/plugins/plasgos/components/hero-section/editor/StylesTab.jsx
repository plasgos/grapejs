import { shadowOptions } from "@/components/SelectOptions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import RangeInputSlider from "@/plugins/plasgos/components/_components-editor/RangeInputSlider";
import SelectOptions from "@/plugins/plasgos/components/_components-editor/SelectOptions";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BsAlignEnd, BsAlignStart } from "react-icons/bs";
import SelectTextAligment from "@/plugins/plasgos/components/_components-editor/SelectTextAligment";

const imagePostionOptions = [
  { value: "left", label: "Left", icon: <BsAlignStart /> },
  { value: "right", label: "Right", icon: <BsAlignEnd /> },
];

const StylesTab = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  const { wrapperStyle, contents } = currentComponent;

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
              {wrapperStyle.variant === "no-image" && (
                <>
                  <SelectTextAligment
                    label="Aligment Text"
                    value={wrapperStyle.alignText}
                    onChange={(value) =>
                      handleComponentChange("wrapperStyle.alignText", value)
                    }
                    isFlex
                  />

                  <SelectTextAligment
                    label="Aligment Buttons"
                    value={wrapperStyle.alignButtons}
                    onChange={(value) =>
                      handleComponentChange("wrapperStyle.alignButtons", value)
                    }
                    isFlex
                  />

                  <RangeInputSlider
                    label="Width"
                    value={wrapperStyle.widthText}
                    onChange={(value) =>
                      handleComponentChange("wrapperStyle.widthText", value)
                    }
                    min={100}
                    max={1500}
                  />
                </>
              )}

              {wrapperStyle.variant === "basic" && (
                <>
                  <div className="flex justify-between items-center">
                    <Label className="font-normal">Image Position</Label>

                    <div className="flex items-center gap-x-2">
                      {imagePostionOptions.map((item) => (
                        <Button
                          key={item.value}
                          onClick={() => {
                            handleComponentChange(
                              `contents.${contents[0].id}.imagePosition`,
                              item.value
                            );
                          }}
                          variant={
                            item.value === contents[0].imagePosition
                              ? ""
                              : "outline"
                          }
                          size="sm"
                        >
                          {item.icon}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <RangeInputSlider
                    asChild
                    label="Width"
                    value={currentComponent?.contents[0].width}
                    onChange={(value) =>
                      handleComponentChange(
                        `contents.${contents[0].id}.width`,
                        value
                      )
                    }
                    min={100}
                    max={1440}
                  />

                  <RangeInputSlider
                    asChild
                    label="Rotation"
                    value={currentComponent?.contents[0].rotation}
                    onChange={(value) =>
                      handleComponentChange(
                        `contents.${contents[0].id}.rotation`,
                        value
                      )
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
                </>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default StylesTab;
