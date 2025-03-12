import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// Menghapus unit dan mengembalikan nilai numerik
export const parseCSSValue = (value) => {
  return typeof value === "string" ? parseFloat(value) : value;
};

// Menambahkan unit ke nilai numerik
export const toCSSValue = (value, unit = "px") => {
  return typeof value === "number" ? `${value}${unit}` : value;
};

export const parseRGBA = (rgba) => {
  // Default value jika parsing gagal
  const defaultResult = {
    r: "0", // Default red value
    g: "0", // Default green value
    b: "0", // Default blue value
    a: "1", // Default alpha value (fully opaque)
  };

  // Jika parameter sudah berupa objek rgba, langsung kembalikan
  if (
    typeof rgba === "object" &&
    rgba !== null &&
    "r" in rgba &&
    "g" in rgba &&
    "b" in rgba &&
    "a" in rgba
  ) {
    return rgba;
  }

  // Jika parameter berupa string, coba parsing
  if (typeof rgba === "string") {
    // Regex untuk mencocokkan format rgba atau rgb (tanpa spasi atau dengan spasi)
    const regex =
      /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d*\.?\d+)\s*\)$/;

    const match = rgba.match(regex);

    if (match) {
      return {
        r: match[1],
        g: match[2],
        b: match[3],
        a: match[4],
      };
    }
  }

  // Jika parsing gagal, kembalikan nilai default agar tidak error
  return defaultResult;
};
