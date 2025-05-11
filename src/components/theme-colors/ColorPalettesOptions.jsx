import { cx } from "class-variance-authority";
import { schemeColours } from ".";

const ColorPalettesOptions = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col gap-y-3">
      <p>{label}</p>

      <div className="grid grid-cols-4 gap-3">
        {schemeColours.map((schemeColor, index) => {
          const selected = schemeColor?.name === value?.name;

          return (
            <div
              key={index}
              className={cx(
                "flex rounded-lg overflow-hidden max-w-full cursor-pointer",
                selected && "ring-2 ring-purple-500  ring-offset-2"
              )}
              onClick={() => onChange(schemeColor)}
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
    </div>
  );
};

export default ColorPalettesOptions;
