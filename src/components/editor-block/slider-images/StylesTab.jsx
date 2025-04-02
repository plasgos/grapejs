import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import SelectOptions from "../_components/SelectOptions";

const aspectRatioSliderImageOptions = [
  {
    label: "Kotak",
    options: [{ value: 1 / 1, label: "1:1" }],
  },
  {
    label: "Melebar",
    options: [
      { value: 2 / 1, label: "2:1" },
      { value: 5 / 2, label: "5:2" },
      { value: 3 / 1, label: "3:1" },
      { value: 4 / 1, label: "4:1" },
      { value: 4 / 3, label: "4:3" },
      { value: 5 / 1, label: "5:1" },
      { value: 10 / 1, label: "10:1" },
    ],
  },
  {
    label: "Potret",
    options: [
      { value: 1 / 2, label: "1:2" },
      { value: 2 / 3, label: "2:3" },
      { value: 3 / 5, label: "3:5" },
      { value: 4 / 5, label: "4:5" },
      { value: 9 / 16, label: "9:16" },
    ],
  },
];

const timeOptions = [
  { value: null, label: "Tidak Ada" },
  { value: 1, label: "1 second" },
  { value: 2, label: "2 second" },
  { value: 3, label: "3 second" },
  { value: 5, label: "5 second" },
  { value: 10, label: "10 second" },
  { value: 15, label: "15 second" },
  { value: 20, label: "20 second" },
];

const transitionOptions = [
  { value: "scroll", label: "Scroll" },
  { value: "fade", label: "Fade" },
  { value: "cube", label: "Cube" },
  { value: "coverflow", label: "Coverflow" },
  { value: "creative", label: "Creative" },
  { value: "flip", label: "Flip" },
];

const StylesTab = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  const { wrapperStyle } = currentComponent;

  useSyncWithUndoRedo(setCurrentComponent);

  return (
    <div className="flex flex-col gap-y-5  p-5 bg-white rounded-lg">
      <SelectOptions
        label="Image Ratio"
        options={aspectRatioSliderImageOptions}
        value={wrapperStyle.aspectRatio}
        onChange={(value) => {
          handleComponentChange("wrapperStyle.aspectRatio", value);
        }}
      />

      <SelectOptions
        label="Auto Slide"
        options={timeOptions}
        value={wrapperStyle.autoSlide}
        onChange={(value) =>
          handleComponentChange("wrapperStyle.autoSlide", value)
        }
      />

      <SelectOptions
        label="Transition Effect"
        options={transitionOptions}
        value={wrapperStyle.transitions}
        onChange={(value) =>
          handleComponentChange("wrapperStyle.transitions", value)
        }
      />

      <div className="flex justify-between items-center">
        <Label className="font-normal">Navigation</Label>
        <Switch
          checked={wrapperStyle.navigation}
          onCheckedChange={(checked) =>
            handleComponentChange("wrapperStyle.navigation", checked)
          }
        />
      </div>
      <div className="flex justify-between items-center">
        <Label className="font-normal">Pagination</Label>
        <Switch
          checked={wrapperStyle.pagination}
          onCheckedChange={(checked) =>
            handleComponentChange("wrapperStyle.pagination", checked)
          }
        />
      </div>
    </div>
  );
};

export default StylesTab;
