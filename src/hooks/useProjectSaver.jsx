import {
  saveProject,
  setIsSaving,
} from "@/redux/modules/landing-page/landingPageSlice";
import html2canvas from "html2canvas";
import { produce } from "immer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useProjectSaver = ({ editor, currentProject }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoadingSaver, setIsLoadingSaver] = useState(false);

  const captureThumbnail = async () => {
    const frameEl = editor?.Canvas.getFrameEl?.();
    const frameDoc =
      frameEl?.contentDocument || frameEl?.contentWindow?.document;

    if (!frameDoc?.body) return null;

    const canvas = await html2canvas(frameDoc.body, {
      width: frameEl.clientWidth * 1.2,
      height: 1000,
      windowWidth: frameEl.clientWidth * 1.2,
      windowHeight: 100,
      scrollY: 0,
      scrollX: 0,
      useCORS: true,
      scale: 0.5,
      allowTaint: true,
    });

    const thumbnail = canvas.toDataURL("image/png");

    const editorModel = editor.getModel();
    const projectData = editor.getProjectData();

    const resultComponent = produce(projectData, (draft) => {
      draft.pages[0].frames[0].component.components.forEach(
        (compt) => (compt.isFromAI = false)
      );
      draft.globalOptions = editorModel.get("globalOptions");
    });

    return { canvas, thumbnail, resultComponent };
  };

  const handleSave = async ({
    shouldRedirect = false,
    redirectPath = "/files",
  } = {}) => {
    editor.select(null);
    dispatch(setIsSaving(true));

    setIsLoadingSaver(true);

    try {
      const result = await captureThumbnail();

      if (!result) return;

      const { thumbnail, resultComponent } = result;

      if (currentProject) {
        dispatch(
          saveProject({
            ...currentProject,
            thumbnail,
            frameProject: resultComponent,
            isFromAI: false,
          })
        );
      }

      if (shouldRedirect) {
        setTimeout(() => {
          navigate(redirectPath);
        }, 100);
      }

      return result; // <-- Bisa kamu gunakan opsional
    } catch (error) {
      console.log("🚀 ~ useProjectSaver ~ error:", error);
    } finally {
      setIsLoadingSaver(false);
    }
  };

  return {
    captureThumbnail,
    handleSave,
    isLoadingSaver,
  };
};
