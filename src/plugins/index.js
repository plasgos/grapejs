import { registerButton } from "./components/registerButton";
import { registerCallToAction } from "./components/registerCallToAction";
import { registerContentShowcase } from "./components/registerContentShowcase";
import { registerCountdown } from "./components/registerCountdown";
import { registerDivider } from "./components/registerDivider";
import { registerFAQ } from "./components/registerFAQ";
import { registerFeatureHighlights } from "./components/registerFeatureHighlights";
import { registerFloatingButton } from "./components/registerFloatingButton";
import { registerFloatingButtonCircle } from "./components/registerFloatingButtonCircle";
import { registerHeroSection } from "./components/registerHeroSection";
import { registerImage } from "./components/registerImage";
import { registerListImages } from "./components/registerListImages";
import { registerModalPopup } from "./components/registerModalPopup";
import { registerQuote } from "./components/registerQuote";
import { registerSliderImages } from "./components/registerSliderImages";
import { registerEmptySpace } from "./components/registerSpace";
import { registerTestimony } from "./components/registerTestimony";
import { registerVideo } from "./components/registerVideo";
import { registerVideoText } from "./components/registerVideoText";

const plasgosPlugin = (editor) => {
  editor.on("load", () => {
    // const canvasFrame = editor.Canvas.getFrameEl();
    registerCallToAction(editor);
    registerContentShowcase(editor);
    registerModalPopup(editor);
    registerImage(editor);
    registerListImages(editor);
    registerVideo(editor);
    registerVideoText(editor);
    registerHeroSection(editor);
    registerFloatingButtonCircle(editor);
    registerFloatingButton(editor);
    registerButton(editor);
    registerSliderImages(editor);
    registerQuote(editor);
    registerCountdown(editor);
    registerFeatureHighlights(editor);
    registerFAQ(editor);
    registerTestimony(editor);
    registerDivider(editor);
    registerEmptySpace(editor);
  });
};

export default plasgosPlugin;
