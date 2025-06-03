import { FaRegImage } from "react-icons/fa6";
import { IoMdColorFill } from "react-icons/io";
import { IoColorFill } from "react-icons/io5";
import { TbTexture } from "react-icons/tb";

import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { MdOutlineHideImage } from "react-icons/md";
import SelectCircle from "../SelectCircle";
import BackgroundImage from "./BackgroundImage";
import GradientOptions from "./GradientOptions";
import PatternOptions from "./PatternOptions";
import SolidColorOptions from "./SolidColorOptions";
import StyleSettings from "./StyleSettings";

const bgTypeOptions = [
  { value: null, label: "None", icon: <MdOutlineHideImage size={24} /> },
  { value: "bgColor", label: "Color", icon: <IoColorFill size={24} /> },
  { value: "gradients", label: "Gradients", icon: <IoMdColorFill size={26} /> },
  { value: "pattern", label: "Pattern", icon: <TbTexture size={22} /> },
  { value: "image", label: "Image", icon: <FaRegImage size={20} /> },
];

const BackgroundEditor = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const { background } = currentComponent;

  const handleChangeBgType = (value) => {
    if (value === background.bgType) return;

    if (!currentComponent) return;

    const spaceOptions = {
      rounded: background?.rounded,
      padding: background?.padding,
      marginTop: background?.marginTop,
      marginBottom: background?.marginBottom,
      isFullWidth: background?.isFullWidth,
    };

    // Helper function to get new background values
    const getBackgroundValues = (type) => {
      const baseValues = { ...spaceOptions, bgType: type };

      const typeConfigs = {
        null: baseValues,
        bgColor: { ...baseValues, bgColor: "#3f51b5" },
        gradients: {
          ...baseValues,
          fromColor: "#FF6F61",
          toColor: "#6B5B95",
          direction: "to right",
        },
        pattern: {
          ...baseValues,
          pattern:
            "https://ik.imagekit.io/ez1ffaf6o/patterns/pattern11.webp?updatedAt=1748932319488",
        },
        image: {
          ...baseValues,
          bgImage:
            "https://ik.imagekit.io/ez1ffaf6o/default-images/slider4.jpg?updatedAt=1747123866454",
          blur: 0,
          opacity: 0,
        },
      };

      return typeConfigs[type] || baseValues;
    };

    handleComponentChange(`background`, getBackgroundValues(value));
  };

  return (
    <div className="w-full flex flex-col gap-y-5">
      <div className="w-full bg-white p-3 rounded-lg">
        <SelectCircle
          label="Background Type"
          options={bgTypeOptions}
          value={background.bgType}
          onClick={(value) => {
            handleChangeBgType(value);
          }}
        />
        <div>
          <div className=" pb-2 border-b mb-5" />

          {background.bgType === "bgColor" && (
            <SolidColorOptions
              value={background?.bgColor}
              onChange={handleComponentChange}
            />
          )}

          {background.bgType === "gradients" && (
            <GradientOptions
              background={background}
              onChange={handleComponentChange}
            />
          )}

          {background.bgType === "pattern" && (
            <PatternOptions
              value={background?.pattern}
              onChange={handleComponentChange}
            />
          )}

          {background.bgType === "image" && (
            <BackgroundImage
              background={background}
              onChange={handleComponentChange}
            />
          )}
        </div>
      </div>

      <StyleSettings background={background} onChange={handleComponentChange} />
    </div>
  );
};

export default BackgroundEditor;
