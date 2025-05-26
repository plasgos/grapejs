import ViewModal from "@/view/_components/ViewModal";
import ViewButton from "@/view/button";
import ViewFormCheckout from "@/view/checkout-form";
import ViewContentShowcase from "@/view/content-showcase";
import ViewCountDown from "@/view/countdown";
import ViewDivider from "@/view/divider";
import ViewEmptySpace from "@/view/empty-space";
import ViewFAQ from "@/view/faq";
import ViewFeatureHighlights from "@/view/feature-highlights";
import ViewFLoatingButton from "@/view/floating-button";
import ViewFLoatingButtonCircle from "@/view/floating-button-circle";
import ViewFooter from "@/view/footer";
import ViewHeroSection from "@/view/hero-section";
import ViewImage from "@/view/image";
import ViewListImages from "@/view/list-images";
import ViewNavbar from "@/view/navbar";
import ViewBlurText from "@/view/pro-version/blur-text/ViewBlurText";
import ViewBusinessOverview from "@/view/pro-version/business-overview";
import ViewFuzzyText from "@/view/pro-version/fuzzy-text/ViewFuzzyText";
import ViewGalleryMasonry from "@/view/pro-version/gallery-masonry";
import ViewGlitchText from "@/view/pro-version/glitch-text/ViewGlitchText";
import ViewMarqueeImages from "@/view/pro-version/marquee-images";
import ViewScrollVelocity from "@/view/pro-version/scroll-velocity/ViewScrollVelocity";
import ViewSplitText from "@/view/pro-version/split-text/ViewSplitText";
import ViewQuote from "@/view/quote";
import ViewSliderImages from "@/view/slider-images";
import ViewTestimony from "@/view/testimony";
import ViewVideo from "@/view/video";
import ViewVideoText from "@/view/video-text-banner";
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
