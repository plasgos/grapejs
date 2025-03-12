import { useChangeWrapperStyles } from "@/hooks/useChangeWrapperStyles";
import { PiAlignRightSimpleFill } from "react-icons/pi";
import { SlSizeFullscreen } from "react-icons/sl";
import { TbLayoutDistributeVerticalFilled } from "react-icons/tb";
import SelectCircle from "../components/SelectCircle";

import SelectOptions from "../components/SelectOptions";

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
  { value: "cards", label: "Cards" },
  { value: "creative", label: "Creative" },
  { value: "flip", label: "Flip" },
];

const imageVariants = [
  {
    value: "fullPage",
    label: "Full Page",
    icon: <SlSizeFullscreen size={24} />,
  },
  {
    value: "centerPage",
    label: "Center Page",
    icon: <PiAlignRightSimpleFill size={24} />,
  },
  {
    value: "contentPage",
    label: "Content Page",
    icon: <TbLayoutDistributeVerticalFilled size={24} />,
  },
];

const StylesTab = ({ selectedComponent }) => {
  const { wrapperStyle, handleStylesChange } =
    useChangeWrapperStyles(selectedComponent);

  return (
    <div className="flex flex-col gap-y-5 mt-5 p-5 bg-white rounded-lg">
      <SelectCircle
        label="Variant"
        options={imageVariants}
        value={wrapperStyle.variant}
        onClick={(value) => {
          handleStylesChange("variant", value);
        }}
      />

      <SelectOptions
        label="Image Ratio"
        options={aspectRatioSliderImageOptions}
        value={wrapperStyle.aspectRatio}
        onChange={(value) => {
          handleStylesChange("aspectRatio", value);
        }}
      />

      <SelectOptions
        label="Auto Slide"
        options={timeOptions}
        value={wrapperStyle.autoSlide}
        onChange={(value) => handleStylesChange("autoSlide", value)}
      />

      <SelectOptions
        label="Transition Effect"
        options={transitionOptions}
        value={wrapperStyle.transitions}
        onChange={(value) => handleStylesChange("transitions", value)}
      />
    </div>
  );
};

export default StylesTab;
