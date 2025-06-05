import { onActionClickTarget } from "@/utils/onActionClickTarget";
import CustomButton from "../../_components-view/CustomButton";

const ViewButton = ({ section, editor, currentGlobalOptions }) => {
  const { buttons } = section;
  const { position, align } = section.mainStyle;

  const classesPositionRow =
    position === "flex-row" && `flex-row ${align} items-center`;

  const classesPositionCol =
    position === "flex-col" &&
    `flex-col  ${
      align === "justify-start"
        ? "items-start"
        : align === "justify-center"
        ? "items-center"
        : "items-end"
    }`;

  return (
    <div>
      <div
        className={`flex ${classesPositionRow} ${classesPositionCol}  w-full ${
          position === "flex-col" ? "gap-y-3" : "gap-x-3"
        } p-2 relative `}
      >
        {buttons.map((btn) => {
          return (
            <CustomButton
              key={btn.id}
              btn={btn}
              editor={editor}
              onActionClickTarget={onActionClickTarget}
              currentGlobalOptions={currentGlobalOptions}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ViewButton;
