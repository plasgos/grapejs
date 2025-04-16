import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { onActionClickTarget } from "@/utils/onActionClickTarget";
import Heading from "./Heading";
import { darkenRgbaColor } from "@/utils/darkenRgbaColor";
import { useState } from "react";

const ViewSingleLinkNavbar = ({ content, editor, styles }) => {
  const [isHover, setIsHover] = useState(false);

  const { headingColor, headingFontSize, fontWeight, fontFamily } = styles;

  const hoverColorConversion = darkenRgbaColor(headingColor, 0.3);

  return (
    <NavigationMenuItem key={content?.id}>
      <NavigationMenuLink
        className={`hover:font-semibold  px-5 data-[state=open]:font-semibold cursor-pointer`}
        onClick={() => onActionClickTarget(content?.target, editor)}
        style={{
          color: isHover ? hoverColorConversion : headingColor,
          fontSize: headingFontSize,
          fontWeight,
          fontFamily,
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Heading content={content} />
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default ViewSingleLinkNavbar;
