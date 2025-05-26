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
import { navbarComponent } from "./components/navbarComponent";
import { blurTextComponent } from "./components/pro-version/blurTextComponent";
import { businessOverviewComponent } from "./components/pro-version/businessOverviewComponent";
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

export const source = `<section class="text-gray-600 body-font"><div class="container px-5 py-24 mx-auto"><div class="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center"><svg fill="currentColor" class="inline-block w-8 h-8 text-gray-400 mb-8" viewBox="0 0 975.036 975.036"><path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path></svg><p class="leading-relaxed text-lg">Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware. Man bun next level coloring book skateboard four loko knausgaard. Kitsch keffiyeh master cleanse direct trade indigo juice before they sold out gentrify plaid gastropub normcore XOXO 90's pickled cindigo jean shorts. Slow-carb next level shoindigoitch ethical authentic, yr scenester sriracha forage franzen organic drinking vinegar.</p><span class="inline-block h-1 w-10 rounded bg-indigo-500 mt-8 mb-6"></span><h2 class="text-gray-900 font-medium title-font tracking-wider text-sm">HOLDEN CAULFIELD</h2><p class="text-gray-500">Senior Product Designer</p></div></div></section>`;

const plasgosPlugin = (editor) => {
  editor.on("load", () => {
    //navbar
    navbarComponent(editor);

    //text
    splitTextComponent(editor);
    blurTextComponent(editor);
    fuzzyTextComponent(editor);
    glitchTextComponent(editor);
    scrollVelocityTextComponent(editor);

    marqueImagesComponent(editor);

    //media
    // scrollRevealComponent(editor);
    galleryMasonryComponent(editor);

    buttonsComponent(editor);
    businessOverviewComponent(editor);
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

    //footer
    footerComponent(editor);

    editor.BlockManager.add("test", {
      label: "test0",
      category: "test",
      content: source,
      activate: true,
      // media: renderToString(icon),
      // attributes: {
      //   isLocked: defaultCustomComponent?.isLocked ?? false,
      // },
    });
  });
};

export default plasgosPlugin;
