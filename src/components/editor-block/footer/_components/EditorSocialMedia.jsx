import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateId } from "@/lib/utils";
import { produce } from "immer";
import RangeInputSlider from "../../_components/RangeInputSlider";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useRef, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";

import { Plus } from "lucide-react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoInformationCircleOutline } from "react-icons/io5";
import { SiDiscord, SiTelegram, SiThreads } from "react-icons/si";
import IconPicker from "../../_components/IconPicker";
import DraggableListNested from "./DraggableListNested";

const socialMediaOptions = [
  {
    label: "Facebook",
    icon: <FaFacebook size={32} />,
    value: "",
    placeholder: "https://facebook.com/username",
  },
  {
    label: "Instagram",
    icon: <FaInstagram size={32} />,
    value: "",
    placeholder: "https://instagram.com/username",
  },
  {
    label: "Twitter (X)",
    icon: <FaSquareXTwitter size={32} />,
    value: "",
    placeholder: "https://x.com/username",
  },
  {
    label: "LinkedIn",
    icon: <FaLinkedin size={32} />,
    value: "",
    placeholder: "https://linkedin.com/in/username",
  },
  {
    label: "YouTube",
    icon: <FaYoutube size={32} />,
    value: "",
    placeholder: "https://youtube.com/@channelname",
  },
  {
    label: "TikTok",
    icon: <FaTiktok size={32} />,
    value: "",
    placeholder: "https://tiktok.com/@username",
  },

  {
    label: "Pinterest",
    icon: <FaPinterest size={32} />,
    value: "",
    placeholder: "https://pinterest.com/username",
  },
  {
    label: "WhatsApp",
    icon: <FaWhatsapp size={32} />,
    value: "",
    placeholder: "https://wa.me/1234567890",
  },
  {
    label: "Telegram",
    icon: <SiTelegram size={32} />,
    value: "",
    placeholder: "https://t.me/username",
  },
  {
    label: "Threads",
    icon: <SiThreads size={32} />,
    value: "",
    placeholder: "https://www.threads.net/@username",
  },
  {
    label: "Discord",
    icon: <SiDiscord size={32} />,
    value: "",
    placeholder: "https://discord.gg/invitecode",
  },
  {
    label: "Github",
    icon: <FaGithub size={32} />,
    value: "",
    placeholder: "https://github.com/username",
  },
];

const EditorSocialMedia = ({
  item,
  handleComponentChange,
  selectedComponent,
  setCurrentComponent,
}) => {
  const [isOpenFields, setisOpenFields] = useState(false);

  const [editItem, setEditItem] = useState(false);

  const itemRefs = useRef({});

  // Ref untuk setiap item

  useEffect(() => {
    if (editItem && itemRefs.current[editItem]) {
      const element = itemRefs.current[editItem];
      // Tunda scroll hingga animasi selesai
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 500); // Sesuaikan waktu dengan durasi animasi Accordion
    }
  }, [editItem]);

  const handleChangeItemValue = (optId, key, value) => {
    const updateField = (component) => {
      return produce(component, (draft) => {
        const content = draft.contents.find(
          (content) => content.id === item.id
        );

        if (content) {
          content.options = content.options.map((opt) =>
            opt.id === optId
              ? {
                  ...opt,
                  [key]: value,
                }
              : opt
          );
        }
      });
    };
    selectedComponent?.set(
      "customComponent",
      updateField(selectedComponent.get("customComponent"))
    );

    setCurrentComponent((prevComponent) => updateField(prevComponent));
  };

  const handleAddInfo = (field) => {
    const currentComponent = selectedComponent.get("customComponent");
    if (!currentComponent) return;

    setEditItem("");

    const newId = generateId();

    const newInfo = {
      id: newId,
      ...field,
    };

    const updateField = (component) => {
      return produce(component, (draft) => {
        const content = draft.contents.find(
          (content) => content.id === item.id
        );

        if (content) {
          content.options = [...content.options, newInfo];
        }
      });
    };

    selectedComponent?.set(
      "customComponent",
      updateField(selectedComponent.get("customComponent"))
    );

    setCurrentComponent((prevComponent) => updateField(prevComponent));

    setEditItem(newId);
  };

  const handleSelectIcon = (key, value) => {
    handleComponentChange(`contents.${item.id}.iconHeading.${key}`, value);
  };

  const renderContents = (contentItem) => {
    return (
      <div className="flex flex-col gap-y-3">
        <div className="space-y-2">
          <div className="flex items-center ">
            <Label>Link</Label>

            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <IoInformationCircleOutline />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy link from your url profile sosial media</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Input
            value={contentItem?.value || ""}
            placeholder={contentItem.placeholder}
            onChange={(e) =>
              handleChangeItemValue(contentItem.id, "value", e.target.value)
            }
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={item?.title || ""}
          onChange={(e) =>
            handleComponentChange(`contents.${item.id}.title`, e.target.value)
          }
        />
      </div>

      <IconPicker
        label="Icon"
        value={item.iconHeading}
        onSelectIcon={(key, value) => handleSelectIcon(key, value)}
      />

      <RangeInputSlider
        label="Width"
        value={item.width}
        onChange={(value) =>
          handleComponentChange(`contents.${item.id}.width`, value)
        }
        min={80}
        max={600}
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <HiMiniAdjustmentsHorizontal />

            {item.type === "images" ? "Customize Images" : "Customize Lists"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="px-0 w-[350px] bg-secondary">
          <p className="pb-3 mb-3 px-5 border-b ">List Info</p>

          <div className="h-auto max-h-[450px] overflow-y-auto p px-5">
            <DraggableListNested
              item={item}
              renderContents={(value) => renderContents(value)}
              setCurrentComponent={setCurrentComponent}
              editItem={editItem}
              selectedComponent={selectedComponent}
              setEditItem={setEditItem}
            >
              <Popover open={isOpenFields} onOpenChange={setisOpenFields}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="my-3 w-full">
                    Add Field <Plus />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[310px]">
                  <div className="grid grid-cols-3 gap-3">
                    {socialMediaOptions.map((field, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg border flex flex-col items-center justify-center gap-y-1 cursor-pointer hover:border-black"
                        onClick={() => {
                          handleAddInfo(field);
                          setisOpenFields(false);
                        }}
                      >
                        {field.icon}
                        <p className="text-xs whitespace-nowrap">
                          {field.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </DraggableListNested>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EditorSocialMedia;
