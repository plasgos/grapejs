import { useState } from "react";
import { produce } from "immer";

export const useChangeWrapperStyles = (selectedComponent) => {
  const customComponent = selectedComponent?.get("customComponent");

  const [wrapperStyle, setWrapperStyle] = useState(
    customComponent.wrapperStyle
  );

  const handleStylesChange = (key, value) => {
    //update local state editor
    setWrapperStyle((prevStyles) => ({
      ...prevStyles,
      [key]: value,
    }));

    //update grapejs canvas component
    selectedComponent?.set(
      "customComponent",
      produce(selectedComponent?.get("customComponent"), (draft) => {
        draft.wrapperStyle[key] = value;
      })
    );
  };

  return {
    wrapperStyle,
    handleStylesChange,
  };
};
