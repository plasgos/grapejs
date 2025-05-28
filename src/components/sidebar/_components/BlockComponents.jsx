import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { TbLayoutGridAdd } from "react-icons/tb";
import { useState } from "react";
import { BlocksProvider, useEditor } from "@grapesjs/react";
import { useEffect } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import CustomBlockManager from "./CustomBlockProvider";
import { Input } from "@/components/ui/input";

const BlockComponents = () => {
  const editor = useEditor();
  const [open, setOpen] = useState(false);
  const [searchBlock, setSearchBlock] = useState("");

  useEffect(() => {
    editor.on("block:drag:stop", () => setOpen(false));
  }, [editor]);

  return (
    <HoverCard open={open} onOpenChange={setOpen} openDelay={300}>
      <HoverCardTrigger asChild>
        <div className="text-center">
          <Button
            variant="ghost"
            className={`transition-colors ${
              open ? "bg-orange-300 hover:bg-orange-300" : ""
            }`}
          >
            <TbLayoutGridAdd className="scale-150" />
          </Button>
          <p className="text-xs font-semibold mt-1">Widgets</p>
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        side="right"
        className="w-full  relative top-[60px] -right-3 min-w-[350px] p-0"
      >
        <div className="sticky top-0 z-10 bg-white border-b p-3 flex justify-between items-center ">
          <Input
            value={searchBlock || ""}
            onChange={(e) => setSearchBlock(e.target.value)}
            className="rounded-full  pr-10"
            placeholder="Search..."
          />

          <div className="absolute top-[23px] right-6 z-10 ">
            <HiMagnifyingGlass className="text-slate-400" />
          </div>
        </div>

        <div className="h-[86vh] overflow-y-auto bg-[#FEEBDB]">
          <BlocksProvider>
            {(props) => (
              <CustomBlockManager {...props} searchBlock={searchBlock} />
            )}
          </BlocksProvider>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default BlockComponents;
