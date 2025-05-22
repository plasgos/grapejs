import ColorPalettesOptions from "@/components/theme-colors/ColorPalettesOptions";
import { useGlobalOptions } from "@/hooks/useGlobalOptions";
import { onSyncSchemeColor } from "@/utils/onSyncSchemeColor";
import { useEditor } from "@grapesjs/react";
import ColorPicker from "../../editor-block/_components/ColorPicker";
import SelectOptions from "../../editor-block/_components/SelectOptions";
import { widthPageOptions } from "../../SelectOptions";
import { produce } from "immer";
import { schemeColours } from "@/components/theme-colors";

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

  const handleChangeSchemeColor = (valueName) => {
    const schemeColorValue = schemeColours.find(
      (schemeColor) => schemeColor.name === valueName
    );

    updateGlobalOptions({
      schemeColor: valueName,
      bgColor: schemeColorValue.baseColor,
    });

    onSyncSchemeColor(editor, schemeColorValue);

    if (wrapper) {
      wrapper.addStyle({
        "background-color": schemeColorValue.baseColor,
      });
    }
  };

  const onResetSchemeColor = () => {
    updateGlobalOptions({
      schemeColor: null,
      bgColor: "",
    });

    const colorKeysToKeep = [
      // "bgColor",
      "borderColor",
      "quoteColor",
      "starsColor",
      "daysColor",
      "hoursColor",
      "minutesColor",
      "secondsColor",
      "color",
    ];
    function resetColorValuesWithExclusion(obj) {
      const normalizedKeepKeys = colorKeysToKeep.map((k) => k.toLowerCase());

      if (Array.isArray(obj)) {
        obj.forEach((item) => resetColorValuesWithExclusion(item));
        return;
      }

      for (const key in obj) {
        const value = obj[key];

        if (typeof value === "object" && value !== null) {
          resetColorValuesWithExclusion(value);
        } else if (
          key.toLowerCase().includes("color") &&
          !normalizedKeepKeys.includes(key.toLowerCase())
        ) {
          obj[key] = "";
        }
      }
    }

    const components = editor?.getComponents().models;
    components.forEach((component) => {
      const customComponent = component.get("customComponent") || {};

      const updatedCustomComponent = produce(customComponent, (draft) => {
        resetColorValuesWithExclusion(draft);
      });

      component.set("customComponent", updatedCustomComponent);
    });

    if (wrapper) {
      wrapper.addStyle({
        "background-color": "",
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
        onResetSchemeColor={onResetSchemeColor}
      />
    </div>
  );
};

export default GlobalStyles;
