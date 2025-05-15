import ColorPalettesOptions from "@/components/theme-colors/ColorPalettesOptions";
import { useGlobalOptions } from "@/hooks/useGlobalOptions";
import { useEditor } from "@grapesjs/react";
import ColorPicker from "../../editor-block/_components/ColorPicker";
import SelectOptions from "../../editor-block/_components/SelectOptions";
import { widthPageOptions } from "../../SelectOptions";
import { produce } from "immer";

function getFallbackColorsByType(type, index, schemeColor) {
  const safe = (color) => (color ? `#${color}` : "");
  const colours = schemeColor?.colours?.[index] || {};

  switch (type) {
    case "content-showcase":
      return {
        headerColor: safe(colours.primary),
        descriptionColor: safe(colours.secondary),
      };
    case "testimony":
      return {
        quoteColor: safe(colours.primary) || "#444444",
        authorColor: safe(colours.secondary) || "#666666",
      };

    default:
      return {
        titleColor: safe(colours.primary) || "#000000",
      };
  }
}

const GlobalStyles = () => {
  const editor = useEditor();

  const [globalOptions, updateGlobalOptions] = useGlobalOptions(editor);

  const { schemeColor } = globalOptions;
  console.log("🚀 ~ GlobalStyles ~ schemeColor:", schemeColor);

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

  const colorKeysToKeep = [
    "bgColor",
    "borderColor",
    "quoteColor",
    "starsColor",
  ];
  function resetColorValuesWithExclusion(obj) {
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
        !colorKeysToKeep.includes(key)
      ) {
        obj[key] = "";
      }
    }
  }

  function applyFallbackColors(obj, fallbackColors) {
    if (Array.isArray(obj)) {
      obj.forEach((item) => applyFallbackColors(item, fallbackColors));
      return;
    }
    if (typeof obj !== "object" || obj === null) return;

    for (const key in obj) {
      const value = obj[key];

      if (typeof value === "object" && value !== null) {
        applyFallbackColors(value, fallbackColors);
      } else if (
        key.toLowerCase().includes("color") &&
        (!obj[key] || obj[key] === "") // hanya set jika kosong
      ) {
        // contoh: fallbackColors bisa punya key sama dengan key properti
        // atau kamu perlu mapping manual, misal:
        // if key === 'titleColor' => fallbackColors.titlePrimary, dsb.

        if (fallbackColors[key]) {
          obj[key] = fallbackColors[key];
        } else {
          // fallback default kalau tidak ada di fallbackColors
          obj[key] = "";
        }
      }
    }
  }

  const components = editor?.getComponents().models;

  const handleChangeSchemeColor = (schemeColorValue) => {
    updateGlobalOptions({
      schemeColor: schemeColorValue,
      bgColor: schemeColorValue.baseColor,
    });

    components.forEach((component, index) => {
      const type = component.get("type");

      const customComponent = component.get("customComponent") || {};

      const updatedCustomComponent = produce(customComponent, (draft) => {
        resetColorValuesWithExclusion(draft);
        // draft.isOverrideSchemeColor = false;

        let fallbackColors = {};

        if (type === "content-showcase") {
          fallbackColors = {
            titleColor: `#${
              schemeColorValue.colours[index]?.primary || "000000"
            }`,
            descriptionColor: `#${
              schemeColorValue.colours[index]?.secondary || "333333"
            }`,
          };
        }

        applyFallbackColors(draft, fallbackColors);
      });

      component.set("customComponent", updatedCustomComponent);
    });

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
