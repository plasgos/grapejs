import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import TextEditor from "../_components/TextEditor";

const StylesTab = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  const { copyright } = currentComponent;
  console.log("🚀 ~ StylesTab ~ copyright:", copyright);

  useSyncWithUndoRedo(setCurrentComponent);

  return (
    <div className="flex flex-col gap-y-5">
      <div className="bg-white rounded-lg p-3">
        <TextEditor
          label="Copyright"
          value={copyright.text}
          onChange={(value) => handleComponentChange("copyright.text", value)}
        />
      </div>
    </div>
  );
};

export default StylesTab;
