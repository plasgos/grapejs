import { registerButton } from "./components/registerButton";
import { registerCallToAction } from "./components/registerCallToAction";
import { registerContentShowcase } from "./components/registerContentShowcase";
import { registerFloatingButton } from "./components/registerFloatingButton";
import { registerFloatingButtonCircle } from "./components/registerFloatingButtonCircle";
import { registerHeroSection } from "./components/registerHeroSection";
import { registerImage } from "./components/registerImage";
import { registerListImages } from "./components/registerListImages";
import { registerModalPopup } from "./components/registerModalPopup";
import { registerSliderImages } from "./components/registerSliderImages";
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
  });
};

export default plasgosPlugin;
