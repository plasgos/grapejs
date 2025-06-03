import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import ColorPicker from "@/plugins/plasgos/components/_components-editor/ColorPicker";
import SelectFontFamily from "@/plugins/plasgos/components/_components-editor/SelectFontFamily";
import SelectFontSize from "@/plugins/plasgos/components/_components-editor/SelectFontSize";
import SelectTextAligment from "@/plugins/plasgos/components/_components-editor/SelectTextAligment";
import SelectOptions from "@/plugins/plasgos/components/_components-editor/SelectOptions";
import { textShadowOptions } from "@/components/SelectOptions";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const StylesTab = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  const { wrapperStyle } = currentComponent;

  useSyncWithUndoRedo(setCurrentComponent);
  return (
    <div className="flex flex-col gap-y-5  ">
      <Accordion defaultValue="range-value" type="single" collapsible>
        <AccordionItem value="range-value">
          <AccordionTrigger className="!no-underline font-semibold bg-white px-2 rounded-t-lg data-[state=closed]:rounded-lg">
            Range Value
          </AccordionTrigger>
          <AccordionContent className="bg-white p-2 rounded-b-lg ">
            <div className="flex flex-col gap-y-5">
              <ColorPicker
                asChild
                label="Color"
                value={wrapperStyle.colorRangeValue}
                onChange={(value) => {
                  handleComponentChange("wrapperStyle.colorRangeValue", value);
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
                label="Font Size"
                value={wrapperStyle.fontSize}
                onChange={(value) => {
                  handleComponentChange("wrapperStyle.fontSize", value);
                }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion defaultValue="overview" type="single" collapsible>
        <AccordionItem value="overview">
          <AccordionTrigger className="!no-underline font-semibold bg-white px-2 rounded-t-lg data-[state=closed]:rounded-lg">
            Overview
          </AccordionTrigger>
          <AccordionContent className="bg-white p-2 rounded-b-lg ">
            <div className="flex flex-col gap-y-5">
              <ColorPicker
                asChild
                label="Color"
                value={wrapperStyle.colorOverview}
                onChange={(value) => {
                  handleComponentChange("wrapperStyle.colorOverview", value);
                }}
              />

              <SelectFontFamily
                asChild
                label="Font Family"
                fontFamily={wrapperStyle.fontFamilyOverview}
                fontWeight={wrapperStyle.fontWeightOverview}
                onChangefontFamily={(value) => {
                  handleComponentChange(
                    "wrapperStyle.fontFamilyOverview",
                    value
                  );
                }}
                onChangefontWeight={(value) => {
                  handleComponentChange(
                    "wrapperStyle.fontWeightOverview",
                    value
                  );
                }}
              />

              <SelectFontSize
                asChild
                label="Size"
                value={wrapperStyle.fontSizeOverview}
                onChange={(value) => {
                  handleComponentChange("wrapperStyle.fontSizeOverview", value);
                }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex flex-col gap-y-2 bg-white p-3 rounded-lg">
        <SelectTextAligment
          value={wrapperStyle.textAligment}
          onChange={(value) =>
            handleComponentChange("wrapperStyle.textAligment", value)
          }
          isFlex
        />

        <SelectOptions
          label="Text Shadow"
          options={textShadowOptions}
          value={wrapperStyle.textShadow}
          onChange={(value) =>
            handleComponentChange(`wrapperStyle.textShadow`, value)
          }
        />
      </div>
    </div>
  );
};

export default StylesTab;
