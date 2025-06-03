import { TabsContent } from "@/components/ui/tabs";
import SectionAddScrollTargetId from "@/plugins/plasgos/components/_components-editor/SectionAddScrollTargetId";

import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import RangeInputSlider from "@/plugins/plasgos/components/_components-editor/RangeInputSlider";

const EditorEmptySpace = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const { mainStyle } = currentComponent;

  return (
    <>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInRight"
        value="content"
      >
        <div className="flex flex-col gap-y-5 py-1 mb-3 ">
          <SectionAddScrollTargetId selectedComponent={selectedComponent} />
        </div>

        <div className="w-full bg-white p-3 flex flex-col gap-y-5 rounded-lg">
          <RangeInputSlider
            label="Height"
            value={mainStyle.height}
            onChange={(value) =>
              handleComponentChange("mainStyle.height", value)
            }
            min={10}
            max={1200}
          />
        </div>
      </TabsContent>
    </>
  );
};

export default EditorEmptySpace;
