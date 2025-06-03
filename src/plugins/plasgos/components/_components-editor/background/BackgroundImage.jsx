import ImageUploader from "../ImageUploader";
import RangeInputSlider from "../RangeInputSlider";

const BackgroundImage = ({ background, onChange }) => {
  return (
    <div className="flex flex-col gap-y-5">
      <ImageUploader
        label="Image"
        handleFileUpload={(url) => onChange(`background.bgImage`, url)}
        image={background.bgImage}
      />

      <RangeInputSlider
        label="Blur"
        value={background.blur}
        min={0}
        max={40}
        onChange={(value) => {
          onChange("background.blur", value);
        }}
      />

      <RangeInputSlider
        label="Opacity"
        value={background.opacity}
        min={-50}
        max={50}
        onChange={(value) => {
          onChange("background.opacity", value);
        }}
      />
    </div>
  );
};

export default BackgroundImage;
