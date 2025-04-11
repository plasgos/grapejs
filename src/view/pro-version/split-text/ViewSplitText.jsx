import ContainerView from "@/components/ContainerView";
import SplitText from "@/components/pro-version/SplitText";

const ViewSplitText = ({ section, editor }) => {
  const { text, delay, fontFamily, fontWeight, color, fontSize, textAlign } =
    section;

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
    >
      <div className={`p-10 ${textAlign} `}>
        <SplitText
          style={{
            fontFamily,
            fontWeight,
            color,
            fontSize,
          }}
          text={text}
          delay={delay}
          animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
        />
      </div>
    </ContainerView>
  );
};

export default ViewSplitText;
