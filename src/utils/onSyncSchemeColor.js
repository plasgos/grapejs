import { produce } from "immer";

function getFallbackColorsByType(type, colours) {
  const safe = (color) => (color ? `#${color}` : "");

  const base = {
    bgType: "bgColor",
    bgColor: safe(colours?.background),
  };

  switch (type) {
    case "navbar":
      return {
        ...base,
        headingColor: safe(colours.primary),
        menuBgColor: safe(colours.background),
        bgColorSidebar: safe(colours.background),
        descriptionColor: safe(colours.secondary),
      };
    case "split-text":
      return {
        ...base,
        colorSplitText: safe(colours.primary),
        bgType: "bgColor",
        bgColor: safe(colours.background),
      };
    case "blur-text":
      return {
        ...base,
        colorBlurText: safe(colours.primary),
      };
    case "fuzzy-text":
      return {
        ...base,
        colorFuzzyText: safe(colours.primary),
      };
    case "glitch-text":
      return {
        ...base,
        colorGlitchText: safe(colours.primary),
      };
    case "scroll-velocity-text":
      return {
        ...base,
        colorVelocity: safe(colours.primary),
      };
    case "hero-section":
      return {
        ...base,
        textBannerColor: safe(colours.primary),
        btnColor: safe(colours.primary),
        textColor: safe(colours.background),
      };
    case "button-content":
      return {
        ...base,
        btnColor: safe(colours.primary),
        textColor: safe(colours.background),
      };
    case "video-text-banner":
      return {
        ...base,
        textBannerColor: safe(colours.primary),
        btnColor: safe(colours.primary),
        // textColor: "#000000",
      };
    case "quotes":
      return {
        ...base,
        quoteTextColor: safe(colours.primary),
        quoteTagColor: safe(colours.primary),
        writerColor: safe(colours.secondary),
        // textColor: "#000000",
      };
    case "content-showcase":
      return {
        ...base,
        titleColor: safe(colours.primary),
        descriptionColor: safe(colours.secondary),
      };
    case "feature-highlights":
      return {
        ...base,
        titleColor: safe(colours.primary),
      };
    case "business-overview":
      return {
        ...base,
        colorRangeValue: safe(colours.primary),
        colorOverview: safe(colours.primary),
      };
    case "countdown":
      return {
        ...base,
        textColor: safe(colours.primary),
      };
    case "faq":
      return {
        ...base,
        colorTitle: safe(colours.primary),
        iconColor: safe(colours.primary),
        descriptionColor: safe(colours.primary),
      };
    case "testimony":
      return {
        ...base,
        headerColor: safe(colours.primary),
        cardColor: safe(colours.background),
        quoteColor: safe(colours.primary),
        descriptionColor: safe(colours.primary),
        nameColor: safe(colours.primary),
        profectionColor: safe(colours.secondary),
      };
    case "footer":
      return {
        ...base,
        headingColor: safe(colours.primary),
        subHeadingColor: safe(colours.secondary),
        copyrightTextColor: safe(colours.secondary),
      };
    case "checkout-form":
      return {
        ...base,
        titleColor: safe(colours.primary),
        labelColor: safe(colours.primary),
        inputColor: safe(colours.secondary),
      };
    default:
      return {
        ...base,
      };
  }
}

function applyFallbackColors(obj, fallbackColors) {
  const allowedKeys = ["bgType", "bgColor"];

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
      key.toLowerCase().includes("color") ||
      (allowedKeys.includes(key) && (!obj[key] || obj[key] === "")) // hanya set jika kosong
    ) {
      if (
        fallbackColors?.[key] !== undefined &&
        fallbackColors?.[key] !== null
      ) {
        obj[key] = fallbackColors[key];
      }
    }
  }
}

export const onSyncSchemeColor = (editor, schemeColorValue) => {
  const components = editor?.getComponents().models;

  components.forEach((component, index) => {
    const type = component.get("type");

    const isLastIndexComponent = index === components.length - 1;
    const selectedColours = schemeColorValue?.colours || [];
    const schemaColorLastIndex =
      schemeColorValue?.colours[schemeColorValue?.colours.length - 1];

    const colorIndex = (() => {
      if (isLastIndexComponent) return null; // nanti pakai schemaColorLastIndex
      if (index < selectedColours.length - 1) return index;
      return selectedColours.length - 2; // pakai warna sebelum terakhir
    })();

    const colours = isLastIndexComponent
      ? schemaColorLastIndex
      : selectedColours[colorIndex];

    const customComponent = component.get("customComponent") || {};

    const updatedCustomComponent = produce(customComponent, (draft) => {
      const fallbackColors = getFallbackColorsByType(type, colours);

      applyFallbackColors(draft, fallbackColors);
    });
    component.set("customComponent", updatedCustomComponent);
  });
};
