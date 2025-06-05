import ScrollReveal from "@/components/pro-version/ScrollReveal";
import { useResponsiveViewFontSize } from "@/hooks/useResponsiveViewFontSize";

const ViewScrollReveal = ({ section, editor }) => {
  const { text, delay, fontFamily, fontWeight, color, fontSize, textAlign } =
    section;

  const { responsiveFontSize } = useResponsiveViewFontSize(editor, fontSize);

  const iframe = editor?.Canvas.getFrameEl();
  const iframeWindow = iframe?.contentWindow;

  return (
    <div>
      <ScrollReveal
        baseOpacity={0}
        enableBlur={true}
        baseRotation={5}
        blurStrength={10}
        editor={editor}
        scrollContainerRef={iframeWindow}
      >
        {text}
      </ScrollReveal>
    </div>
  );
};

export default ViewScrollReveal;
