import EditorButton from "./editor-block/button";
import EditorCountdown from "./editor-block/countdown";
import EditorContentShowcase from "./editor-block/editor-showcase-content";
import EditorCTA from "./editor-block/EditorCTA";
import EditorFloatingButton from "./editor-block/floating-button";
import EditorFloatingButtonCircle from "./editor-block/floating-button-circle";
import EditorHeroSection from "./editor-block/hero-section";
import EditorImage from "./editor-block/image";
import EditorListImages from "./editor-block/list-images";
import EditorModalPopup from "./editor-block/modal-popup";
import EditorQuote from "./editor-block/quote";
import EditorSliderImages from "./editor-block/slider-images";
import EditorVideo from "./editor-block/video";
import EditorVideoText from "./editor-block/video-text-banner";

const ComponentStyleEditor = ({ selectedComponent }) => {
  return (
    <div className="">
      {selectedComponent.get("type") === "call-to-action" && (
        <EditorCTA selectedComponent={selectedComponent} />
      )}

      {selectedComponent.get("type") === "content-showcase" && (
        <EditorContentShowcase selectedComponent={selectedComponent} />
      )}

      {selectedComponent.get("type") === "modal-popup" && (
        <EditorModalPopup selectedComponent={selectedComponent} />
      )}

      {selectedComponent.get("type") === "image-content" && (
        <EditorImage selectedComponent={selectedComponent} />
      )}

      {selectedComponent.get("type") === "list-images" && (
        <EditorListImages selectedComponent={selectedComponent} />
      )}
      {selectedComponent.get("type") === "video-content" && (
        <EditorVideo selectedComponent={selectedComponent} />
      )}
      {selectedComponent.get("type") === "video-text-banner" && (
        <EditorVideoText selectedComponent={selectedComponent} />
      )}
      {selectedComponent.get("type") === "hero-section" && (
        <EditorHeroSection selectedComponent={selectedComponent} />
      )}

      {selectedComponent.get("type") === "floating-button-circle" && (
        <EditorFloatingButtonCircle selectedComponent={selectedComponent} />
      )}

      {selectedComponent.get("type") === "floating-button" && (
        <EditorFloatingButton selectedComponent={selectedComponent} />
      )}

      {selectedComponent.get("type") === "button-content" && (
        <EditorButton selectedComponent={selectedComponent} />
      )}

      {selectedComponent.get("type") === "slider-images" && (
        <EditorSliderImages selectedComponent={selectedComponent} />
      )}

      {selectedComponent.get("type") === "quotes" && (
        <EditorQuote selectedComponent={selectedComponent} />
      )}
      {selectedComponent.get("type") === "countdown" && (
        <EditorCountdown selectedComponent={selectedComponent} />
      )}
    </div>
  );
};

export default ComponentStyleEditor;
