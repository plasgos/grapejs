export function darkenRgbaColor(color, amount = 0.2) {
  const factor = 1 - amount;

  const darken = (value) =>
    Math.max(0, Math.min(255, Math.floor(value * factor)));

  // HEX (#RRGGBB or #RGB)
  if (/^#([0-9a-f]{3}){1,2}$/i.test(color)) {
    let hex = color.slice(1);
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    const red = darken(r);
    const green = darken(g);
    const blue = darken(b);

    const toHex = (val) => val.toString(16).padStart(2, "0");
    return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
  }

  // RGBA or RGB
  const match = color.match(
    /rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\s*\)/
  );

  if (match) {
    const [, r, g, b, a] = match;
    const red = darken(parseInt(r));
    const green = darken(parseInt(g));
    const blue = darken(parseInt(b));
    const alpha = a !== undefined ? parseFloat(a) : undefined;

    return alpha !== undefined
      ? `rgba(${red}, ${green}, ${blue}, ${alpha})`
      : `rgb(${red}, ${green}, ${blue})`;
  }

  // Return original if format not recognized
  return color;
}
