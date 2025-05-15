import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { darkenRgbaColor } from "@/utils/darkenRgbaColor";
import { onActionClickTarget } from "@/utils/onActionClickTarget";
import { useState } from "react";
import Heading from "./Heading";

const ViewSingleLinkNavbar = ({
  content,
  editor,
  styles,
  headingColorPrimary,
}) => {
  const [isHover, setIsHover] = useState(false);

  const { headingColor, headingFontSize, fontWeight, fontFamily } = styles;

  const hoverColorConversion = darkenRgbaColor(headingColor, 0.3);

  return (
    <NavigationMenuItem key={content?.id}>
      <div
        className={`hover:font-semibold   data-[state=open]:font-semibold cursor-pointer`}
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
      </div>
    </NavigationMenuItem>
  );
};

export default ViewSingleLinkNavbar;
