import ContainerView from "@/components/ContainerView";
import DateCountDown from "./DateCountDown";
import DurationCountdown from "./DurationCountdown";

const ViewCountDown = ({ section }) => {
  const { contents } = section;
  console.log("🚀 ~ ViewCountDown ~ section:", section);

  return (
    <ContainerView id={section?.scrollTarget?.value || ""} section={section}>
      {contents.map((content) => {
        return (
          <div key={content.id} className="p-5">
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
