import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGlobalOptions } from "@/hooks/useGlobalOptions";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { getColorOverride } from "@/utils/getColorOverride";
import { useEditor } from "@grapesjs/react";
import { produce } from "immer";
import ColorPicker from "../_components/ColorPicker";
import SelectFontFamily from "../_components/SelectFontFamily";
import SelectFontSize from "../_components/SelectFontSize";

const StylesTab = ({
  selectedComponent,
  currentComponent,
  setCurrentComponent,
  handleComponentChange,
}) => {
  const editor = useEditor();

  const components = editor?.getComponents().models;
  const componentId = editor?.getSelected().getId();
  const currentIndex = components.findIndex((c) => c.ccid === componentId);

  const [globalOptions] = useGlobalOptions(editor);
  const { schemeColor } = globalOptions || {};

  const color = schemeColor?.colours[currentIndex];

  const { wrapperStyle, isOverrideSchemeColor } = currentComponent;

  const headingColorPrimary = getColorOverride(
    schemeColor,
    isOverrideSchemeColor,
    wrapperStyle.headingColor,
    `#${color?.primary}`
  );
  console.log("🚀 ~ headingColorPrimary:", headingColorPrimary);

  useSyncWithUndoRedo(setCurrentComponent);

  const handleChangeMainColor = (key, value) => {
    const headingColorPrimary = getColorOverride(
      schemeColor,
      isOverrideSchemeColor,
      value,
      `#${color?.primary}`
    );

    const update = (component) => {
      return produce(component, (draft) => {
        draft.wrapperStyle[key] = headingColorPrimary;
        draft.isOverrideSchemeColor = true;
      });
    };

    selectedComponent.set(
      "customComponent",
      update(selectedComponent.get("customComponent"))
    );

    setCurrentComponent((prevComponent) => update(prevComponent));
  };

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-5">
        <Accordion defaultValue="title" type="single" collapsible>
          <AccordionItem value="title">
            <AccordionTrigger className="!no-underline font-semibold bg-white px-2 rounded-t-lg data-[state=closed]:rounded-lg">
              Heading Title
            </AccordionTrigger>
            <AccordionContent className="bg-white p-2 rounded-b-lg ">
              <div className="flex flex-col gap-y-5">
                <ColorPicker
                  asChild
                  label="Color"
                  // value={wrapperStyle.headingColor}
                  value={headingColorPrimary}
                  onChange={(value) => {
                    handleChangeMainColor("headingColor", value);
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
                  value={wrapperStyle.headingFontSize}
                  onChange={(value) => {
                    handleComponentChange(
                      "wrapperStyle.headingFontSize",
                      value
                    );
                  }}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="flex flex-col gap-y-5">
        <Accordion defaultValue="title" type="single" collapsible>
          <AccordionItem value="title">
            <AccordionTrigger className="!no-underline font-semibold bg-white px-2 rounded-t-lg data-[state=closed]:rounded-lg">
              Description
            </AccordionTrigger>
            <AccordionContent className="bg-white p-2 rounded-b-lg ">
              <div className="flex flex-col gap-y-5">
                <ColorPicker
                  asChild
                  label="Color"
                  value={wrapperStyle.description.color}
                  onChange={(value) => {
                    handleComponentChange(
                      "wrapperStyle.description.color",
                      value
                    );
                    handleComponentChange("isOverrideSchemeColor", value);
                  }}
                />

                <SelectFontFamily
                  asChild
                  label="Font Family"
                  fontFamily={wrapperStyle.description.fontFamily}
                  fontWeight={wrapperStyle.description.fontWeight}
                  onChangefontFamily={(value) => {
                    handleComponentChange(
                      "wrapperStyle.description.fontFamily",
                      value
                    );
                  }}
                  onChangefontWeight={(value) => {
                    handleComponentChange(
                      "wrapperStyle.description.fontWeight",
                      value
                    );
                  }}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="flex flex-col gap-y-5 bg-white rounded-lg p-3">
        <p className="font-semibold text-sm">Background Color</p>

        <ColorPicker
          asChild
          label=" Menu Link"
          value={wrapperStyle.menuBgColor}
          onChange={(value) => {
            handleChangeMainColor("menuBgColor", value);
          }}
        />

        <ColorPicker
          asChild
          label="Side Bar"
          value={wrapperStyle.bgColorSidebar}
          onChange={(value) => {
            handleChangeMainColor("bgColorSidebar", value);
          }}
        />
      </div>
    </div>
  );
};

export default StylesTab;
