import ContainerView from "@/components/ContainerView";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { IoLogoAngular } from "react-icons/io5";
import { useSelector } from "react-redux";

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
  const { isFocusContent } = useSelector((state) => state.landingPage);

  const { contents, side, logoWidth, wrapperStyle } = section;
  const [responsiveImage, setResponsiveImage] = useState(section.logoWidth);
  const [isActiveSheet, setIsActiveSheet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const target = document.querySelector(".gjs-frame");

  const editorModel = editor.getModel();
  const globalOptions = editorModel.get("globalOptions");

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
        <div onClick={handleScrollToTop}>
          <LazyLoadImage
            src={section?.logo}
            alt={"logo"}
            style={{
              width: responsiveImage,
            }}
            className={`object-contain cursor-pointer relative z-10" `}
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
              <NavigationMenuItem>
                <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <IoLogoAngular className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            shadcn/ui
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Beautifully designed components built with Radix UI
                            and Tailwind CSS.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/docs" title="Introduction">
                      Re-usable components built using Radix UI and Tailwind
                      CSS.
                    </ListItem>
                    <ListItem href="/docs/installation" title="Installation">
                      How to install dependencies and structure your app.
                    </ListItem>
                    <ListItem
                      href="/docs/primitives/typography"
                      title="Typography"
                    >
                      Styles for headings, paragraphs, lists...etc
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {contents.map((content) => (
                <div
                  key={content.id}
                  className={`  ${getContentFocusStyle(
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
          maxWidth: globalOptions.maxWidthPage,
        }}
        className={` mx-auto relative z-10`}
      >
        <div className="flex items-center justify-between  mx-3">
          {!isActiveSheet && <>{renderNavbarItems()}</>}
          <Sheet open={isActiveSheet} onOpenChange={setIsActiveSheet}>
            <SheetTrigger asChild>
              {!isActiveSheet && isMobile && (
                <Button onClick={() => setIsActiveSheet(true)} variant="ghost">
                  <TfiMenuAlt className="scale-125" />
                </Button>
              )}
            </SheetTrigger>

            <CustomPortal>
              <SheetContent side={side} className="w-[375px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle className="hidden">X</SheetTitle>
                  <SheetDescription className="hidden">X</SheetDescription>
                </SheetHeader>

                <div className="flex flex-col gap-y-5">
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

const ListItem = forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
