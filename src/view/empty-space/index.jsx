import ContainerView from "@/components/ContainerView";

const ViewEmptySpace = ({ section }) => {
  const { height } = section.wrapperStyle;

  return (
    <ContainerView id={section?.scrollTarget?.value || ""} section={section}>
      <div
        style={{
          width: "100%",
          height,
        }}
      />
    </ContainerView>
  );
};

export default ViewEmptySpace;
