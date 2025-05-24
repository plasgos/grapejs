import { onActionClickTarget } from "@/utils/onActionClickTarget";
import "react-lazy-load-image-component/src/effects/blur.css";

import ContainerView from "@/components/ContainerView";
import CustomButton from "../_components/CustomButton";
import { useGlobalOptions } from "@/hooks/useGlobalOptions";

const ViewButton = ({ section, editor, buildContainerStyle }) => {
  const [globalOptions] = useGlobalOptions(editor);
  const currentGlobalOptions = editor ? globalOptions : buildContainerStyle;

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
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
      buildContainerStyle={buildContainerStyle}
    >
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
    </ContainerView>
  );
};

export default ViewButton;
