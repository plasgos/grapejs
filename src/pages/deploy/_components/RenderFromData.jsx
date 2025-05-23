import ViewContentShowcase from "@/view/content-showcase";
import ViewFAQ from "@/view/faq";
import ViewFeatureHighlights from "@/view/feature-highlights";
import ViewFooter from "@/view/footer";
import ViewHeroSection from "@/view/hero-section";
import ViewNavbar from "@/view/navbar";
import ViewBusinessOverview from "@/view/pro-version/business-overview";
import ViewTestimony from "@/view/testimony";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const blockMap = {
  footer: ViewFooter,
  "checkout-form": "",
  "empty-space": "",
  divider: "",
  testimony: ViewTestimony,
  faq: ViewFAQ,
  "feature-highlights": ViewFeatureHighlights,
  countdown: "",
  quotes: "",
  "slider-images": "",
  "floating-button": "",
  "floating-button-circle": "",
  "hero-section": ViewHeroSection,
  "video-text-banner": "",
  "video-content": "",
  "list-images": "",
  "modal-popup": "",
  "image-content": "",
  "content-showcase": ViewContentShowcase,
  "business-overview": ViewBusinessOverview,
  "button-content": "",
  "gallery-masonry": "",
  "marquee-images": "",
  "scroll-velocity-text": "",
  "glitch-text": "",
  "fuzzy-text": "",
  "blur-text": "",
  "split-text": "",
  navbar: ViewNavbar,
};

const RenderFromData = ({ projectData }) => {
  const frameGlobalOptions = projectData?.globalOptions;

  const rootComponents =
    projectData?.pages[0].frames?.[0]?.component?.components;

  const renderComponent = (comp) => {
    const Component = blockMap[comp.type];

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

  return <main>{rootComponents?.map(renderComponent)}</main>;
};

export default RenderFromData;
