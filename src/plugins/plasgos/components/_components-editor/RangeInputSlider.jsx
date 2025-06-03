import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const RangeInputSlider = ({
  asChild,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  label,
  value,
  unit = "px",
}) => {
  const handleSliderChange = (newValue) => {
    if (onChange) onChange(Number(newValue));
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (onChange) onChange(Number(inputValue));
  };

  const handleInputBlur = () => {
    let numericValue = Number(value);
    if (numericValue < min) numericValue = min;
    if (numericValue > max) numericValue = max;

    if (onChange) onChange(numericValue);
  };

  const safeValue = (value) => {
    return isNaN(value) ? 0 : value;
  };

  return (
    <div className="w-full">
      {label && (
        <Label className={`${asChild && "font-normal"}`}>{label}</Label>
      )}

      <div className="flex items-center gap-3">
        {/* Slider dengan sinkronisasi nilai */}
        <Slider
          className="cursor-pointer"
          value={[safeValue(value)]} // Memastikan value tetap valid
          defaultValue={[safeValue(value)]} // Menjaga posisi tengah jika 0
          min={min}
          max={max}
          step={step}
          onValueChange={(newValue) => handleSliderChange(newValue[0])}
        />

        {/* Input yang bisa diketik dengan validasi */}

        <div className="relative">
          <Input
            value={safeValue(value)}
            className="w-[80px] pr-8 "
            type="text"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            step={step}
          />

          <p className="absolute right-3 top-1.5 text-muted-foreground  z-10">
            {unit}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RangeInputSlider;
