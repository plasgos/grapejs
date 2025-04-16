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
  const [isHover, setIsHover] = useState(false);

  const { headingColor, headingFontSize, fontWeight, fontFamily, description } =
    styles;

  const { column } = content;

  const columnClass =
    column === "4"
      ? "md:grid-cols-4"
      : column === "3"
      ? "md:grid-cols-3"
      : column === "2"
      ? "md:grid-cols-2"
      : "md:grid-cols-1";

  const hoverColorConversion = darkenRgbaColor(headingColor, 0.3);

  return (
    <NavigationMenuItem className="w-full">
      {isMobile ? (
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger
              style={{
                color: headingColor,
                fontSize: headingFontSize,
                fontWeight,
                fontFamily,
              }}
              className="!no-underline  py-0 text-base font-normal hover:font-semibold flex w-full justify-between "
            >
              <Heading content={content} />
            </AccordionTrigger>
            <AccordionContent className="p-2 ">
              {content.options.map((opt) => (
                <ListItem
                  key={opt.title}
                  title={opt.title}
                  onClick={() => onActionClickTarget(opt?.target, editor)}
                  styles={{
                    fontWeight,
                    fontFamily,
                    color: headingColor,
                  }}
                  descriptionStyle={description}
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

          <NavigationMenuContent className={``}>
            <ul
              className={`grid w-[400px] gap-3 p-4 md:w-[500px] ${columnClass} lg:w-[600px]  `}
            >
              {content.options.map((opt) => (
                <ListItem
                  key={opt.label}
                  title={opt.label}
                  onClick={() => onActionClickTarget(opt?.target, editor)}
                  styles={{
                    fontWeight,
                    fontFamily,
                    color: headingColor,
                  }}
                  descriptionStyle={description}
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
  ({ className, title, descriptionStyle, children, ...props }, ref) => {
    return (
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer",
            className
          )}
          {...props}
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
