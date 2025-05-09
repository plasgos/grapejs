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

const Bottombar = ({
  isCollapsedSideBar,
  importProjectFromFile,
  exportProjectAsFile,
  onToggleSidebar,
}) => {
  return (
    <div className="sticky bottom-0 z-10 bg-white shadow p-2 bg-gradient-to-r from-[#FF8F2B] to-[#FFC794]">
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
            <Button className="bg-[#102442] rounded-full">
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
