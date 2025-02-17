import { registerCallToAction } from "./components/registerCallToAction";
import { registerContentShowcase } from "./components/registerContentShowcase";

const plasgosPlugin = (editor) => {
  editor.on("load", () => {
    const canvasFrame = editor.Canvas.getFrameEl();
    registerCallToAction(editor, canvasFrame);
    registerContentShowcase(editor, canvasFrame);
  });
};

export default plasgosPlugin;
