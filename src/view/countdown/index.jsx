import ContainerView from "@/components/ContainerView";
import DateCountDown from "./DateCountDown";
import DurationCountdown from "./DurationCountdown";
import useAnimatedVisibility from "@/hooks/useAnimatedVisibility";

const ViewCountDown = ({ section, editor }) => {
  const { contents, animation } = section;

  const { elementRef, getClassName, duration } =
    useAnimatedVisibility(animation);

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
    >
      {contents.map((content) => {
        return (
          <div
            ref={elementRef}
            style={{
              "--animation-duration": `${duration}s`,
            }}
            key={content.id}
            className={`p-5 ${getClassName()}`}
          >
            {content.type === "date-time" && (
              <DateCountDown
                styles={section.wrapperStyle}
                content={content}
                finish={section.finish}
              />
            )}

            {content.type === "duration" && (
              <DurationCountdown
                styles={section.wrapperStyle}
                content={content}
                finish={section.finish}
              />
            )}
          </div>
        );
      })}
    </ContainerView>
  );
};

export default ViewCountDown;
