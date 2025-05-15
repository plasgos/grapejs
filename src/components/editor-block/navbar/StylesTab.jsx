import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import ColorPicker from "../_components/ColorPicker";
import SelectFontFamily from "../_components/SelectFontFamily";
import SelectFontSize from "../_components/SelectFontSize";

const StylesTab = ({
  currentComponent,
  setCurrentComponent,
  handleComponentChange,
}) => {
  const { wrapperStyle } = currentComponent;

  useSyncWithUndoRedo(setCurrentComponent);

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
                  value={wrapperStyle.headingColor}
                  onChange={(value) => {
                    handleComponentChange("wrapperStyle.headingColor", value);
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
                  value={wrapperStyle.description.descriptionColor}
                  onChange={(value) => {
                    handleComponentChange(
                      "wrapperStyle.description.descriptionColor",
                      value
                    );
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
            handleComponentChange("wrapperStyle.menuBgColor", value);
          }}
        />

        <ColorPicker
          asChild
          label="Side Bar"
          value={wrapperStyle.bgColorSidebar}
          onChange={(value) => {
            handleComponentChange("wrapperStyle.bgColorSidebar", value);
          }}
        />
      </div>
    </div>
  );
};

export default StylesTab;
