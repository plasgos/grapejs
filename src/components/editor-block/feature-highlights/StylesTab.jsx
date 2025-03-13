import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useChangeWrapperStyles } from "@/hooks/useChangeWrapperStyles";
import { TbAlignCenter, TbAlignLeft, TbAlignRight } from "react-icons/tb";
import ColorPicker from "../components/ColorPicker";
import SelectFontFamily from "../components/SelectFontFamily";
import SelectFontSize from "../components/SelectFontSize";

const options = [
  { value: "justify-start", icon: <TbAlignLeft /> },
  { value: "justify-center", icon: <TbAlignCenter /> },
  { value: "justify-end", icon: <TbAlignRight /> },
];

const StylesTab = ({ selectedComponent }) => {
  const { wrapperStyle, handleStylesChange } =
    useChangeWrapperStyles(selectedComponent);

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

              <div className="flex justify-between items-center">
                <Label className={`font-normal`}>Aligment</Label>
                <div className="flex items-center gap-x-2">
                  {options.map((item) => (
                    <Button
                      key={item.value}
                      onClick={() => {
                        handleStylesChange("textAligment", item.value);
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
