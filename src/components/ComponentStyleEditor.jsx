import EditorButton from "./editor-block/button";
import EditorCheckoutForm from "./editor-block/checkout-form";
import EditorCountdown from "./editor-block/countdown";
import EditorDivider from "./editor-block/divider";
import EditorContentShowcase from "./editor-block/editor-showcase-content";
import EditorCTA from "./editor-block/EditorCTA";
import EditorEmptySpace from "./editor-block/empty-space";
import EditorFAQ from "./editor-block/faq";
import EditorFeatureHighlights from "./editor-block/feature-highlights";
import EditorFloatingButton from "./editor-block/floating-button";
import EditorFloatingButtonCircle from "./editor-block/floating-button-circle";
import EditorFooter from "./editor-block/footer";
import EditorHeroSection from "./editor-block/hero-section";
import EditorImage from "./editor-block/image";
import EditorListImages from "./editor-block/list-images";
import EditorModalPopup from "./editor-block/modal-popup";
import EditorBlurText from "./editor-block/pro-version/blur-text";
import EditorCountUp from "./editor-block/pro-version/count-up";
import EditorFuzzyText from "./editor-block/pro-version/fuzzy-text";
import EditorGalleryMasonry from "./editor-block/pro-version/gallery-masonry";
import EditorGlitchText from "./editor-block/pro-version/glitch-text";
import EditorScrollVelocity from "./editor-block/pro-version/scroll-velocity";
import EditorSplitText from "./editor-block/pro-version/split-text";
import EditorQuote from "./editor-block/quote";
import EditorSliderImages from "./editor-block/slider-images";
import EditorTestimony from "./editor-block/testimony";
import EditorVideo from "./editor-block/video";
import EditorVideoText from "./editor-block/video-text-banner";

const ComponentStyleEditor = ({ selectedComponent }) => {
  return (
    <div className="">
      {selectedComponent.get("type") === "split-text" && (
        <EditorSplitText selectedComponent={selectedComponent} />
      )}
      {selectedComponent.get("type") === "blur-text" && (
        <EditorBlurText selectedComponent={selectedComponent} />
      )}
      {selectedComponent.get("type") === "fuzzy-text" && (
        <EditorFuzzyText selectedComponent={selectedComponent} />
      )}
      {selectedComponent.get("type") === "glitch-text" && (
        <EditorGlitchText selectedComponent={selectedComponent} />
      )}

      {selectedComponent.get("type") === "scroll-velocity-text" && (
        <EditorScrollVelocity selectedComponent={selectedComponent} />
      )}
      {selectedComponent.get("type") === "gallery-masonry" && (
        <EditorGalleryMasonry selectedComponent={selectedComponent} />
      )}
      {selectedComponent.get("type") === "count-up-text" && (
        <EditorCountUp selectedComponent={selectedComponent} />
      )}
      {selectedComponent.get("type") === "marque-images" && (
        <EditorCountUp selectedComponent={selectedComponent} />
      )}

      {/* ======================================================== */}

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
      {selectedComponent.get("type") === "feature-highlights" && (
        <EditorFeatureHighlights selectedComponent={selectedComponent} />
      )}

      {selectedComponent.get("type") === "faq" && (
        <EditorFAQ selectedComponent={selectedComponent} />
      )}
      {selectedComponent.get("type") === "testimony" && (
        <EditorTestimony selectedComponent={selectedComponent} />
      )}
      {selectedComponent.get("type") === "divider" && (
        <EditorDivider selectedComponent={selectedComponent} />
      )}
      {selectedComponent.get("type") === "empty-space" && (
        <EditorEmptySpace selectedComponent={selectedComponent} />
      )}
      {selectedComponent.get("type") === "checkout-form" && (
        <EditorCheckoutForm selectedComponent={selectedComponent} />
      )}
      {selectedComponent.get("type") === "footer" && (
        <EditorFooter selectedComponent={selectedComponent} />
      )}
    </div>
  );
};

export default ComponentStyleEditor;
