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
import { modalPopupComponent } from "./components/modal-popup";

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

    // MODAL COMPONENT

    modalPopupComponent(editor);

    editor.BlockManager.add("modal", {
      label: "Modal",
      category: "Basic",
      content: {
        components: `
      <button type="button" class="modal-open-button">Open modal</button>
      <div class="modal-wrapper">
        <div class="modal-content">
          <div class="modal-content__header">
            <h3 class="modal-content__title">Modal header</h3>
            <button type="button" class="modal-content__close-button">&times;</button>
          </div>
          <p>Some text in the Modal..</p>
        </div>
      </div>
      <style>
        .modal-wrapper {
          display: none;
          position: fixed;
          z-index: 100;
          padding-top: 100px;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0,0,0,0.4);
        }

        .modal-content {
          background-color: #fefefe;
          margin: auto;
          padding: 20px;
          border: 1px solid #888;
          width: 80%;
        }

        .modal-content__header {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .modal-content__title {
          width: 100%;
          margin: 0;
          padding: 0;
        }

        .modal-content__close-button {
          color: #aaaaaa;
          padding: 4px;
          font-size: 24px;
          font-weight: bold;
          border: none;
          background-color: transparent;
          cursor: pointer;
        }

        .modal-content__close-button:hover,
        .modal-content__close-button:focus {
          color: #000;
        }
      </style>
    `,
        script() {
          const button = this.querySelector(".modal-open-button");
          const modalWrapper = this.querySelector(".modal-wrapper");
          const modalCloseButton = this.querySelector(
            ".modal-content__close-button"
          );

          button.addEventListener("click", () => {
            modalWrapper.style.display = "block";
          });

          modalCloseButton.addEventListener("click", () => {
            modalWrapper.style.display = "none";
          });
        },
      },
    });
  });
};

export default plasgosPlugin;
