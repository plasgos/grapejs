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
import { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import GlobalStyles from "./_components/GlobalStyles";
import SettingPage from "./_components/SettingPage";

const sidebarItems = [
  {
    key: "widgets",
    label: "Widgets",
    icon: <TbLayoutGridAdd className="scale-150" />,
    component: () => <BlockComponents />,
  },
  {
    key: "design",
    label: "Design",
    icon: <GiPalette className="scale-125" />,
    component: () => <GlobalStyles />,
  },
  {
    key: "layer",
    label: "Layer",
    icon: <GrSort className="scale-125" />,
    component: () => <SortComponent />,
  },
  {
    key: "settings",
    label: "Settings",
    icon: <FaCog className="scale-125" />,
    component: () => <SettingPage />,
  },
];

const Sidebar = () => {
  const editor = useEditor();

  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    editor.on("block:drag:stop", () => setActiveTab(""));
  }, [editor]);

  return (
    <div className="h-[94vh] w-[80px] bg-gradient-to-b from-orange-50 to-orange-200 flex flex-col gap-y-5 items-center p-3">
      {sidebarItems.map((item) => {
        const currentActiveTab = activeTab === item.key;

        return (
          <HoverCard
            key={item.label}
            open={currentActiveTab}
            onOpenChange={(value) => {
              if (value) {
                setActiveTab(item.key);
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
              className="relative top-[60px] -right-3 min-w-[350px] h-[93vh] p-0 bg-[#FEEBDB]"
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
