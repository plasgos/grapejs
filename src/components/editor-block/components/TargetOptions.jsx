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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Switch } from "@/components/ui/switch";
import { produce } from "immer";
import { useState } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

import { ChevronsUpDown } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";

import { CgMenuGridO } from "react-icons/cg";
import { FaLink, FaLinkSlash } from "react-icons/fa6";
import { IoNavigateSharp } from "react-icons/io5";
import { MdOutlineAdsClick } from "react-icons/md";
import { RiWhatsappFill } from "react-icons/ri";
import { useEditor } from "@grapesjs/react";

import { CgChevronDoubleRight } from "react-icons/cg";
import { useMemo } from "react";

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

const optionsTarget = [
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
  { value: "link", label: "Link" },
  { value: "action", label: "Action" },
  { value: "navigate", label: "Navigate" },
];

const TargetOptions = ({
  selectedComponent,
  contentId,
  handleContentChange,
}) => {
  const initialComponent = selectedComponent?.get("customComponent");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getContentById = (id) =>
    initialComponent.contents.find((content) => content.id === id) || {};

  const currentContent = useMemo(
    () => getContentById(contentId),
    [contentId, getContentById]
  );

  const editor = useEditor();
  const editorModel = editor.getModel();
  const globalOptions = editorModel.get("globalOptions");
  const [selectedClickAction, setSelectedClickAction] = useState(
    currentContent?.target?.actionType || "link"
  );
  const [selectedTarget, setSelectedTarget] = useState(
    currentContent?.target?.options?.type || optionsTarget[0].options[0].value
  );

  const [selectedActionMode, setSelectedActionMode] = useState(
    currentContent?.target?.options?.type || actionModeOptions[0].value
  );

  const [scrollTargetValue, setScrollTargetValue] = useState(
    currentContent?.target?.options?.value ||
      globalOptions.scrollTarget[0].value
  );
  const [popupValue, setPopupValue] = useState(undefined);
  const [localPageValue, setLocalPageValue] = useState(
    currentContent?.target?.options?.value ||
      localPageTargetOptions[0].options[0].value
  );

  const [toggleOptions, setToggleOptions] = useState(false);
  const [urlValue, setUrlValue] = useState("");
  const [isOpenNewTabUrl, setIsOpenNewTabUrl] = useState(false);
  const [waNumber, setWaNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isOpenNewTabWa, setIsOpenNewTabWa] = useState(false);

  const handleChangeTargetLink = (key, value) => {
    const updatedComponent = produce(currentContent.target, (draft) => {
      if (key === "type") {
        if (value === null) {
          draft.options = { type: null };
        } else {
          draft.options.type = value;
        }
      } else {
        draft.options[key] = value;
      }
    });

    // Update state atau prop dengan data yang telah diubah
    handleContentChange(contentId, "target", updatedComponent);
  };

  const handelChangeClickAction = (value) => {
    if (selectedClickAction === value) return;
    const updatedComponent = produce(currentContent.target, (draft) => {
      if (value === "link") {
        draft.actionType = value;
        draft.options = {
          type: null,
        };
      } else if (value === "action") {
        draft.actionType = value;
        draft.options = {
          type: "scrollTarget",
          value: "scrollToTop",
        };
      } else {
        draft.actionType = value;
        draft.options = {
          type: "localPages",
          value: "home",
        };
      }
    });

    // Panggil handleContentChange untuk memperbarui data
    handleContentChange(contentId, "target", updatedComponent);

    if (value === "link") {
      setSelectedTarget(null);
    }
  };

  const handleChangeActionModeType = (key, value) => {
    const updatedComponent = produce(currentContent.target, (draft) => {
      if (value === "popup") {
        draft.options[key] = value;
        draft.options.value = "";
      } else {
        draft.options[key] = value;
      }
    });

    handleContentChange(contentId, "target", updatedComponent);
  };

  useEffect(() => {
    if (
      selectedClickAction === "action" &&
      selectedActionMode === "scrollTarget" &&
      globalOptions.scrollTarget.length === 1
    ) {
      setScrollTargetValue("scrollToTop");

      const updatedComponent = produce(currentContent.target, (draft) => {
        draft.options.value = "scrollToTop";
      });

      handleContentChange(contentId, "target", updatedComponent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    contentId,
    currentContent,
    globalOptions.scrollTarget.length,
    selectedActionMode,
    selectedClickAction,
  ]);

  const handleChangeLocalPageValue = (value) => {
    const updatedComponent = produce(currentContent.target, (draft) => {
      draft.options.type = "localPages";
      draft.options.value = value;
    });

    handleContentChange(contentId, "target", updatedComponent);
  };

  const handleChangeScrollTargetValue = (value) => {
    const updatedComponent = produce(currentContent.target, (draft) => {
      draft.options.type = "scrollTarget";
      draft.options.value = value;
    });

    handleContentChange(contentId, "target", updatedComponent);
  };

  useEffect(() => {
    if (currentContent) {
      const currentglobalOptions = editorModel.get("globalOptions");
      const isTargetValueExist =
        selectedClickAction === "action" &&
        currentglobalOptions.scrollTarget.length > 1 &&
        !currentglobalOptions.scrollTarget.some(
          (target) => scrollTargetValue === target.value
        );

      if (isTargetValueExist) {
        const updatedComponent = produce(currentContent.target, (draft) => {
          draft.actionType = "link";
          draft.options = {
            type: null,
          };
        });

        handleContentChange(contentId, "target", updatedComponent);
      }
    }
  }, [
    contentId,
    currentContent,
    editorModel,
    handleContentChange,
    scrollTargetValue,
    selectedClickAction,
  ]);

  useEffect(() => {
    if (currentContent) {
      setSelectedTarget(currentContent.target.options.type || null);
      setUrlValue(currentContent.target.options.link || "");
      setWaNumber(currentContent.target.options.phoneNumber || "");
      setMessage(currentContent.target.options.message || "");
      setIsOpenNewTabUrl(currentContent.target.options.isOpenNewTab || false);
      setIsOpenNewTabWa(currentContent.target.options.isOpenNewTab || false);

      setSelectedClickAction(currentContent.target.actionType);
      if (selectedClickAction === "action") {
        setSelectedActionMode(currentContent.target.options.type);
        setScrollTargetValue(currentContent.target.options.value);
      } else if (selectedClickAction === "navigate") {
        setLocalPageValue(currentContent.target.options.type);
        setLocalPageValue(currentContent.target.options.value);
      }
    }
  }, [selectedClickAction, currentContent]);

  return (
    <Accordion
      defaultValue={currentContent.target.options.type ? "item-1" : ""}
      type="single"
      collapsible
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="!no-underline bg-white rounded px-3 ">
          Click Action
        </AccordionTrigger>
        <AccordionContent className=" bg-white rounded p-2 ">
          <div>
            {/* <Label>Click Action</Label> */}
            <div className="grid grid-cols-3    ">
              {clickActionOptions.map((opt, index) => {
                const isSelected = opt.value === selectedClickAction;

                return (
                  <div key={index} className="text-center cursor-pointer">
                    <div
                      onClick={() => {
                        setSelectedClickAction(opt.value);
                        handelChangeClickAction(opt.value);
                      }}
                      className={`flex justify-center items-center rounded-full  h-10 w-10 place-self-center 
                   ${
                     isSelected
                       ? "ring-offset-[3px] ring-[3px] ring-purple-600 bg-[#FFF4EA]"
                       : "hover:ring-offset-2 ring-2 ring-slate-200 hover:ring-purple-300 hover:bg-[#FFF4EA] bg-muted "
                   }  
                   `}
                    >
                      <div
                        className={`${
                          selectedClickAction !== "link"
                            ? "text-slate-300"
                            : "text-purple-600"
                        }`}
                      >
                        {opt.value === "link" && <FaLink size={24} />}
                      </div>

                      <div
                        className={`${
                          selectedClickAction !== "action"
                            ? "text-slate-300"
                            : "text-purple-600"
                        }`}
                      >
                        {opt.value === "action" && (
                          <MdOutlineAdsClick size={24} />
                        )}
                      </div>

                      <div
                        className={`${
                          selectedClickAction !== "navigate"
                            ? "text-slate-300"
                            : "text-purple-600"
                        }`}
                      >
                        {opt.value === "navigate" && (
                          <IoNavigateSharp size={24} className="mr-1" />
                        )}
                      </div>
                    </div>

                    <p
                      className={`text-sm text-nowrap my-2 ${
                        isSelected ? "" : "text-slate-400"
                      }`}
                    >
                      {opt.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {selectedClickAction === "link" && (
              <div className="">
                <div className="flex items-center gap-x-2">
                  <Collapsible
                    open={selectedTarget && toggleOptions}
                    onOpenChange={setToggleOptions}
                    className="w-full"
                  >
                    <div className="flex justify-between w-full gap-x-1">
                      <div className="space-y-2 w-full mx-1">
                        <Label className="text-xs">Type</Label>
                        <Select
                          value={selectedTarget}
                          defaultValue={optionsTarget[0].options[0].value}
                          onValueChange={(value) => {
                            setSelectedTarget(value);
                            setToggleOptions(true);
                            handleChangeTargetLink("type", value);
                          }}
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent>
                            {optionsTarget.map((opt, index) => (
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

                      {selectedTarget && (
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="mt-7">
                            <ChevronsUpDown className="h-4 w-4" />
                            <span className="sr-only">Toggle</span>
                          </Button>
                        </CollapsibleTrigger>
                      )}
                    </div>

                    <CollapsibleContent className=" mt-2 p-2 shadow-lg rounded-md mb-1">
                      {selectedTarget === "url" && (
                        <div className="flex flex-col gap-y-4">
                          <Label>URL</Label>
                          <Input
                            value={urlValue}
                            onChange={(e) => {
                              setUrlValue(e.target.value);
                              handleChangeTargetLink("link", e.target.value);
                            }}
                          />

                          <div className="flex items-center justify-between ">
                            <Label>Open link in new tab</Label>
                            <Switch
                              checked={isOpenNewTabUrl}
                              onCheckedChange={(checked) => {
                                setIsOpenNewTabUrl(checked);
                                handleChangeTargetLink("isOpenNewTab", checked);
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {selectedTarget === "whatsapp" && (
                        <div className="flex flex-col gap-y-4">
                          <div>
                            <Label>Whatsapp Number</Label>
                            <Input
                              value={waNumber}
                              className="mt-2"
                              onChange={(e) => {
                                setWaNumber(e.target.value);
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
                              value={message}
                              className="mt-2"
                              onChange={(e) => {
                                setMessage(e.target.value);
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
                              checked={isOpenNewTabWa}
                              onCheckedChange={(checked) => {
                                setIsOpenNewTabWa(checked);
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

            {selectedClickAction === "action" && (
              <div className="flex items-center w-full gap-x-3">
                <div className="space-y-2 w-full mx-1">
                  <Label className="text-xs">Type</Label>
                  <Select
                    value={selectedActionMode}
                    defaultValue={actionModeOptions[0].value}
                    onValueChange={(value) => {
                      setSelectedActionMode(value);
                      handleChangeActionModeType("type", value);
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

                  {selectedActionMode === "scrollTarget" && (
                    <Select
                      value={scrollTargetValue}
                      defaultValue={scrollTargetValue}
                      onValueChange={(value) => {
                        setScrollTargetValue(value);
                        handleChangeScrollTargetValue(value);
                      }}
                    >
                      <SelectTrigger className="w-full">
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

                  {selectedActionMode === "popup" && (
                    <Select
                      value={popupValue}
                      onValueChange={(value) => {
                        setPopupValue(value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="" />
                      </SelectTrigger>

                      <SelectContent>
                        {globalOptions.popup.length > 0 ? (
                          globalOptions.popup.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
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

            {selectedClickAction === "navigate" && (
              <div className="space-y-2 w-full mx-1">
                <Label className="text-xs">Local Page</Label>

                <Select
                  value={localPageValue}
                  onValueChange={(value) => {
                    handleChangeLocalPageValue(value);
                    setLocalPageValue(value);
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TargetOptions;
