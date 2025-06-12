import { GiPalette } from "react-icons/gi";
import { GrSort } from "react-icons/gr";
import { TbLayoutGridAdd } from "react-icons/tb";
import BlockComponents from "./_components/BlockComponents";
import SortComponent from "./_components/SortComponent";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useEditor } from "@grapesjs/react";
import { useState } from "react";
import { FaCog } from "react-icons/fa";
import { RxShadowOuter } from "react-icons/rx";
import { VscMultipleWindows } from "react-icons/vsc";
import FloatingButtonsSetting from "./_components/FloatingButtonsSetting";
import GlobalStyles from "./_components/GlobalStyles";
import PopupSetting from "./_components/PopupSetting";
import SettingPage from "./_components/SettingPage";
import { cn } from "@/lib/utils";

const Sidebar = ({ currentProject }) => {
  const editor = useEditor();

  const [activeTab, setActiveTab] = useState("");

  const sidebarItems = [
    {
      key: "sections",
      label: "Sections",
      icon: <TbLayoutGridAdd className="scale-150" />,
      component: () => <BlockComponents />,
    },
    {
      key: "floating",
      label: "Floating Buttons",
      icon: <RxShadowOuter className="scale-150" />,
      component: () => <FloatingButtonsSetting />,
    },
    {
      key: "design",
      label: "Design",
      icon: <GiPalette className="scale-125" />,
      component: () => <GlobalStyles />,
    },
    {
      key: "layer",
      label: "Sort",
      icon: <GrSort className="scale-125" />,
      component: () => <SortComponent />,
    },
    {
      key: "popup",
      label: "Popup",
      icon: <VscMultipleWindows className="scale-125" />,
      component: () => <PopupSetting />,
    },
    {
      key: "settings",
      label: "Settings",
      icon: <FaCog className="scale-125" />,
      component: () => <SettingPage currentProject={currentProject} />,
    },
  ];

  return (
    <div className="h-[94vh] w-[80px] bg-gradient-to-b from-orange-50 to-orange-200 flex flex-col gap-y-5 items-center p-3">
      {sidebarItems.map((item, index) => {
        const currentActiveTab = activeTab === item.key;

        return (
          <HoverCard
            key={item.label}
            open={currentActiveTab}
            onOpenChange={(value) => {
              if (value) {
                setActiveTab(item.key);
                editor.select(null);
              } else {
                setActiveTab("");
              }
            }}
            openDelay={500}
          >
            <HoverCardTrigger asChild>
              <div className="text-center">
                <Button
                  variant="ghost"
                  className={`transition-colors ${
                    currentActiveTab ? "bg-orange-300 hover:bg-orange-300" : ""
                  }`}
                >
                  {item.icon}
                </Button>
                <p className="text-xs font-semibold mt-1">{item.label}</p>
              </div>
            </HoverCardTrigger>
            <HoverCardContent
              side="right"
              className={cn(
                "relative -right-3 min-w-[350px] h-[93vh] p-0 bg-[#FEEBDB]",
                index > 4 ? "top-[10px]" : "top-[60px]"
              )}
            >
              {item.component()}
            </HoverCardContent>
          </HoverCard>
        );
      })}
    </div>
  );
};

export default Sidebar;
