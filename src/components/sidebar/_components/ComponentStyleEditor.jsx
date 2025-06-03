import EditorButton from "@/plugins/plasgos/components/buttons/editor";
import EditorCheckoutForm from "@/plugins/plasgos/components/checkout-form/editor";
import EditorContentShowcase from "@/plugins/plasgos/components/content-showcase/editor";
import EditorCountdown from "@/plugins/plasgos/components/countdown/editor";
import EditorDivider from "@/plugins/plasgos/components/divider/editor";
import EditorEmptySpace from "@/plugins/plasgos/components/empty-space/editor";
import EditorFAQ from "@/plugins/plasgos/components/faq/editor";
import EditorFeatureHighlights from "@/plugins/plasgos/components/feature-highlights/editor";
import EditorFloatingButtonCircle from "@/plugins/plasgos/components/floating-button-circle/editor";
import EditorFloatingButton from "@/plugins/plasgos/components/floating-button/editor";
import EditorFooter from "@/plugins/plasgos/components/footer/editor";
import EditorHeroSection from "@/plugins/plasgos/components/hero-section/editor";
import EditorImage from "@/plugins/plasgos/components/image/editor";
import EditorListImages from "@/plugins/plasgos/components/list-images/editor";
import EditorMaps from "@/plugins/plasgos/components/maps/editor";
import EditorModalPopup from "@/plugins/plasgos/components/modal-popup/editor";
import EditorNavbar from "@/plugins/plasgos/components/navbar/editor";
import EditorBlurText from "@/plugins/plasgos/components/pro-version/blur-text/editor";
import EditorBusinessOverview from "@/plugins/plasgos/components/pro-version/business-overview/editor";
import EditorFuzzyText from "@/plugins/plasgos/components/pro-version/fuzzy-text/editor";
import EditorGalleryMasonry from "@/plugins/plasgos/components/pro-version/gallery-masonry/editor";
import EditorGlitchText from "@/plugins/plasgos/components/pro-version/glitch-text/editor";
import EditorMarqueeImages from "@/plugins/plasgos/components/pro-version/marquee-images/editor";
import EditorScrollVelocity from "@/plugins/plasgos/components/pro-version/scroll-velocity/editor";
import EditorSplitText from "@/plugins/plasgos/components/pro-version/split-text/editor";
import EditorQuote from "@/plugins/plasgos/components/quote/editor";
import EditorSliderImages from "@/plugins/plasgos/components/slider-images/editor";
import EditorTestimony from "@/plugins/plasgos/components/testimony/editor";
import EditorText from "@/plugins/plasgos/components/text/editor";
import EditorVideoText from "@/plugins/plasgos/components/video-text-banner/editor";
import EditorVideo from "@/plugins/plasgos/components/video/editor";

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

      // case "call-to-action":
      //   return <EditorCTA selectedComponent={selectedComponent} />;

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
