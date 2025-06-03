import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Switch } from "@/components/ui/switch";
import { produce } from "immer";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useEditor } from "@grapesjs/react";
import { CgMenuGridO } from "react-icons/cg";
import { FaLink, FaLinkSlash } from "react-icons/fa6";
import { IoNavigateSharp } from "react-icons/io5";
import { MdOutlineAdsClick } from "react-icons/md";
import { RiWhatsappFill } from "react-icons/ri";

import { useEffect } from "react";
import { CgChevronDoubleRight } from "react-icons/cg";
import SelectCircle from "./SelectCircle";
import { HiOutlineCursorClick } from "react-icons/hi";
import FacebookPixel from "@/components/FacebookPixel";
import { Textarea } from "@/components/ui/textarea";

const localPageTargetOptions = [
  { label: "Utama", options: [{ value: "home", label: "Home" }] },
  {
    label: "Shopping",
    options: [
      { value: "product-detail", label: "Detail Produk" },
      { value: "product-category", label: "Kategori Produk" },
      { value: "shopping-cart", label: "Keranjang Belanja" },
      { value: "payment-confirmation", label: "Konfirmasi Pembayaran" },
    ],
  },
  {
    label: "Content",
    options: [
      { value: "blog-post", label: "Blog Post" },
      { value: "blog-post-list", label: "Daftar Blog Post" },
      { value: "blog-post-category", label: "Kategori Blog Post" },
      { value: "additional-page", label: "Halaman Tambahan" },
    ],
  },
  {
    label: "Session",
    options: [
      { value: "login", label: "Login" },
      { value: "register", label: "Daftar Baru" },
      { value: "my-account", label: "Akun Saya" },
      { value: "logout", label: "Logout" },
    ],
  },
];

const optionsTargetLink = [
  {
    label: "Tidak ada link",
    options: [{ value: null, label: "Tidak ada link" }],
  },
  {
    label: "Web",
    options: [{ value: "url", label: "URL" }],
  },
  {
    label: "Chat",
    options: [{ value: "whatsapp", label: "Whatsapp" }],
  },
];

const actionModeOptions = [
  { value: "scrollTarget", label: "Scroll Target" },
  { value: "popup", label: "Pop Up" },
];

const clickActionOptions = [
  { value: "link", label: "Link", icon: <FaLink size={24} /> },
  { value: "action", label: "Action", icon: <MdOutlineAdsClick size={24} /> },
  {
    value: "navigate",
    label: "Navigate",
    icon: <IoNavigateSharp size={24} />,
  },
];

const TargetOptions = ({
  content,
  path = "contents",
  handleComponentChange,
}) => {
  const { target } = content;
  const editor = useEditor();
  const editorModel = editor.getModel();
  const globalOptions = editorModel.get("globalOptions");
  const [toggleOptions, setToggleOptions] = useState(false);

  const handelChangeClickAction = (value) => {
    if (target.actionType === value) return;

    const getTargetValues = (type) => {
      const baseValues = {
        actionType: "link",
        options: {
          type: null,
        },
      };

      const typeConfigs = {
        link: baseValues,
        action: {
          actionType: "action",
          options: {
            type: "scrollTarget",
            value: "scrollToTop",
          },
        },
        navigate: {
          actionType: "navigate",
          options: {
            type: "localPages",
            value: "home",
          },
        },
      };

      return typeConfigs[type] || baseValues;
    };

    const updatedComponent = produce(content.target, () => {
      return getTargetValues(value);
    });

    handleComponentChange(`${path}.${content.id}.target`, updatedComponent);
  };

  const handleChangeActionModeType = (value) => {
    if (value === "popup" && globalOptions.popup.length >= 1) {
      const updatedComponentType = produce(content.target, (draft) => {
        draft.options.type = "popup";
        draft.options.value = globalOptions.popup[0].id;
      });

      handleComponentChange(
        `${path}.${content.id}.target`,
        updatedComponentType
      );
    } else if (
      value === "scrollTarget" &&
      globalOptions.scrollTarget.length >= 1
    ) {
      const updatedComponentType = produce(content.target, (draft) => {
        draft.options.type = "scrollTarget";
        draft.options.value = globalOptions.scrollTarget[0].value;
      });

      handleComponentChange(
        `${path}.${content.id}.target`,
        updatedComponentType
      );
    }
  };

  const handleChangeTargetOptions = (type, value) => {
    const updatedComponent = produce(content.target, (draft) => {
      draft.options.type = type;
      draft.options.value = value;
    });

    handleComponentChange(`${path}.${content.id}.target`, updatedComponent);
  };

  const handleSelectTypeLink = (value) => {
    const getTypeLinkValues = (type) => {
      const baseValues = {
        type: null,
      };

      const typeConfigs = {
        null: baseValues,
        url: {
          type: "url",
          link: "",
          isOpenNewTab: false,
        },
        whatsapp: {
          type: "whatsapp",
          phoneNumber: "",
          message: "",
          isOpenNewTab: false,
        },
      };

      return typeConfigs[type] || baseValues;
    };

    const updatedComponent = produce(content.target, (draft) => {
      draft.options = getTypeLinkValues(value);
    });

    handleComponentChange(`${path}.${content.id}.target`, updatedComponent);
  };

  const handleChangeTargetLink = (key, value) => {
    const updatedComponent = produce(content.target, (draft) => {
      if (value === null) {
        draft.options = { type: null };
      } else {
        draft.options[key] = value;
      }
    });

    handleComponentChange(`${path}.${content.id}.target`, updatedComponent);
  };

  useEffect(() => {
    if (target?.options?.type) {
      setToggleOptions(true);
    }
  }, [target?.options?.type]);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="">
            Click Action Target <HiOutlineCursorClick />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="left" className="w-[350px]">
          <div>
            <SelectCircle
              options={clickActionOptions}
              value={target.actionType}
              onClick={(value) => {
                handelChangeClickAction(value);
              }}
            />

            {target.actionType === "link" && (
              <div className="">
                <div className="flex items-center gap-x-2">
                  <Collapsible
                    open={target.options.type && toggleOptions}
                    onOpenChange={setToggleOptions}
                    className="w-full"
                  >
                    <div className="flex justify-between w-full gap-x-1">
                      <div className="space-y-2 w-full mx-1">
                        <Label className="text-xs">Type</Label>
                        <Select
                          value={target.options.type}
                          defaultValue={optionsTargetLink[0].options[0].value}
                          onValueChange={(value) => {
                            setToggleOptions(true);
                            handleSelectTypeLink(value);
                          }}
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent>
                            {optionsTargetLink.map((opt, index) => (
                              <SelectGroup key={index}>
                                <SelectLabel>{opt.label}</SelectLabel>
                                {opt.options.map((subOpt) => (
                                  <SelectItem
                                    key={subOpt.value}
                                    value={subOpt.value}
                                  >
                                    <div className="flex gap-x-2 items-center justify-center">
                                      {subOpt.value === "whatsapp" ? (
                                        <RiWhatsappFill />
                                      ) : subOpt.value === "url" ? (
                                        <FaLink />
                                      ) : subOpt.value === "localPage" ? (
                                        <CgMenuGridO />
                                      ) : subOpt.value === null ? (
                                        <FaLinkSlash />
                                      ) : null}{" "}
                                      {subOpt.label}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {target.options.type && (
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="mt-7">
                            <ChevronsUpDown className="h-4 w-4" />
                            <span className="sr-only">Toggle</span>
                          </Button>
                        </CollapsibleTrigger>
                      )}
                    </div>

                    <CollapsibleContent className=" mt-2 p-2  rounded-md mb-1">
                      {target.options.type === "url" && (
                        <div className="flex flex-col gap-y-4">
                          <Label>URL</Label>
                          <Input
                            value={target.options?.link || ""}
                            onChange={(e) => {
                              handleChangeTargetLink("link", e.target.value);
                            }}
                          />

                          <div className="flex items-center justify-between ">
                            <Label>Open link in new tab</Label>
                            <Switch
                              checked={target.options?.isOpenNewTab || false}
                              onCheckedChange={(checked) => {
                                handleChangeTargetLink("isOpenNewTab", checked);
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {target.options.type === "whatsapp" && (
                        <div className="flex flex-col gap-y-4">
                          <div>
                            <Label>Whatsapp Number</Label>
                            <Input
                              value={target.options?.phoneNumber || ""}
                              className="mt-2"
                              onChange={(e) => {
                                handleChangeTargetLink(
                                  "phoneNumber",
                                  e.target.value
                                );
                              }}
                            />
                          </div>

                          <div>
                            <Label>Message</Label>
                            <Textarea
                              value={target.options?.message || ""}
                              className="mt-2"
                              onChange={(e) => {
                                handleChangeTargetLink(
                                  "message",
                                  e.target.value
                                );
                              }}
                            />
                          </div>

                          <div className="flex items-center justify-between mb-1 ">
                            <Label>Open link in new tab</Label>
                            <Switch
                              checked={target.options?.isOpenNewTab || false}
                              onCheckedChange={(checked) => {
                                handleChangeTargetLink("isOpenNewTab", checked);
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            )}

            {target.actionType === "action" && (
              <div className="flex items-center w-full gap-x-3">
                <div className="space-y-2 w-full mx-1">
                  <Label className="text-xs">Type</Label>
                  <Select
                    value={target.options.type}
                    defaultValue={actionModeOptions[0].value}
                    onValueChange={(value) => {
                      handleChangeActionModeType(value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {actionModeOptions.map((opt) => (
                        <SelectItem
                          disabled={
                            opt.value === "popup" &&
                            globalOptions.popup.length === 0
                          }
                          key={opt.value}
                          value={opt.value}
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <CgChevronDoubleRight className="mt-7" />
                </div>

                <div className="space-y-1 w-full">
                  <Label className="text-xs">Target</Label>

                  {target.options.type === "scrollTarget" && (
                    <Select
                      value={target.options.value}
                      onValueChange={(value) => {
                        handleChangeTargetOptions("scrollTarget", value);
                      }}
                    >
                      <SelectTrigger className="w-[115px]">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        {globalOptions.scrollTarget.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {target.options.type === "popup" && (
                    <Select
                      value={target.options.value}
                      onValueChange={(value) => {
                        handleChangeTargetOptions("popup", value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="" />
                      </SelectTrigger>

                      <SelectContent>
                        {globalOptions.popup.length > 0 ? (
                          globalOptions.popup.map((opt) => (
                            <SelectItem key={opt.id} value={opt.id}>
                              {opt.label}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectValue placeholder="Not Found!" />
                        )}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            )}

            {target.actionType === "navigate" && (
              <div className="space-y-2 w-full mx-1">
                <Label className="text-xs">Local Page</Label>

                <Select
                  value={target.options.value}
                  onValueChange={(value) => {
                    handleChangeTargetOptions("localPages", value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    {localPageTargetOptions.map((opt, index) => (
                      <SelectGroup key={index}>
                        <SelectLabel>{opt.label}</SelectLabel>
                        {opt.options.map((subOpt) => (
                          <SelectItem key={subOpt.value} value={subOpt.value}>
                            {subOpt.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {target?.options?.type !== null && <FacebookPixel />}
        </PopoverContent>
      </Popover>
    </>
  );
};

export default TargetOptions;
