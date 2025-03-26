import swiperCSS from "swiper/swiper-bundle.css?inline";
import datepickerCSS from "react-datepicker/dist/react-datepicker.css?inline";
import animateCSS from "animate.css/animate.min.css?inline";

const injectCSS = (editor, id, cssContent) => {
  const frameDoc = editor.Canvas.getFrameEl()?.contentDocument;
  if (!frameDoc || frameDoc.querySelector(`#${id}`)) return;

  const style = frameDoc.createElement("style");
  style.id = id;
  style.innerHTML = cssContent;
  frameDoc.head.appendChild(style);
};

const injectDatepickerCss = (editor) =>
  injectCSS(editor, "datepicker-css", datepickerCSS);
const injectSwiperCss = (editor) => injectCSS(editor, "swiper-css", swiperCSS);
const injectAnimateCss = (editor) =>
  injectCSS(editor, "animate-css", animateCSS);

const injectCustomCSS = (editor, href) => {
  const head = editor.Canvas.getFrameEl()?.contentDocument?.head;
  if (!head) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  head.appendChild(link);
};

const injectTailwindCss = (editor) => injectCustomCSS(editor, "/src/index.css");

const injectCustomAnimate = (editor) =>
  injectCustomCSS(editor, "/animation.css");

export const injectExternalCSS = (editor) => {
  injectTailwindCss(editor);
  injectCustomAnimate(editor);
  injectAnimateCss(editor);
  injectSwiperCss(editor);
  injectDatepickerCss(editor);
};
