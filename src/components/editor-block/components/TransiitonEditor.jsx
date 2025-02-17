import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdOutlineReplayCircleFilled } from "react-icons/md";
import { useState } from "react";
import { produce } from "immer";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { useEffect } from "react";

const transitionTypeOptions = [
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

export const transitionConfig = {
  fadeIn: { opacity: 0, y: 0 },
  fadeInUp: { opacity: 0, y: 50 },
  fadeInDown: { opacity: 0, y: -50 },
  fadeInLeft: { opacity: 0, x: -50 },
  fadeInRight: { opacity: 0, x: 50 },
  bounceIn: { opacity: 0, scale: 0.5 },
  flipInX: { rotationX: -90, opacity: 0 },
  flipInY: { rotationY: -90, opacity: 0 },
  zoomIn: { opacity: 0, scale: 0.5 },
  lightSpeedInRight: { x: 100, opacity: 0 },
  lightSpeedInLeft: { x: -100, opacity: 0 },
};

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

const TransiitonEditor = ({ selectedComponent }) => {
  const [selectedTransition, setSelectedTransition] = useState(
    transitionTypeOptions[0].value
  );
  const [selectedDuration, setSelectedDuration] = useState(
    durationOptions[1].options[0].value
  );
  const [selectedDelay, setSelectedDelay] = useState(delayOptions[0].value);

  const [isReplay, setIsReplay] = useState(true);

  const handleChangeTransition = (key, value) => {
    const currentComponent = selectedComponent?.get("customComponent");
    const updatedComponent = produce(currentComponent, (draft) => {
      draft.content.animation[key] = value;
    });
    selectedComponent?.set("customComponent", updatedComponent);
  };

  const handleReplay = () => {
    setIsReplay((prev) => !prev);
    const currentComponent = selectedComponent?.get("customComponent");
    const updatedComponent = produce(currentComponent, (draft) => {
      draft.content.animation.isReplay = isReplay;
    });
    selectedComponent?.set("customComponent", updatedComponent);
  };

  useEffect(() => {
    if (selectedComponent) {
      const currentComponent = selectedComponent?.get("customComponent");

      setSelectedTransition(currentComponent.content.animation.type);
      setSelectedDuration(currentComponent.content.animation.duration);
    }
  }, [selectedComponent]);

  return (
    <div className="my-5">
      <div className="flex items-center gap-3 w-full">
        <div className="space-y-2 w-full">
          <Label>Transition Type</Label>
          <Select
            value={selectedTransition}
            onValueChange={(value) => {
              setSelectedTransition(value);
              handleChangeTransition("type", value);
            }}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {transitionTypeOptions.map((transition) => (
                <SelectItem key={transition.value} value={transition.value}>
                  {transition.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedTransition && (
          <div className="space-y-2 w-full">
            <Label>Duration</Label>
            <Select
              value={selectedDuration}
              onValueChange={(value) => {
                setSelectedDuration(value);
                handleChangeTransition("duration", value);
              }}
            >
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                {durationOptions.map((duration, index) => (
                  <SelectGroup key={index}>
                    <SelectLabel>{duration.label}</SelectLabel>
                    {duration.options.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {selectedTransition && (
        <>
          <div className="my-5">
            <div className="space-y-2 w-full mb-5">
              <Label>Delay</Label>
              <Select
                value={selectedDelay}
                onValueChange={(value) => {
                  setSelectedDelay(value);
                  handleChangeTransition("delay", value);
                }}
              >
                <SelectTrigger className="w-[160px] bg-white">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  {delayOptions.map((delay) => (
                    <SelectItem key={delay.value} value={delay.value}>
                      {delay.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleReplay} variant="outline">
              Replay Transition <MdOutlineReplayCircleFilled />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default TransiitonEditor;
