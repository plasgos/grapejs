import { registerCallToAction } from "./components/registerCallToAction";
import { registerContentShowcase } from "./components/registerContentShowcase";
import { registerModalPopup } from "./components/registerModalPopup";

const plasgosPlugin = (editor) => {
  editor.on("load", () => {
    const canvasFrame = editor.Canvas.getFrameEl();
    registerCallToAction(editor, canvasFrame);
    registerContentShowcase(editor, canvasFrame);
    registerModalPopup(editor, canvasFrame);
  });
};

export default plasgosPlugin;
