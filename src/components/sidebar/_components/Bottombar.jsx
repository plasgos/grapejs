import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiExport, CiImport } from "react-icons/ci";
import { FaEllipsisVertical } from "react-icons/fa6";
import { RiMenuFold4Line, RiMenuUnfold4Line } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { useState } from "react";
import html2canvas from "html2canvas";
import { useScreenshot } from "use-react-screenshot";
import ReactDOMServer from "react-dom/server";
import { useRef } from "react";
import { viewComponentsRender } from "@/pages/deploy/_components/RenderFromData";
import { produce } from "immer";
import { usePDF } from "react-to-pdf";

import generatePDF, { Resolution, Margin } from "react-to-pdf";
import { useEffect } from "react";

const options = {
  filename: "advanced-options.pdf",
  // 'save' or 'open', default is 'save'
  method: "save",
  // default is Resolution.MEDIUM = 3, which should be enough, higher values
  // increases the image quality but also the size of the PDF, so be careful
  // using values higher than 10 when having multiple pages generated, it
  // might cause the page to crash or hang.
  resolution: Resolution.NORMAL,
  page: {
    // margin is in MM, default is Margin.NONE = 0
    // margin: Margin.SMALL,
    // default is 'A4'
    format: "letter",
    // default is 'portrait'
    orientation: "landscape",
  },
  canvas: {
    // default is 'image/jpeg' for better size performance
    mimeType: "image/png",
    qualityRatio: 1,
  },
  // Customize any value passed to the jsPDF instance and html2canvas
  // function. You probably will not need this and things can break,
  // so use with caution.
  overrides: {
    // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
    pdf: {
      compress: true,
    },
    // see https://html2canvas.hertzen.com/configuration for more options
    canvas: {
      useCORS: true,
    },
  },
};

const ComponentToCapture = ({ data }) => {
  const allComponents = data?.pages[0].frames?.[0]?.component?.components || [];

  const thumbnailComponent = allComponents.slice(0, 3);
  const frameGlobalOptions = data?.globalOptions;

  const renderComponent = (comp) => {
    const Component = viewComponentsRender[comp.type];

    if (!Component || Component === "") return null;

    return (
      <Component
        key={comp?.attributes?.id || Math.random()}
        section={comp?.customComponent}
        editor={null}
        buildContainerStyle={frameGlobalOptions}
      />
    );
  };

  return thumbnailComponent?.map(renderComponent);
};

const Bottombar = ({
  editor,
  isCollapsedSideBar,
  importProjectFromFile,
  exportProjectAsFile,
  onToggleSidebar,
}) => {
  const hiddenRef = useRef(null);
  const [dataToCapture, setDataToCapture] = useState(null);
  console.log("🚀 ~ dataToCapture:", dataToCapture);
  // const [image, setImage] = useState(null);
  const [shouldGenerate, setShouldGenerate] = useState(false);
  const [image, takeScreenshot] = useScreenshot();

  const toPDF = async () => {
    const editorModel = editor.getModel();

    // Ambil data proyek
    const projectData = editor.getProjectData();
    const resultComponent = produce(projectData, (draft) => {
      draft.pages[0].frames[0].component.components.forEach(
        (compt) => (compt.isFromAI = false)
      );

      draft.globalOptions = editorModel.get("globalOptions");
    });

    setDataToCapture(resultComponent);
    setShouldGenerate(true);
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (shouldGenerate && hiddenRef.current && dataToCapture) {
        await generatePDF(hiddenRef, options);
        setShouldGenerate(false); // Reset
      }
    }, 300); // delay untuk memastikan render selesai

    return () => clearTimeout(timeout);
  }, [shouldGenerate, dataToCapture]);

  const captureThumbnail = () => {
    // const frameEl = editor.Canvas.getFrameEl();
    // const frameDoc =
    //   frameEl?.contentDocument || frameEl?.contentWindow?.document;
    // if (frameDoc?.body) {
    //   html2canvas(frameDoc.body, {
    //     width: frameEl.clientWidth,
    //     height: 800, // hanya ambil 600px awal
    //     windowWidth: frameEl.clientWidth,
    //     windowHeight: 1200,
    //     scrollY: 0,
    //     scrollX: 0,
    //     useCORS: true,
    //     scale: 1,
    //   }).then((canvas) => {
    //     const thumbnail = canvas.toDataURL("image/png");
    //     // setImg(thumbnail)
    //     // contoh: tampilkan thumbnail
    //     const img = document.createElement("img");
    //     img.src = thumbnail;
    //     document.body.appendChild(img); // untuk demo
    //   });
    // }
    const editorModel = editor.getModel();

    // Ambil data proyek
    const projectData = editor.getProjectData();
    const resultComponent = produce(projectData, (draft) => {
      draft.pages[0].frames[0].component.components.forEach(
        (compt) => (compt.isFromAI = false)
      );

      draft.globalOptions = editorModel.get("globalOptions");
    });

    const html = ReactDOMServer.renderToStaticMarkup(
      <ComponentToCapture data={resultComponent} />
    );
    // targetRef.current.innerHTML = html;

    // const canvas = await html2canvas(hiddenRef.current);

    // const img = await takeScreenshot(hiddenRef.current);
    // const img = canvas.toDataURL("image/png");
    // setImage(img);

    toPDF();
  };

  const handleSave = () => {
    captureThumbnail(); // jalankan html2canvas di sini
  };

  return (
    <div className="sticky bottom-0 z-10 bg-white shadow p-2 bg-gradient-to-r from-[#FF8F2B] to-[#FFC794]">
      {/* <img src={img} /> */}

      <div
        ref={hiddenRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          width: "1000px",
          height: "auto",
          overflow: "hidden",
        }}
      >
        <ComponentToCapture data={dataToCapture} />
      </div>

      {isCollapsedSideBar ? (
        <div className="flex gap-x-2 p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <FaEllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={exportProjectAsFile}
              >
                {" "}
                <CiExport /> Export Project
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={importProjectFromFile}
              >
                {" "}
                <CiImport /> Import Project
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Save /> Save
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => onToggleSidebar()}
                  variant="ghost"
                  size="icon"
                >
                  <RiMenuFold4Line />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Expand</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : (
        <div className="flex justify-between gap-x-5 p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <IoSettingsSharp />
                Settings
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={exportProjectAsFile}
              >
                {" "}
                <CiExport /> Export Project
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={importProjectFromFile}
              >
                {" "}
                <CiImport /> Import Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex gap-x-2">
            <Button onClick={toPDF} className="bg-[#102442] rounded-full">
              Save <Save />
            </Button>

            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => onToggleSidebar()}
                    variant="ghost"
                    size="icon"
                  >
                    <RiMenuUnfold4Line />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Collapse</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      )}

      {image && <img src={image} alt="thumbnail" />}
    </div>
  );
};

export default Bottombar;
