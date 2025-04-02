import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { TbAlignCenter, TbAlignLeft, TbAlignRight } from "react-icons/tb";
import ColorPicker from "../_components/ColorPicker";
import SelectFontFamily from "../_components/SelectFontFamily";
import SelectFontSize from "../_components/SelectFontSize";

const options = [
  { value: "justify-start", icon: <TbAlignLeft /> },
  { value: "justify-center", icon: <TbAlignCenter /> },
  { value: "justify-end", icon: <TbAlignRight /> },
];

const StylesTab = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const { wrapperStyle } = currentComponent;

  return (
    <div className="flex flex-col gap-y-5">
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

              <div className="flex justify-between items-center">
                <Label className={`font-normal`}>Aligment</Label>
                <div className="flex items-center gap-x-2">
                  {options.map((item) => (
                    <Button
                      key={item.value}
                      onClick={() => {
                        handleComponentChange(
                          "wrapperStyle.textAligment",
                          item.value
                        );
                      }}
                      variant={
                        wrapperStyle.textAligment === item.value
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
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default StylesTab;
