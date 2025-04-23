import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { BsImageAlt } from "react-icons/bs";
import { HiAdjustments } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";
import { MdDeblur } from "react-icons/md";

const TabsEditor = ({
  children,
  withoutStyles = false,
  withoutBackground = false,
  withoutTransition = false,
}) => {
  const [activeTab, setActiveTab] = useState("content");
  const tabs = [
    { label: "Content", value: "content", icon: <TbEdit size={20} /> },
    {
      label: "Styles",
      value: "styles",
      icon: <HiAdjustments size={20} />,
      hidden: withoutStyles,
    },
    {
      label: "Transition",
      value: "transition",
      icon: <MdDeblur size={20} />,
      hidden: withoutTransition,
    },
    {
      label: "Background",
      value: "background",
      icon: <BsImageAlt size={18} />,
      hidden: withoutBackground,
    },
  ];

  const filteredTabs = tabs.filter((tab) => !tab.hidden);

  return (
    <Tabs
      onValueChange={(value) => setActiveTab(value)}
      defaultValue={activeTab}
      className=""
    >
      <div className="relative z-10 bg-white shadow pt-3 ">
        <TabsList className="">
          {filteredTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              className="w-full p-0"
              value={tab.value}
            >
              <div className="flex flex-col  items-center">
                <div
                  className={`flex justify-center items-center rounded-full ${
                    activeTab === tab.value
                      ? "bg-[#FF8E29] text-[#FFF4EA]"
                      : "bg-muted"
                  } p-2`}
                >
                  {tab.icon}
                </div>
                <p className="font-normal text-sm my-2">{tab.label}</p>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <div
        style={{
          height: "calc(100vh - 200px)",
        }}
        className="overflow-y-auto"
      >
        {children}
      </div>
    </Tabs>
  );
};

export default TabsEditor;
