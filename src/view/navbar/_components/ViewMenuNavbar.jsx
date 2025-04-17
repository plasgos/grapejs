import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { onActionClickTarget } from "@/utils/onActionClickTarget";
import { forwardRef } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Heading from "./Heading";
import { useState } from "react";
import { darkenRgbaColor } from "@/utils/darkenRgbaColor";

const ViewMenuNavbar = ({ content, editor, isMobile, styles }) => {
  const {
    headingColor,
    headingFontSize,
    fontWeight,
    fontFamily,
    description,
    menuBgColor,
  } = styles;

  const { column } = content;

  const columnClass =
    column === "4"
      ? "md:grid-cols-4"
      : column === "3"
      ? "md:grid-cols-3"
      : column === "2"
      ? "md:grid-cols-2"
      : "md:grid-cols-1";

  const [isHover, setIsHover] = useState(false);
  const hoverColorConversion = darkenRgbaColor(headingColor, 0.1);

  return (
    <NavigationMenuItem className="w-full">
      {isMobile ? (
        <Accordion className="" type="single" collapsible>
          <AccordionItem className="!rounded-lg" value={content?.id}>
            <AccordionTrigger
              style={{
                color: isHover ? hoverColorConversion : headingColor,
                fontSize: headingFontSize,
                fontWeight,
                fontFamily,
              }}
              className="!no-underline  py-0 text-base font-normal hover:font-semibold flex w-full justify-between "
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <Heading content={content} />
            </AccordionTrigger>
            <AccordionContent
              style={{
                backgroundColor: menuBgColor,
              }}
              className="p-2   "
            >
              {content.options.map((opt) => (
                <ListItem
                  key={opt.id}
                  title={opt.label}
                  onClick={() => onActionClickTarget(opt?.target, editor)}
                  styles={{
                    fontWeight,
                    fontFamily,
                    color: headingColor,
                  }}
                  descriptionStyle={description}
                  menuBgColor={menuBgColor}
                >
                  {opt.description}
                </ListItem>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <>
          <NavigationMenuTrigger
            style={{
              color: isHover ? hoverColorConversion : headingColor,
              fontSize: headingFontSize,
              fontWeight,
              fontFamily,
            }}
            className=""
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <Heading content={content} />
          </NavigationMenuTrigger>

          <NavigationMenuContent
            style={{
              backgroundColor: menuBgColor,
            }}
            className={``}
          >
            <ul
              className={`grid  ${
                column === "1"
                  ? "w-[300px] "
                  : "lg:w-[600px] w-[400px] md:w-[500px]"
              }     ${columnClass} gap-3 p-4  `}
            >
              {content.options.map((opt) => (
                <ListItem
                  key={opt.id}
                  title={opt.label}
                  onClick={() => onActionClickTarget(opt?.target, editor)}
                  styles={{
                    fontWeight,
                    fontFamily,
                    color: headingColor,
                  }}
                  descriptionStyle={description}
                  menuBgColor={menuBgColor}
                >
                  {opt.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </>
      )}
    </NavigationMenuItem>
  );
};

export default ViewMenuNavbar;

const ListItem = forwardRef(
  (
    { className, title, descriptionStyle, menuBgColor, children, ...props },
    ref
  ) => {
    const [isHover, setIsHover] = useState(false);

    const hoverColorConversion = darkenRgbaColor(menuBgColor, 0.3);

    return (
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer",
            className
          )}
          {...props}
          style={{
            backgroundColor:
              isHover && menuBgColor
                ? hoverColorConversion
                : isHover && !menuBgColor
                ? "rgba(245, 245, 245, 1)"
                : "",
          }}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div
            style={{
              ...props.styles,
            }}
            className="text-sm font-medium leading-none"
          >
            {title}
          </div>
          <p
            style={{
              ...descriptionStyle,
            }}
            className="line-clamp-2 text-sm leading-snug text-muted-foreground"
          >
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    );
  }
);
ListItem.displayName = "ListItem";
