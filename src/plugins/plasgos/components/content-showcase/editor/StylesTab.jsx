import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PiAlignRightSimpleFill } from "react-icons/pi";
import { TbBoxAlignBottomFilled, TbBoxAlignTopFilled } from "react-icons/tb";

import {
  aspectRatioOptions,
  maxColumnOptions,
} from "@/components/SelectOptions";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import ColorPicker from "@/plugins/plasgos/components/_components-editor/ColorPicker";
import SelectFontFamily from "@/plugins/plasgos/components/_components-editor/SelectFontFamily";
import SelectFontSize from "@/plugins/plasgos/components/_components-editor/SelectFontSize";
import SelectTextAligment from "@/plugins/plasgos/components/_components-editor/SelectTextAligment";
import RangeInputSlider from "@/plugins/plasgos/components/_components-editor/RangeInputSlider";
import SelectOptions from "@/plugins/plasgos/components/_components-editor/SelectOptions";
import SelectCircle from "@/plugins/plasgos/components/_components-editor/SelectCircle";
import { useEditor } from "@grapesjs/react";

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
  useSyncWithUndoRedo(setCurrentComponent);
  const handleChangeColor = (key, value) => {
    handleComponentChange(key, value);
  };

  const editor = useEditor();

  const getSelectedIndex = () => {
    const selected = editor.getSelected();

    if (!selected) return -1;

    const parent = selected.parent();
    const siblings = parent?.components();

    const index = siblings.indexOf(selected);
    return index;
  };

  const currentIndex = getSelectedIndex();
  console.log("🚀 ~ StylesTab ~ currentIndex:", currentIndex);

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

      <Accordion defaultValue="desc" type="single" collapsible>
        <AccordionItem value="desc">
          <AccordionTrigger className="!no-underline font-semibold bg-white px-2 rounded-t-lg data-[state=closed]:rounded-lg">
            Description
          </AccordionTrigger>
          <AccordionContent className="bg-white p-2 rounded-b-lg ">
            <div className="flex flex-col gap-y-5">
              <ColorPicker
                asChild
                label="Color"
                value={wrapperStyle.descriptionColor}
                onChange={(value) => {
                  handleComponentChange("wrapperStyle.descriptionColor", value);
                }}
              />

              <SelectFontFamily
                asChild
                label="Font Family"
                fontFamily={wrapperStyle.descriptionFontFamily}
                fontWeight={wrapperStyle.descriptionFontWeight}
                onChangefontFamily={(value) => {
                  handleComponentChange(
                    "wrapperStyle.descriptionFontFamily",
                    value
                  );
                }}
                onChangefontWeight={(value) => {
                  handleComponentChange(
                    "wrapperStyle.descriptionFontWeight",
                    value
                  );
                }}
              />

              <SelectFontSize
                asChild
                label="Size"
                value={wrapperStyle.descriptionFontSize}
                onChange={(value) => {
                  handleComponentChange(
                    "wrapperStyle.descriptionFontSize",
                    value
                  );
                }}
              />

              <SelectTextAligment
                asChild
                value={wrapperStyle.textAligmentDescription}
                onChange={(value) => {
                  handleComponentChange(
                    "wrapperStyle.textAligmentDescription",
                    value
                  );
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
