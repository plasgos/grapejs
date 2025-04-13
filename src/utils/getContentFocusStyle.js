import clsx from "clsx";

export const getContentFocusStyle = (isFocusContent, id) =>
  clsx({
    "ring-2 ring-purple-600 bg-orange-100 transition-all duration-300 ease-in-out ":
      isFocusContent === id,
  });
