export const widthPageOptions = [
  {
    label: "Small",
    options: [
      { value: 400, label: "400px" },
      { value: 520, label: "520px" },
      { value: 640, label: "640px" },
    ],
  },
  {
    label: "Medium",
    options: [
      { value: 800, label: "800px" },
      { value: 900, label: "900px" },
      { value: 1024, label: "1024px" },
      { value: 1280, label: "1280px" },
    ],
  },
  {
    label: "Large",
    options: [
      { value: 1360, label: "1360px" },
      { value: 1440, label: "1440px" },
      { value: 1600, label: "1600px" },
      { value: 1920, label: "1920px" },
    ],
  },
];

export const shadowOptions = [
  { label: "None", value: "shadow-none" },
  {
    label: "Shadow Small",
    value: "shadow-sm",
  },
  { label: "Shadow", value: "shadow" },

  {
    label: "Shadow Medium",
    value: "shadow-md",
  },
  {
    label: "Shadow Large",
    value: "shadow-lg",
  },
  {
    label: "Shadow Extra Large",
    value: "shadow-xl",
  },
  { label: "Shadow Blur", value: "shadow-2xl" },
  { label: "Shadow Inner", value: "shadow-inner" },
];

export const aspectRatioOptions = [
  {
    label: "Kotak",
    options: [{ value: 1 / 1, label: "1:1" }],
  },
  {
    label: "Melebar",
    options: [
      { value: 5 / 4, label: "5:4" },
      { value: 4 / 3, label: "4:3" },
      { value: 5 / 3, label: "5:3" },
      { value: 2 / 1, label: "2:1" },
    ],
  },
  {
    label: "Potret",
    options: [
      { value: 4 / 5, label: "4:5" },
      { value: 3 / 4, label: "3:4" },
      { value: 3 / 5, label: "3:5" },
      { value: 1 / 2, label: "1:2" },
    ],
  },
];

export const maxColumnOptions = [
  {
    value: "2",
    label: "2",
  },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
];

export const aspectRatioVideoOptions = [
  {
    label: "Kotak",
    options: [{ value: 1 / 1, label: "1:1" }], // 1:1
  },
  {
    label: "Melebar",
    options: [
      { value: 4 / 3, label: "4:3" }, // 4:3
      { value: 16 / 9, label: "16:9" }, // 16:9
    ],
  },
  {
    label: "Potret",
    options: [
      { value: 4 / 5, label: "4:5" }, // 4:5
      { value: 2 / 3, label: "2:3" }, // 2:3
      { value: 9 / 16, label: "9:16" }, // 9:16
    ],
  },
];

export const textShadowOptions = [
  { value: null, label: "None" },
  { value: "1px 1px 2px rgba(0, 0, 0, 0.2)", label: "Light" },
  { value: "2px 2px 4px rgba(0, 0, 0, 0.5)", label: "Medium" },
  { value: "3px 3px 6px rgba(0, 0, 0, 0.7)", label: "Dark" },
];
