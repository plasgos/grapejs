import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Save } from "lucide-react";
import html2canvas from "html2canvas";
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

import domtoimage from "dom-to-image-more";

const Bottombar = ({
  editor,
  isCollapsedSideBar,
  importProjectFromFile,
  exportProjectAsFile,
  onToggleSidebar,
}) => {
  const [img, setImg] = useState("");

  const captureThumbnail = () => {
    const frameEl = editor.Canvas.getFrameEl();
    const frameDoc =
      frameEl?.contentDocument || frameEl?.contentWindow?.document;

    if (frameDoc?.body) {
      html2canvas(frameDoc.body, {
        width: frameEl.clientWidth,
        height: 800, // hanya ambil 600px awal
        windowWidth: frameEl.clientWidth,
        windowHeight: 1200,
        scrollY: 0,
        scrollX: 0,
        useCORS: true,
        scale: 1,
      }).then((canvas) => {
        const thumbnail = canvas.toDataURL("image/png");
        console.log("Thumbnail:", thumbnail);

        // setImg(thumbnail)

        // contoh: tampilkan thumbnail
        const img = document.createElement("img");
        img.src = thumbnail;
        document.body.appendChild(img); // untuk demo
      });
    }

    const mainContent = frameDoc.querySelector(".gjs-editor-wrapper");
    console.log("🚀 ~ captureThumbnail ~ mainContent:", mainContent);
  };

  const handleSave = () => {
    captureThumbnail(); // jalankan html2canvas di sini
  };

  return (
    <div className="sticky bottom-0 z-10 bg-white shadow p-2 bg-gradient-to-r from-[#FF8F2B] to-[#FFC794]">
      {/* <img src={img} /> */}

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
            <Button onClick={handleSave} className="bg-[#102442] rounded-full">
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
    </div>
  );
};

export default Bottombar;
