import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState } from "react";
import { GiPalette } from "react-icons/gi";
import GlobalStyles from "./GlobalStyles";

const DesignSetting = () => {
  const [open, setOpen] = useState(false);

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
            <GiPalette className="scale-125" />
          </Button>
          <p className="text-xs font-semibold mt-1">Design</p>
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        side="right"
        className="relative top-[60px] -right-3 min-w-[350px] h-[93vh] p-0 bg-[#FEEBDB]"
      >
        <GlobalStyles />
      </HoverCardContent>
    </HoverCard>
  );
};

export default DesignSetting;
