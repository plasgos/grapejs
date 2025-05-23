import { onActionClickTarget } from "@/utils/onActionClickTarget";
import "react-lazy-load-image-component/src/effects/blur.css";

import CustomButton from "../_components/CustomButton";

const ViewFLoatingButton = ({ section, editor, buildContainerStyle }) => {
  const { buttons } = section;
  const { position } = section.mainStyle;

  return (
    <div
      style={{
        bottom: 20,
      }}
      className="fixed z-10 w-full"
    >
      <div
        className={`flex ${position} justify-center items-center w-full ${
          position === "flex-col" ? "gap-y-3" : "gap-x-3"
        } px-2  `}
      >
        {buttons.map((btn) => {
          return (
            <CustomButton
              key={btn.id}
              btn={btn}
              editor={editor}
              onActionClickTarget={onActionClickTarget}
              fullWidth
            />
          );
        })}
      </div>
    </div>
  );
};

export default ViewFLoatingButton;
