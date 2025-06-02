import EditorText from "@/components/editor-block/text";
import EditorButton from "../../editor-block/button";
import EditorCheckoutForm from "../../editor-block/checkout-form";
import EditorCountdown from "../../editor-block/countdown";
import EditorDivider from "../../editor-block/divider";
import EditorContentShowcase from "../../editor-block/editor-showcase-content";
import EditorCTA from "../../editor-block/EditorCTA";
import EditorEmptySpace from "../../editor-block/empty-space";
import EditorFAQ from "../../editor-block/faq";
import EditorFeatureHighlights from "../../editor-block/feature-highlights";
import EditorFloatingButton from "../../editor-block/floating-button";
import EditorFloatingButtonCircle from "../../editor-block/floating-button-circle";
import EditorFooter from "../../editor-block/footer";
import EditorHeroSection from "../../editor-block/hero-section";
import EditorImage from "../../editor-block/image";
import EditorListImages from "../../editor-block/list-images";
import EditorModalPopup from "../../editor-block/modal-popup";
import EditorNavbar from "../../editor-block/navbar";
import EditorBlurText from "../../editor-block/pro-version/blur-text";
import EditorBusinessOverview from "../../editor-block/pro-version/business-overview";
import EditorFuzzyText from "../../editor-block/pro-version/fuzzy-text";
import EditorGalleryMasonry from "../../editor-block/pro-version/gallery-masonry";
import EditorGlitchText from "../../editor-block/pro-version/glitch-text";
import EditorMarqueeImages from "../../editor-block/pro-version/marquee-images";
import EditorScrollVelocity from "../../editor-block/pro-version/scroll-velocity";
import EditorSplitText from "../../editor-block/pro-version/split-text";
import EditorQuote from "../../editor-block/quote";
import EditorSliderImages from "../../editor-block/slider-images";
import EditorTestimony from "../../editor-block/testimony";
import EditorVideo from "../../editor-block/video";
import EditorVideoText from "../../editor-block/video-text-banner";
import EditorMaps from "@/components/editor-block/maps";

const ComponentStyleEditor = ({ selectedComponent }) => {
  if (!selectedComponent) {
    return null;
  }

  const renderEditorComponent = () => {
    if (!selectedComponent) return null;

    const type = selectedComponent.get("type");

    switch (type) {
      case "navbar":
        return <EditorNavbar selectedComponent={selectedComponent} />;

      case "split-text":
        return <EditorSplitText selectedComponent={selectedComponent} />;

      case "custom-text":
        return <EditorText selectedComponent={selectedComponent} />;

      case "blur-text":
        return <EditorBlurText selectedComponent={selectedComponent} />;

      case "fuzzy-text":
        return <EditorFuzzyText selectedComponent={selectedComponent} />;

      case "glitch-text":
        return <EditorGlitchText selectedComponent={selectedComponent} />;

      case "scroll-velocity-text":
        return <EditorScrollVelocity selectedComponent={selectedComponent} />;

      case "gallery-masonry":
        return <EditorGalleryMasonry selectedComponent={selectedComponent} />;

      case "business-overview":
        return <EditorBusinessOverview selectedComponent={selectedComponent} />;

      case "marquee-images":
        return <EditorMarqueeImages selectedComponent={selectedComponent} />;

      case "call-to-action":
        return <EditorCTA selectedComponent={selectedComponent} />;

      case "content-showcase":
        return <EditorContentShowcase selectedComponent={selectedComponent} />;

      case "modal-popup":
        return <EditorModalPopup selectedComponent={selectedComponent} />;

      case "image-content":
        return <EditorImage selectedComponent={selectedComponent} />;

      case "list-images":
        return <EditorListImages selectedComponent={selectedComponent} />;

      case "video-content":
        return <EditorVideo selectedComponent={selectedComponent} />;

      case "video-text-banner":
        return <EditorVideoText selectedComponent={selectedComponent} />;

      case "hero-section":
        return <EditorHeroSection selectedComponent={selectedComponent} />;

      case "floating-button-circle":
        return (
          <EditorFloatingButtonCircle selectedComponent={selectedComponent} />
        );

      case "floating-button":
        return <EditorFloatingButton selectedComponent={selectedComponent} />;

      case "button-content":
        return <EditorButton selectedComponent={selectedComponent} />;

      case "slider-images":
        return <EditorSliderImages selectedComponent={selectedComponent} />;

      case "quotes":
        return <EditorQuote selectedComponent={selectedComponent} />;

      case "countdown":
        return <EditorCountdown selectedComponent={selectedComponent} />;

      case "feature-highlights":
        return (
          <EditorFeatureHighlights selectedComponent={selectedComponent} />
        );

      case "faq":
        return <EditorFAQ selectedComponent={selectedComponent} />;

      case "testimony":
        return <EditorTestimony selectedComponent={selectedComponent} />;

      case "divider":
        return <EditorDivider selectedComponent={selectedComponent} />;

      case "empty-space":
        return <EditorEmptySpace selectedComponent={selectedComponent} />;

      case "checkout-form":
        return <EditorCheckoutForm selectedComponent={selectedComponent} />;

      case "footer":
        return <EditorFooter selectedComponent={selectedComponent} />;

      case "custom-maps":
        return <EditorMaps selectedComponent={selectedComponent} />;

      default:
        return null;
    }
  };

  return <div>{renderEditorComponent()}</div>;
};

export default ComponentStyleEditor;
