import ContainerView from "@/components/ContainerView";

const ViewEmptySpace = ({ section, editor, buildContainerStyle }) => {
  const { height } = section.mainStyle || {};

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
      buildContainerStyle={buildContainerStyle}
    >
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
