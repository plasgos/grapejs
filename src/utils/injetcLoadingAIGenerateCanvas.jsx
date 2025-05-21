import LoadingGenerateAICanvas from "@/components/LoadingGenerateAICanvas";
import { createRoot } from "react-dom/client";

let root = null;

export const injectLoadingAIGenerateCanvas = (editor) => {
  const canvasEl = editor.Canvas.getFrameEl();
  if (!canvasEl) return;

  const canvasDoc = canvasEl.contentDocument;
  const body = canvasDoc?.body;
  if (!body) return;

  let loadingContainer = canvasDoc.getElementById("ai-loading-overlay");

  if (!loadingContainer) {
    loadingContainer = canvasDoc.createElement("div");
    loadingContainer.id = "ai-loading-overlay";
    loadingContainer.style.position = "absolute";
    loadingContainer.style.top = "0";
    loadingContainer.style.left = "0";
    loadingContainer.style.width = "100%";
    loadingContainer.style.height = "100%";
    loadingContainer.style.zIndex = "9999";
    loadingContainer.style.background = "rgba(255, 255, 255, 0.7)";
    body.appendChild(loadingContainer);
  }

  if (!root) {
    root = createRoot(loadingContainer);
  }

  root.render(<LoadingGenerateAICanvas />);
};

export const removeLoadingFromCanvas = (editor) => {
  const canvasEl = editor?.Canvas.getFrameEl();
  const canvasDoc = canvasEl?.contentDocument;

  if (!canvasDoc) return;

  const canvas = canvasDoc.getElementById("ai-loading-overlay");

  if (canvas && root) {
    setTimeout(() => {
      root.unmount();
      canvas.remove();
      root = null;
      console.log("✅ Loading overlay berhasil dihapus");
    }, 0);
  }
};
