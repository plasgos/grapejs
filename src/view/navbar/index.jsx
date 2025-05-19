import ContainerView from "@/components/ContainerView";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import { TfiMenuAlt } from "react-icons/tfi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const componentsNavbar = [
  {
    label: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    label: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    label: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    label: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    label: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    label: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

import { useGlobalOptions } from "@/hooks/useGlobalOptions";
import { getContentFocusStyle } from "@/utils/getContentFocusStyle";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ViewMenuNavbar from "./_components/ViewMenuNavbar";
import ViewSingleLinkNavbar from "./_components/ViewSingleLinkNavbar";

const CustomPortal = ({ children }) => {
  const [target, setTarget] = useState(null);
  useEffect(() => {
    const el = document.querySelector(".gjs-frame");
    if (el) {
      setTarget(el);
    }
  }, []);

  if (!target) return null;
  return createPortal(children, target);
};

const ViewNavbar = ({ section, editor }) => {
  const [globalOptions] = useGlobalOptions(editor);
  const { isFocusContent, maxWidthPage } = globalOptions || {};

  const { contents, side, logoWidth, wrapperStyle } = section;

  const [responsiveImage, setResponsiveImage] = useState(section.logoWidth);
  const [isActiveSheet, setIsActiveSheet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleScrollToTop = () => {
    const iframe = document.querySelector(".gjs-frame");

    if (iframe) {
      iframe.contentWindow.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleResponsive = () => {
      const wrapper = editor.getWrapper();
      const wrapperDomEl = wrapper.view?.el;
      const width = wrapperDomEl?.clientWidth || 0;

      if (width <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setIsActiveSheet(false);
      }
    };

    handleResponsive();

    const iframe = editor?.Canvas.getFrameEl();
    const iframeWindow = iframe?.contentWindow;
    if (!iframeWindow) return;

    iframeWindow.addEventListener("resize", handleResponsive);

    return () => {
      iframeWindow.removeEventListener("resize", handleResponsive);
    };
  }, [editor]);

  useEffect(() => {
    const baseImageSize =
      typeof fontSize === "number" ? section.logoWidth : 150;
    const handleResize = () => {
      const wrapper = editor.getWrapper();
      const wrapperDomEl = wrapper.view?.el;
      const width = wrapperDomEl?.clientWidth || 0;

      const isMobile = width <= 768;

      const adjustedImage = isMobile ? baseImageSize * 0.7 : logoWidth;
      setResponsiveImage(adjustedImage);
    };

    handleResize();

    const iframe = editor?.Canvas.getFrameEl();
    const iframeWindow = iframe?.contentWindow;
    if (!iframeWindow) return;

    iframeWindow.addEventListener("resize", handleResize);

    return () => {
      iframeWindow.removeEventListener("resize", handleResize);
    };
  }, [editor, isActiveSheet, logoWidth, section.logoWidth]);

  const renderNavbarItems = () => {
    return (
      <>
        <div
          className={` ${isActiveSheet && "border-b"} `}
          onClick={handleScrollToTop}
        >
          <LazyLoadImage
            src={section?.logo}
            alt={"logo"}
            style={{
              width: responsiveImage,
            }}
            className={`object-contain cursor-pointer relative " `}
            effect="blur"
            wrapperProps={{
              style: { transitionDelay: "0.5s" },
            }}
          />
        </div>
        <div className={`${isMobile === isActiveSheet ? "block" : "hidden"}`}>
          <NavigationMenu>
            <NavigationMenuList
              className={` ${
                isActiveSheet && "flex flex-col gap-y-5 items-start"
              }  `}
            >
              {contents.map((content) => (
                <div
                  key={content.id}
                  className={`   ${getContentFocusStyle(
                    isFocusContent,
                    content.id
                  )}  `}
                >
                  {content.type === "single-link" && (
                    <ViewSingleLinkNavbar
                      content={content}
                      editor={editor}
                      styles={wrapperStyle}
                    />
                  )}

                  {content.type === "menu-link" && (
                    <ViewMenuNavbar
                      content={content}
                      editor={editor}
                      isMobile={isMobile}
                      styles={wrapperStyle}
                    />
                  )}
                </div>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="w-[20px] h-[20px] hidden lg:block"></div>
      </>
    );
  };

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
      isFullwidth={true}
    >
      <div
        style={{
          maxWidth: maxWidthPage,
        }}
        className={` mx-auto relative  w-full`}
      >
        <div className="flex items-center justify-between  mx-3">
          {!isActiveSheet && <>{renderNavbarItems()}</>}

          <Sheet open={isActiveSheet} onOpenChange={setIsActiveSheet}>
            <SheetTrigger asChild>
              {!isActiveSheet && isMobile && (
                <Button
                  className={`bg-transparent hover:bg-transparent`}
                  onClick={() => setIsActiveSheet(true)}
                  variant=""
                >
                  <TfiMenuAlt
                    color={`${wrapperStyle.headingColor}`}
                    className={`scale-125`}
                  />
                </Button>
              )}
            </SheetTrigger>

            <CustomPortal>
              <SheetContent
                style={{
                  backgroundColor: wrapperStyle.bgColorSidebar,
                }}
                side={side}
                className="w-[375px] sm:w-[540px] pr-0"
              >
                <SheetHeader>
                  <SheetTitle className="hidden">X</SheetTitle>
                  <SheetDescription className="hidden">X</SheetDescription>
                </SheetHeader>

                <div className="flex flex-col gap-y-5 h-screen overflow-y-auto pr-5 pb-5 ">
                  {renderNavbarItems()}
                </div>
              </SheetContent>
            </CustomPortal>
          </Sheet>
        </div>
      </div>
    </ContainerView>
  );
};

export default ViewNavbar;
