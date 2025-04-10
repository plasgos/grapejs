import { googleFonts } from "@/lib/googleFonts";
import { googleFontTest } from "@/lib/googleFontTest";

export function generateGoogleFontsImportWithWeights(json) {
  if (!json || !json.items) return "";

  const families = json.items.map((item) => {
    const familyName = item.family.replace(/\s+/g, "+");
    const weights = (item.variants || [])
      .map((v) => v.match(/^\d+/)) // ambil angka dari awal string
      .filter(Boolean) // buang null
      .map((match) => match[0]); // ambil nilai hasil match

    const uniqueWeights = [...new Set(weights)].sort((a, b) => a - b);

    if (uniqueWeights.length > 0) {
      return `family=${familyName}:wght@${uniqueWeights.join(";")}`;
    } else {
      return `family=${familyName}`;
    }
  });

  return `@import url("https://fonts.googleapis.com/css2?${families.join(
    "&"
  )}&display=swap");`;
}

// export function generateGoogleFontsImportWithWeights(json) {
//   if (!json || !json.items) return "";

//   const families = json.items.map((item) => {
//     const familyName = item.family.replace(/\s+/g, "+");
//     const variants = item.variants || [];

//     // Menyusun kombinasi untuk italic dan weight
//     const styles = {
//       regular: { ital: 0, wght: 400 },
//       italic: { ital: 1, wght: 400 },
//       100: { ital: 0, wght: 100 },
//       "100italic": { ital: 1, wght: 100 },
//       200: { ital: 0, wght: 200 },
//       "200italic": { ital: 1, wght: 100 },
//       300: { ital: 0, wght: 300 },
//       "300italic": { ital: 1, wght: 300 },
//       500: { ital: 0, wght: 500 },
//       "500italic": { ital: 1, wght: 500 },
//       600: { ital: 0, wght: 600 },
//       "600italic": { ital: 1, wght: 600 },
//       700: { ital: 0, wght: 700 },
//       "700italic": { ital: 1, wght: 700 },
//       800: { ital: 0, wght: 800 },
//       "800italic": { ital: 1, wght: 800 },
//       900: { ital: 0, wght: 900 },
//       "900italic": { ital: 1, wght: 900 },
//     };

//     const selectedStyles = variants
//       .map((variant) => styles[variant])
//       .filter(Boolean);

//     // Jika hanya ada 'regular' saja
//     if (variants.length === 1 && variants[0] === "regular") {
//       return `family=${familyName}:wght@400`;
//     }

//     // Gabungkan semua kombinasi menjadi format yang benar
//     const combinations = [];

//     selectedStyles.forEach((style) => {
//       const key = `${style.ital},${style.wght}`;
//       if (!combinations.includes(key)) {
//         combinations.push(key);
//       }
//     });

//     // Urutkan kombinasi untuk memastikan urutan yang benar
//     combinations.sort((a, b) => {
//       const [italA, wghtA] = a.split(",");
//       const [italB, wghtB] = b.split(",");
//       return italA - italB || wghtA - wghtB;
//     });

//     // Gabungkan kombinasi dalam format yang benar
//     const finalCombination = combinations.join(";");

//     return `family=${familyName}:ital,wght@${finalCombination}`;
//   });

//   return `@import url('https://fonts.googleapis.com/css2?${families.join(
//     "&"
//   )}&display=swap');`;
// }

export const injectGoogleFonts = (editor) => {
  const googleFontsImport = generateGoogleFontsImportWithWeights(googleFonts);

  // const googleFontsImport =
  //   generateGoogleFontsImportWithWeights(googleFontTest);

  console.log("🚀 ~ injectGoogleFonts ~ googleFontsImport:", googleFontsImport);

  // Inject ke iframe canvas
  const iframe = editor.Canvas.getDocument();
  const styleEl = iframe.createElement("style");
  styleEl.innerText = googleFontsImport;
  iframe.head.appendChild(styleEl);

  // (Optional) Inject ke panel editor jika ingin tampil di kedua tempat
  const styleGlobal = document.createElement("style");
  styleGlobal.innerText = googleFontsImport;
  document.head.appendChild(styleGlobal);
};
