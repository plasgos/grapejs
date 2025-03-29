import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { produce } from "immer";
import { useState } from "react";
import { MdOutlineReplayCircleFilled } from "react-icons/md";
import { Button } from "../../ui/button";
import SelectOptions from "./SelectOptions";

export const transitionTypeOptions = [
  { value: null, label: "No Transition" },
  { value: "animate__fadeIn", label: "Fade In" },
  { value: "animate__fadeInUp", label: "Fade In Up" },
  { value: "fadeInDown", label: "Fade In Down" },
  { value: "fadeInLeft", label: "Fade In Left" },
  { value: "fadeInRight", label: "Fade In Right" },
  { value: "animate__bounceIn", label: "Bounce In" },
  { value: "animate__flipInX", label: "Flip In X" },
  { value: "animate__flipInY", label: "Flip In Y" },
  { value: "animate__zoomIn", label: "Zoom In" },
  { value: "animate__lightSpeedInRight", label: "SpeedInRight" },
  { value: "animate__lightSpeedInLeft", label: "SpeedInLeft" },
];

const durationOptions = [
  {
    label: "Fast",
    options: [
      { value: 0.3, label: "0.3 second" },
      { value: 0.6, label: "0.6 second" },
    ],
  },
  {
    label: "Slow",
    options: [
      { value: 1, label: "1 second" },
      { value: 2, label: "2 second" },
      { value: 3, label: "3 second" },
    ],
  },
];

const delayOptions = [
  { value: null, label: "No Delay" },
  { value: "animate__delay-2s", label: "2 second" },
  { value: "animate__delay-3s", label: "3 second" },
  { value: "animate__delay-4s", label: "4 second" },
  { value: "animate__delay-5s", label: "5 second" },
];

const TransiitonEditor = ({
  selectedComponent,
  label = "Transition",
  type = "animation",
}) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const animation = currentComponent[type];

  const [isReplay, setIsReplay] = useState(true);

  const handleReplay = () => {
    setIsReplay((prev) => !prev);

    selectedComponent?.set(
      "customComponent",
      produce(selectedComponent?.get("customComponent"), (draft) => {
        draft[type].isReplay = isReplay;
      })
    );
  };

  return (
    <div className="my-5 rounded-lg bg-white p-3">
      <p className="font-semibold mb-3">{label}</p>

      <div className="flex items-center gap-3 w-full">
        <SelectOptions
          asChild
          label="Transition Type"
          options={transitionTypeOptions}
          value={animation.type}
          onChange={(value) => handleComponentChange(`${type}.type`, value)}
        />

        {animation.type && (
          <SelectOptions
            asChild
            label="Duration"
            options={durationOptions}
            value={animation.duration}
            onChange={(value) =>
              handleComponentChange(`${type}.duration`, value)
            }
          />
        )}
      </div>

      {animation.type && (
        <div className="mt-3">
          <SelectOptions
            asChild
            label="Delay"
            options={delayOptions}
            value={animation.delay}
            onChange={(value) => handleComponentChange(`${type}.delay`, value)}
          />
          <Button className="mt-3" onClick={handleReplay} variant="outline">
            Replay Transition <MdOutlineReplayCircleFilled />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransiitonEditor;
