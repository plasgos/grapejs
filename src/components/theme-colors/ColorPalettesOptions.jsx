import { cx } from "class-variance-authority";
import { schemeColours } from ".";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { MdInvertColorsOff } from "react-icons/md";

const ColorPalettesOptions = ({
  label,
  value,
  onChange,
  onResetSchemeColor,
}) => {
  return (
    <div className="flex flex-col gap-y-3">
      <Label>{label}</Label>

      <div className="grid grid-cols-4 gap-3">
        {schemeColours.map((schemeColor, index) => {
          const selected = schemeColor?.name === value;

          return (
            <div
              key={index}
              className={cx(
                "flex rounded-lg overflow-hidden max-w-full cursor-pointer",
                selected && "ring-2 ring-purple-500  ring-offset-2"
              )}
              onClick={() => onChange(schemeColor.name)}
            >
              {schemeColor.colours.map((color, indexColor) => {
                return (
                  <div
                    key={indexColor}
                    className=" h-12 w-10 "
                    style={{
                      backgroundColor: `#${color.background}`,
                    }}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button variant="outline" onClick={onResetSchemeColor}>
          Reset Color Palettes <MdInvertColorsOff />
        </Button>
      </div>
    </div>
  );
};

export default ColorPalettesOptions;
