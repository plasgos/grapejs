import ContainerView from "@/components/ContainerView";
import SplitText from "@/components/pro-version/SplitText";
import "react-lazy-load-image-component/src/effects/blur.css";

const ViewSplitText = ({ section, editor }) => {
  const { text, delay } = section;

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
    >
      <div className="p-10">
        <SplitText
          text={text}
          className="text-2xl font-semibold text-center"
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
