import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const RangeInputSlider = ({
  asChild,
  min = 0,
  max = 100,
  onChange,
  label,
  value,
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleSliderChange = (newValue) => {
    const numericValue = Number(newValue);
    setCurrentValue(numericValue);
    if (onChange) onChange(numericValue);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      // Hanya izinkan angka
      setCurrentValue(inputValue === "" ? "" : Number(inputValue));
    }
  };
  const handleInputBlur = () => {
    let numericValue = Number(currentValue);
    if (numericValue < min) numericValue = min;
    if (numericValue > max) numericValue = max;
    setCurrentValue(numericValue);
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
          value={[Number(currentValue)]} // Memastikan value sebagai angka
          min={min}
          max={max}
          step={1}
          onValueChange={(newValue) => handleSliderChange(newValue[0])}
        />

        {/* Input yang bisa diketik dengan validasi */}

        <div className="relative">
          <Input
            value={safeValue(currentValue)}
            className="w-[70px] pr-8 "
            type="text"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />

          <p className="absolute right-3 top-1.5 text-muted-foreground  z-10">
            px
          </p>
        </div>
      </div>
    </div>
  );
};

export default RangeInputSlider;
