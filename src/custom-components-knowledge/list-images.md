# Komponen: list-images

Komponen ini digunakan untuk menampilkan beberapa konten dalam bentuk list gambar. Cocok digunakan untuk bagian seperti menampilkan list gambar misal list kurir, logo-logo brand dan lain lain
tampilkan minimal 3 gambar

---

## Struktur `attributes`

```json
{
  "isLocked": false,
  "scrollTarget": undefined,
  "contents": [
    {
      "id": "string",
      "image": "string (URL)",
      "target": {
        "actionType": "link",
        "options": {
          "isOpenNewTab": true,
          "link": "string (URL)",
          "type": "url"
        }
      }
    }
  ],
  "wrapperStyle": {
    "column": "string (1 - 6)",
    "aspectRatio": "number (float)",
    "titleColor": "string (rgba)",
    "fontWeight": "string (e.g. font-semibold)",
    "descriptionColor": "string (rgba)",
    "fontSizeTitle": "string (e.g. tw-text-sm)",
    "imagePosition": "string (e.g. center)",
    "fontFamily": "string",
    "fontSize": "number",
    "textAligment": "string (e.g. text-center)"
  }
}
```
