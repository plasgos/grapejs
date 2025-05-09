import { setSelectedColorScheme } from "@/redux/modules/landing-page/landingPageSlice";
import { cx } from "class-variance-authority";
import { useDispatch, useSelector } from "react-redux";
import { schemeColours } from ".";

const ColorPalettesOptions = () => {
  const { selectedColorScheme } = useSelector((state) => state.landingPage);

  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-y-3">
      <p>Color Palettes</p>

      <div className="grid grid-cols-4 gap-3">
        {schemeColours.map((schemeColor, index) => {
          const selected = schemeColor?.name === selectedColorScheme?.name;

          return (
            <div
              key={index}
              className={cx(
                "flex rounded-lg overflow-hidden max-w-full cursor-pointer",
                selected && "ring-2 ring-purple-500  ring-offset-2"
              )}
              onClick={() => dispatch(setSelectedColorScheme(schemeColor))}
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
