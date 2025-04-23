import { useEditor } from "@grapesjs/react";
import SelectOptions from "./editor-block/_components/SelectOptions";
import { widthPageOptions } from "./SelectOptions";
import { useEffect } from "react";
import { useState } from "react";
import ColorPicker from "./editor-block/_components/ColorPicker";

const GlobalStyles = () => {
  const editor = useEditor();
  const editorModel = editor.getModel();

  // State untuk menyimpan globalOptions agar bisa re-render otomatis
  const [globalOptions, setGlobalOptions] = useState(
    editorModel.get("globalOptions") || {}
  );
  useEffect(() => {
    const updateGlobalOptions = () => {
      setGlobalOptions({ ...(editorModel.get("globalOptions") || {}) });
    };

    // Listen perubahan globalOptions di editorModel
    editorModel.on("change:globalOptions", updateGlobalOptions);

    return () => {
      editorModel.off("change:globalOptions", updateGlobalOptions);
    };
  }, [editorModel]);

  const handleChangeWidthPage = (value) => {
    // Update globalOptions di editorModel
    editorModel.set("globalOptions", {
      ...globalOptions,
      maxWidthPage: value,
    });
  };

  const changeBackgroundColor = (color) => {
    editorModel.set("globalOptions", {
      ...globalOptions,
      bgColor: color,
    });

    const wrapper = editor.getWrapper();

    if (wrapper) {
      wrapper.addStyle({
        "background-color": color, // Mengganti background color
      });
    }
  };

  return (
    <div className="p-5 flex flex-col gap-y-5 rounded-lg bg-white">
      <SelectOptions
        label="Width Page"
        options={widthPageOptions}
        value={globalOptions.maxWidthPage}
        onChange={(value) => handleChangeWidthPage(value)}
      />

      <ColorPicker
        label="Background Color"
        value={globalOptions.bgColor}
        onChange={(color) => changeBackgroundColor(color)}
      />
    </div>
  );
};

export default GlobalStyles;
