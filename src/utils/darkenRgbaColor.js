export function darkenRgbaColor(rgba, amount = 0.2) {
  const match = rgba.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)/
  );

  if (!match) {
    return rgba;
  }

  let [_, r, g, b, a] = match;
  const factor = 1 - amount;

  const darken = (value) =>
    Math.max(0, Math.min(255, Math.floor(value * factor)));

  const red = darken(parseInt(r));
  const green = darken(parseInt(g));
  const blue = darken(parseInt(b));
  const alpha = a !== undefined ? parseFloat(a) : 1;

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
