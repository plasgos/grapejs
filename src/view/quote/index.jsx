import ContainerView from "@/components/ContainerView";
import useAnimatedVisibility from "@/hooks/useAnimatedVisibility";
import { cn } from "@/lib/utils";
import "react-lazy-load-image-component/src/effects/blur.css";

const ViewQuote = ({ section, editor }) => {
  const { contents, animation } = section;

  const {
    elementRef: elementRefContent,
    getClassName: getClassNameContent,
    duration: durationContent,
  } = useAnimatedVisibility(animation);

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
    >
      {contents.map((content) => {
        const {
          quoteText,
          quoteTagColor,
          quoteTextColor,
          writer,
          writerColor,
          fontSize,
        } = content;

        const useSchemeColor = !!content?.quoteTextColor;

        return (
          <div
            key={content.id}
            ref={elementRefContent}
            style={{
              "--animation-duration": `${durationContent}s`,
            }}
            className={`flex flex-col items-center p-3 w-full  z-10 ${getClassNameContent()} `}
          >
            <div className="flex shrink-0 items-center w-full justify-center ">
              <span
                style={{ fontSize: 40, color: quoteTagColor }}
                className="font-bold  self-start"
              >
                “
              </span>

              <div
                className={cn("rich-text break-all mx-3", {
                  "with-scheme-color": useSchemeColor,
                })}
                style={{
                  textShadow: content?.textShadow,
                  ...(useSchemeColor
                    ? { "--richTextColor": quoteTextColor }
                    : {}),
                }}
                dangerouslySetInnerHTML={{
                  __html: quoteText,
                }}
              />

              <span
                style={{
                  fontSize: 40,
                  color: quoteTagColor,
                }}
                className="font-bold  self-end"
              >
                ”
              </span>
            </div>

            <div style={{ color: writerColor }} className="mt-3">
              {writer}
            </div>
          </div>
        );
      })}
    </ContainerView>
  );
};

export default ViewQuote;
