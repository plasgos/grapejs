import TabsEditor from "@/components/TabsEditor";
import { TabsContent } from "@/components/ui/tabs";
import SectionAddScrollTargetId from "../_components/SectionAddScrollTargetId";

import { useChangeWrapperStyles } from "@/hooks/useChangeWrapperStyles";
import RangeInputSlider from "../_components/RangeInputSlider";

const EditorEmptySpace = ({ selectedComponent }) => {
  const { wrapperStyle, handleStylesChange } =
    useChangeWrapperStyles(selectedComponent);

  return (
    <TabsEditor withoutStyles withoutTransition withoutBackground>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="content"
      >
        <div className="flex flex-col gap-y-5 py-1 mb-3 ">
          <SectionAddScrollTargetId selectedComponent={selectedComponent} />
        </div>

        <div className="w-full bg-white p-3 flex flex-col gap-y-5 rounded-lg">
          <RangeInputSlider
            label="Height"
            value={wrapperStyle.height}
            onChange={(value) => handleStylesChange("height", value)}
            min={10}
            max={1200}
          />
        </div>
      </TabsContent>
    </TabsEditor>
  );
};

export default EditorEmptySpace;
