import { produce } from "immer";

function getFallbackColorsByType(type, index, schemeColor) {
  const safe = (color) => (color ? `#${color}` : "");
  const colours = schemeColor?.colours?.[index] || {};

  switch (type) {
    case "navbar":
      return {
        headingColor: safe(colours.primary),
        menuBgColor: safe(colours.background),
        bgColorSidebar: safe(colours.background),
        descriptionColor: safe(colours.secondary),
      };
    case "hero-section":
      return {
        textBannerColor: safe(colours.primary),
        btnColor: safe(colours.primary),
        // textColor: "#000000",
      };
    case "content-showcase":
      return {
        titleColor: safe(colours.primary),
        descriptionColor: safe(colours.secondary),
      };
    case "feature-highlights":
      return {
        titleColor: safe(colours.primary),
      };
    case "testimony":
      return {
        headerColor: safe(colours.primary),
        quoteColor: safe(colours.primary),
        descriptionColor: safe(colours.primary),
        nameColor: safe(colours.primary),
        profectionColor: safe(colours.secondary),
        authorColor: safe(colours.secondary),
      };
    case "footer":
      return {
        headingColor: safe(colours.primary),
        subHeadingColor: safe(colours.secondary),
      };
    default:
      return {
        titleColor: safe(colours.primary) || "#000000",
      };
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
      if (fallbackColors[key]) {
        obj[key] = fallbackColors[key];
      } else {
        // fallback default kalau tidak ada di fallbackColors
        obj[key] = "";
      }
    }
  }
}

const colorKeysToKeep = [
  "bgColor",
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

export const onSyncSchemeColor = (editor, schemeColorValue) => {
  const components = editor?.getComponents().models;
  components.forEach((component, index) => {
    const type = component.get("type");

    const customComponent = component.get("customComponent") || {};

    const updatedCustomComponent = produce(customComponent, (draft) => {
      resetColorValuesWithExclusion(draft);

      const fallbackColors = getFallbackColorsByType(
        type,
        index,
        schemeColorValue
      );

      applyFallbackColors(draft, fallbackColors);
    });

    component.set("customComponent", updatedCustomComponent);
  });
};
