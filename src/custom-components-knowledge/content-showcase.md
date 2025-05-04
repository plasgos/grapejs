# Komponen: content-showcase

Komponen ini digunakan untuk menampilkan beberapa konten dalam bentuk showcase atau highlight. Cocok digunakan untuk bagian seperti artikel, produk, atau fitur unggulan,tampilkan minimal 3 object di dalam contents []

---

## Struktur `attributes`

```json
{
  "isLocked": false,
  "scrollTarget": undefined,
  "contents": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
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
    "aspectRatio": "number (float)"
  }
}
```
