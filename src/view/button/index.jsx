import { onActionClickTarget } from "@/utils/onActionClickTarget";
import "react-lazy-load-image-component/src/effects/blur.css";

import CustomButton from "../_components/CustomButton";
import ContainerView from "@/components/ContainerView";

const ViewButton = ({ section, editor }) => {
  const { contents } = section;
  console.log("🚀 ~ ViewButton ~ contents:", contents);
  const { position, align } = section.wrapperStyle;

  return (
    <ContainerView id={section?.scrollTarget?.value || ""} section={section}>
      <div
        className={`flex ${position} ${align}  items-center  w-full ${
          position === "flex-col" ? "gap-y-3" : "gap-x-3"
        } p-2  `}
      >
        {contents.map((btn) => {
          return (
            <CustomButton
              key={btn.id}
              btn={btn}
              editor={editor}
              onActionClickTarget={onActionClickTarget}
            />
          );
        })}
      </div>
    </ContainerView>
  );
};

export default ViewButton;
