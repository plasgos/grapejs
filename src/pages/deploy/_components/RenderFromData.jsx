import ViewModal from "@/plugins/plasgos/components/_components/ViewModal";
import ViewButton from "@/plugins/plasgos/components/buttons/view";
import ViewFormCheckout from "@/plugins/plasgos/components/checkout-form/view";
import ViewCountDown from "@/plugins/plasgos/components/countdown/view";
import ViewDivider from "@/plugins/plasgos/components/divider/view";
import ViewEmptySpace from "@/plugins/plasgos/components/empty-space/view";
import ViewFAQ from "@/plugins/plasgos/components/faq/view";
import ViewFeatureHighlights from "@/plugins/plasgos/components/feature-highlights/view";
import ViewFLoatingButtonCircle from "@/plugins/plasgos/components/floating-button-circle/view";
import ViewFLoatingButton from "@/plugins/plasgos/components/floating-button/view";
import ViewFooter from "@/plugins/plasgos/components/footer/view";
import ViewHeroSection from "@/plugins/plasgos/components/hero-section/view";
import ViewImage from "@/plugins/plasgos/components/image/view";
import ViewListImages from "@/plugins/plasgos/components/list-images/view";
import ViewMaps from "@/plugins/plasgos/components/maps/view";
import ViewNavbar from "@/plugins/plasgos/components/navbar/view";
import ViewBlurText from "@/plugins/plasgos/components/pro-version/blur-text/view/ViewBlurText";
import ViewBusinessOverview from "@/plugins/plasgos/components/pro-version/business-overview/view";
import ViewFuzzyText from "@/plugins/plasgos/components/pro-version/fuzzy-text/view/ViewFuzzyText";
import ViewGalleryMasonry from "@/plugins/plasgos/components/pro-version/gallery-masonry/view";
import ViewGlitchText from "@/plugins/plasgos/components/pro-version/glitch-text/view/ViewGlitchText";
import ViewMarqueeImages from "@/plugins/plasgos/components/pro-version/marquee-images/view";
import ViewScrollVelocity from "@/plugins/plasgos/components/pro-version/scroll-velocity/view/ViewScrollVelocity";
import ViewSplitText from "@/plugins/plasgos/components/pro-version/split-text/view/ViewSplitText";
import ViewQuote from "@/plugins/plasgos/components/quote/view";
import ViewSliderImages from "@/plugins/plasgos/components/slider-images/view";
import ViewTestimony from "@/plugins/plasgos/components/testimony/view";
import ViewText from "@/plugins/plasgos/components/text/view";
import ViewVideoText from "@/plugins/plasgos/components/video-text-banner/view";
import ViewVideo from "@/plugins/plasgos/components/video/view";
import ViewContentShowcase from "@/plugins/plasgos/components/content-showcase/view";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const viewComponentsRender = {
  footer: ViewFooter,
  "checkout-form": ViewFormCheckout,
  "empty-space": ViewEmptySpace,
  divider: ViewDivider,
  testimony: ViewTestimony,
  faq: ViewFAQ,
  "feature-highlights": ViewFeatureHighlights,
  countdown: ViewCountDown,
  quotes: ViewQuote,
  "slider-images": ViewSliderImages,
  "floating-button": ViewFLoatingButton,
  "floating-button-circle": ViewFLoatingButtonCircle,
  "hero-section": ViewHeroSection,
  "video-text-banner": ViewVideoText,
  "video-content": ViewVideo,
  "list-images": ViewListImages,
  "modal-popup": ViewModal,
  "image-content": ViewImage,
  "content-showcase": ViewContentShowcase,
  "business-overview": ViewBusinessOverview,
  "button-content": ViewButton,
  "gallery-masonry": ViewGalleryMasonry,
  "marquee-images": ViewMarqueeImages,
  "scroll-velocity-text": ViewScrollVelocity,
  "glitch-text": ViewGlitchText,
  "fuzzy-text": ViewFuzzyText,
  "blur-text": ViewBlurText,
  "split-text": ViewSplitText,
  navbar: ViewNavbar,
  "custom-text": ViewText,
  "custom-maps": ViewMaps,
};

const RenderFromData = ({ projectData }) => {
  const frameGlobalOptions = projectData?.globalOptions;

  const rootComponents =
    projectData?.pages[0].frames?.[0]?.component?.components;

  const renderComponent = (comp) => {
    const Component = viewComponentsRender[comp.type];

    if (!Component || Component === "") return null;

    return (
      <Component
        key={comp?.attributes?.id || Math.random()}
        section={comp?.customComponent}
        editor={null}
        buildContainerStyle={frameGlobalOptions}
      />
    );
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!rootComponents) {
      navigate(-1);
    }
  }, [navigate, rootComponents]);

  return rootComponents?.map(renderComponent);
};

export default RenderFromData;
