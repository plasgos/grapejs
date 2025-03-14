import ContainerView from "@/components/ContainerView";

const ViewDivider = ({ section }) => {
  const {
    height,
    width1,
    width2,
    distance,
    isFlip,
    isFloating,
    color1,
    color2,
    variant,
    heightBasicLine,
    colorBasicLine,
  } = section.wrapperStyle;

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      section={section}
    ></ContainerView>
  );
};

export default ViewDivider;
