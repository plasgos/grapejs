import { useEffect, useState } from "react";

export const useResponsiveViewFontSize = (editor, fontSize) => {
  const [responsiveFontSize, setResponsiveFontSize] = useState(fontSize);

  useEffect(() => {
    const baseFontSize = typeof fontSize === "number" ? fontSize : 16;

    const handleResize = () => {
      const wrapper = editor.getWrapper();
      const wrapperDomEl = wrapper.view?.el;
      const width = wrapperDomEl?.clientWidth || 0;

      const isMobile = width <= 768;
      const adjustedFontSize =
        isMobile && baseFontSize > 64 ? baseFontSize * 0.5 : baseFontSize;

      setResponsiveFontSize(adjustedFontSize);
    };

    handleResize(); // panggil langsung saat mount

    const iframe = editor?.Canvas.getFrameEl();
    const iframeWindow = iframe?.contentWindow;
    if (!iframeWindow) return;

    iframeWindow.addEventListener("resize", handleResize);

    return () => {
      iframeWindow.removeEventListener("resize", handleResize);
    };
  }, [editor, fontSize]);

  return {
    responsiveFontSize,
  };
};
