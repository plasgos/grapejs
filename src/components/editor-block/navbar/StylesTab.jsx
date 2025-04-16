import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import ColorPicker from "../_components/ColorPicker";
import SelectFontFamily from "../_components/SelectFontFamily";
import SelectFontSize from "../_components/SelectFontSize";

const StylesTab = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

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
                  value={wrapperStyle.description.color}
                  onChange={(value) => {
                    handleComponentChange(
                      "wrapperStyle.description.color",
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

      <div className="flex flex-col gap-y-5">
        <Accordion defaultValue="title" type="single" collapsible>
          <AccordionItem value="title">
            <AccordionTrigger className="!no-underline font-semibold bg-white px-2 rounded-t-lg data-[state=closed]:rounded-lg">
              Menu Link
            </AccordionTrigger>
            <AccordionContent className="bg-white p-2 rounded-b-lg ">
              <div className="flex flex-col gap-y-5">
                <ColorPicker
                  asChild
                  label="Background Color"
                  value={wrapperStyle.menuBgColor}
                  onChange={(value) => {
                    handleComponentChange("wrapperStyle.menuBgColor", value);
                  }}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default StylesTab;
