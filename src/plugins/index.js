import { buttonsComponent } from "./components/buttonsComponent";
import { contentShowcaseComponent } from "./components/contentShowcaseComponent";
import { countdownComponent } from "./components/countdownComponent";
import { dividerComponent } from "./components/dividerComponent";
import { emptySpaceComponent } from "./components/emptySpaceComponent";
import { FAQComponent } from "./components/FAQComponent";
import { featureHighlightsComponent } from "./components/featureHighlightsComponent";
import { floatingButtonCircleComponent } from "./components/floatingButtonCircleComponent";
import { floatingButtonComponent } from "./components/floatingButtonComponent";
import { footerComponent } from "./components/footerComponent";
import { formCheckoutComponent } from "./components/formCheckoutComponent";
import { heroSectionComponent } from "./components/heroSectionComponent";
import { imageComponent } from "./components/imageComponent";
import { listImagesComponent } from "./components/listImagesComponent";
import { modalPopupComponent } from "./components/modalPopupComponent";
import { blurTextComponent } from "./components/pro-version/blurTextComponent";
import { countUpComponent } from "./components/pro-version/countUpComponent";
import { fuzzyTextComponent } from "./components/pro-version/fuzzyTextComponent";
import { galleryMasonryComponent } from "./components/pro-version/galleryMasonryComponent";
import { glitchTextComponent } from "./components/pro-version/glitchTextComponent ";
import { marqueImagesComponent } from "./components/pro-version/marqueImagesComponent ";
import { scrollVelocityTextComponent } from "./components/pro-version/scrollVelocityTextComponent ";
import { splitTextComponent } from "./components/pro-version/splitTextComponent";

import { quoteComponent } from "./components/quoteComponent";
import { sliderImagesComponent } from "./components/sliderImagesComponent";
import { testimonyComponent } from "./components/testimonyComponent";
import { videoComponent } from "./components/videoComponent";
import { videoTextComponent } from "./components/videoTextComponent";

const plasgosPlugin = (editor) => {
  editor.on("load", () => {
    splitTextComponent(editor);
    blurTextComponent(editor);
    fuzzyTextComponent(editor);
    glitchTextComponent(editor);
    scrollVelocityTextComponent(editor);
    countUpComponent(editor);
    marqueImagesComponent(editor);

    galleryMasonryComponent(editor);

    buttonsComponent(editor);
    // registerCallToAction(editor);
    contentShowcaseComponent(editor);
    imageComponent(editor);
    modalPopupComponent(editor);
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
    footerComponent(editor);
  });
};

export default plasgosPlugin;
