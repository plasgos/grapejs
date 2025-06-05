import { contentShowcaseComponent } from "./components/content-showcase";
import { mapsComponent } from "./components/maps";
import { textComponent } from "./components/text";
import { buttonsComponent } from "./components/buttons";
import { testimonyComponent } from "./components/testimony";
import { navbarComponent } from "./components/navbar";
import { splitTextComponent } from "./components/pro-version/split-text";
import { blurTextComponent } from "./components/pro-version/blur-text";
import { fuzzyTextComponent } from "./components/pro-version/fuzzy-text";
import { galleryMasonryComponent } from "./components/pro-version/gallery-masonry";
import { glitchTextComponent } from "./components/pro-version/glitch-text";
import { scrollVelocityTextComponent } from "./components/pro-version/scroll-velocity";
import { marqueImagesComponent } from "./components/pro-version/marquee-images";
import { businessOverviewComponent } from "./components/pro-version/business-overview";
import { imageComponent } from "./components/image";
import { listImagesComponent } from "./components/list-images";
import { videoComponent } from "./components/video";
import { videoTextComponent } from "./components/video-text-banner";
import { sliderImagesComponent } from "./components/slider-images";
import { quoteComponent } from "./components/quote";
import { heroSectionComponent } from "./components/hero-section";
import { countdownComponent } from "./components/countdown";
import { featureHighlightsComponent } from "./components/feature-highlights";
import { FAQComponent } from "./components/faq";
import { dividerComponent } from "./components/divider";
import { emptySpaceComponent } from "./components/empty-space";
import { formCheckoutComponent } from "./components/checkout-form";
import { footerComponent } from "./components/footer";
import { floatingButtonCircleComponent } from "./components/floating-button-circle";
import { floatingButtonComponent } from "./components/floating-button";
import { textElement } from "./elements/text-element";

const plasgosPlugin = (editor) => {
  editor.on("load", () => {
    //navbar
    navbarComponent(editor);

    // //text
    textComponent(editor);
    textElement(editor);

    splitTextComponent(editor);
    blurTextComponent(editor);
    fuzzyTextComponent(editor);
    glitchTextComponent(editor);
    scrollVelocityTextComponent(editor);

    marqueImagesComponent(editor);

    // //media
    // // scrollRevealComponent(editor);
    galleryMasonryComponent(editor);

    buttonsComponent(editor);
    businessOverviewComponent(editor);
    // // registerCallToAction(editor);
    contentShowcaseComponent(editor);
    imageComponent(editor);
    // modalPopupComponent(editor);
    listImagesComponent(editor);

    videoComponent(editor);
    videoTextComponent(editor);
    heroSectionComponent(editor);
    floatingButtonCircleComponent(editor);
    floatingButtonComponent(editor);
    sliderImagesComponent(editor);
    quoteComponent(editor);
    countdownComponent(editor);
    featureHighlightsComponent(editor);
    FAQComponent(editor);
    testimonyComponent(editor);
    dividerComponent(editor);
    emptySpaceComponent(editor);
    formCheckoutComponent(editor);

    // //footer
    footerComponent(editor);
    mapsComponent(editor);
  });
};

export default plasgosPlugin;
