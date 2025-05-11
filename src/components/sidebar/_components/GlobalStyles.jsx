import ColorPalettesOptions from "@/components/theme-colors/ColorPalettesOptions";
import { useGlobalOptions } from "@/hooks/useGlobalOptions";
import { useEditor } from "@grapesjs/react";
import ColorPicker from "../../editor-block/_components/ColorPicker";
import SelectOptions from "../../editor-block/_components/SelectOptions";
import { widthPageOptions } from "../../SelectOptions";

const GlobalStyles = () => {
  const editor = useEditor();

  const [globalOptions, updateGlobalOptions] = useGlobalOptions(editor);

  const wrapper = editor.getWrapper();

  const handleChangeWidthPage = (value) => {
    updateGlobalOptions({
      maxWidthPage: value,
    });
  };

  const changeBackgroundColor = (color) => {
    updateGlobalOptions({
      bgColor: color,
    });

    if (wrapper) {
      wrapper.addStyle({
        "background-color": color,
      });
    }
  };

  const handleChangeSchemeColor = (value) => {
    updateGlobalOptions({
      schemeColor: value,
      bgColor: value.baseColor,
    });

    if (wrapper) {
      wrapper.addStyle({
        "background-color": value.baseColor,
      });
    }
  };

  return (
    <div className="p-5 flex flex-col gap-y-5 rounded-lg bg-white">
      <SelectOptions
        label="Max Width Page"
        options={widthPageOptions}
        value={globalOptions.maxWidthPage}
        onChange={(value) => handleChangeWidthPage(value)}
      />

      <ColorPicker
        label="Base Background Color"
        value={globalOptions.bgColor}
        onChange={(color) => changeBackgroundColor(color)}
      />

      <ColorPalettesOptions
        label="Color Palettes"
        value={globalOptions.schemeColor}
        onChange={(value) => handleChangeSchemeColor(value)}
      />
    </div>
  );
};

export default GlobalStyles;
