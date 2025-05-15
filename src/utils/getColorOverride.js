export const getColorOverride = (
  schemeColor,
  isOverrideSchemeColor,
  colorOverride,
  fallbackColor
) => {
  if (!schemeColor && colorOverride) return colorOverride; // kondisi 3
  if (schemeColor && isOverrideSchemeColor && colorOverride)
    return colorOverride; // kondisi 1
  return fallbackColor; // kondisi 2
};
