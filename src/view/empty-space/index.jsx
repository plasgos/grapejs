import ContainerView from "@/components/ContainerView";

const ViewEmptySpace = ({ section, editor }) => {
  const { height } = section.mainStyle;

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
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
