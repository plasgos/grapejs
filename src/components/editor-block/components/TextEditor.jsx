import "@/index.css";
import { useState, useEffect, useRef, useMemo } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Alignment,
  Autosave,
  Bold,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Highlight,
  Italic,
  Link,
  Paragraph,
  Strikethrough,
  Underline,
} from "ckeditor5";
const LICENSE_KEY = "GPL";
import "ckeditor5/ckeditor5.css";
import { Label } from "../../ui/label";

const TextEditor = ({ label, value, onChange }) => {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);
  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
      editorConfig: {
        toolbar: {
          items: [
            "|",
            "fontSize",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "|",

            "link",
            "highlight",
            "|",
            "alignment",
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Alignment,
          Autosave,
          Bold,
          Essentials,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          Highlight,
          Italic,
          Link,
          Paragraph,
          Strikethrough,
          Underline,
        ],

        fontFamily: {
          supportAllValues: true,
        },
        fontSize: {
          options: [
            10,
            12,
            14,
            "default",
            18,
            20,
            22,
            26,
            36,
            40,
            48,
            64,
            96,
            128,
          ],
          supportAllValues: true,
        },
        initialData: "",
        licenseKey: LICENSE_KEY,
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
          decorators: {
            toggleDownloadable: {
              mode: "manual",
              label: "Downloadable",
              attributes: {
                download: "file",
              },
            },
          },
        },
        placeholder: "Type or paste your content here!",
      },
    };
  }, [isLayoutReady]);

  return (
    <div ref={editorContainerRef}>
      {label && <Label className="">{label}</Label>}
      <div className="editor-container mt-2" ref={editorRef}>
        {editorConfig && (
          <CKEditor
            data={value}
            editor={ClassicEditor}
            config={editorConfig}
            onChange={(event, editor) => {
              const data = editor.getData();
              onChange(data);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TextEditor;
