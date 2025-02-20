import { useCanvas } from "@/components/CanvasProvider";
import {
  handleAddWatermark,
  injectCustomAnimate,
  injectTailwindCss,
  onAddingAnimateCss,
} from "@/components/MainWebEditor";
import plasgosPlugin from "@/plugins";
import GjsEditor, { Canvas } from "@grapesjs/react";

import grapesjs from "grapesjs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PublishedPage = () => {
  const { canvasData } = useCanvas();

  const navigate = useNavigate();

  useEffect(() => {
    if (!canvasData.html) {
      navigate("/");
    }
  }, [canvasData.html, navigate]);

  const handleEditorInit = (editor) => {
    editor.on("load", () => {
      //   editor.runCommand("core:preview");

      const projectData = JSON.parse(canvasData.html);

      editor.loadProjectData(projectData);
      const editorModel = editor.getModel();
      if (projectData.globalOptions) {
        editorModel.set("globalOptions", projectData.globalOptions);
        console.log("Global Options loaded:", projectData.globalOptions);
      }

      injectTailwindCss(editor);
      handleAddWatermark(editor);
      onAddingAnimateCss(editor);
      injectCustomAnimate(editor);

      // Ambil semua komponen di dalam canvas
      const wrapper = editor.getWrapper();
      const components = wrapper.components();

      wrapper.set("toolbar", []);
      wrapper.set("hoverable", false);
      wrapper.set("highlightable", false);

      // Fungsi rekursif untuk menonaktifkan interaksi pada semua komponen
      const disableEditing = (component) => {
        component.set({
          draggable: false,
          droppable: false,
          selectable: false,
          hoverable: false,
          highlightable: false,
          editable: false,
          copyable: false,
        });

        // Jika komponen memiliki child, ulangi untuk child-nya
        const childComponents = component.components();
        childComponents.each((child) => disableEditing(child));
      };

      const removeInlineStyles = (component) => {
        const styles = component.getStyle();

        // Hapus properti gaya yang tidak diinginkan
        delete styles.outline;
        delete styles.padding;
        delete styles["box-shadow"];
        delete styles.border;

        // Perbarui style komponen
        component.setStyle(styles);

        // Jika memiliki child, hapus style dari child juga
        const childComponents = component.components();
        childComponents.each((child) => removeInlineStyles(child));
      };

      // Nonaktifkan interaksi untuk semua komponen di canvas
      components.each((component) => disableEditing(component));
      components.each((component) => removeInlineStyles(component));
    });
  };

  return (
    <div className="h-screen">
      <GjsEditor
        onEditor={handleEditorInit}
        grapesjs={grapesjs}
        plugins={[plasgosPlugin]}
        options={{
          storageManager: false,
          showOffsets: false,
          canvasCss: `
            /* Hilangkan highlight dan garis biru saat elemen dihover atau diseleksi */
            .gjs-comp-selected,
            .gjs-hovered,
            .gjs-dragging {
              outline: none !important;
              box-shadow: none !important;
            }

            /* Hilangkan garis biru pada elemen wrapper utama */
            .gjs-dashed {
              outline: none !important;
              border: none !important;
            }

            /* Nonaktifkan highlight wrapper secara visual */
            .gjs-highlight {
              display: none !important;
            }

            /* Hilangkan hover highlight khusus untuk body */
            body.gjs-hovered {
              outline: none !important;
              box-shadow: none !important;
            }
              .gjs-selected {
              outline : none !important
              }

               /* Hilangkan outline biru dan efek hover */
  .gjs-hovered {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
  }


   .lazy-load-image-background.lazy-load-image-loaded {
  filter: none !important;
  transition: filter 0.3s ease-in-out;
}
}

 

          `,
        }}
      >
        {/* Canvas untuk preview */}
        <Canvas
          style={{
            backgroundColor: "#FFF4EA",
            width: "100%",
            height: "100vh",
          }}
        />
      </GjsEditor>
    </div>
  );
};

export default PublishedPage;
