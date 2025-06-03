import ContainerView from "@/components/ContainerView";
import useAnimatedVisibility from "@/hooks/useAnimatedVisibility";
import "react-lazy-load-image-component/src/effects/blur.css";

import { useGlobalOptions } from "@/hooks/useGlobalOptions";
import { cn } from "@/lib/utils";

const ViewText = ({ section, editor, buildContainerStyle }) => {
  const { contents, animation, animationText } = section;

  const [globalOptions] = useGlobalOptions(editor);
  const currentGlobalOptions = editor ? globalOptions : buildContainerStyle;

  const { maxWidthPage } = currentGlobalOptions || {};
  const { elementRef, getClassName, duration } =
    useAnimatedVisibility(animation);

  const {
    elementRef: elementRefContent,
    getClassName: getClassNameContent,
    duration: durationContent,
  } = useAnimatedVisibility(animationText);

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
      buildContainerStyle={buildContainerStyle}
    >
      {contents.map((content) => {
        const useSchemeColor =
          !!content?.textColor && content?.textColor !== "__INLINE__";

        return (
          <div
            key={content.id}
            className={cn(" relative px-5 rich-text break-all", {
              "with-scheme-color": useSchemeColor,
            })}
            style={{
              textShadow: content?.textShadow,
              ...(useSchemeColor
                ? { "--richTextColor": content?.textColor }
                : {}),
            }}
            dangerouslySetInnerHTML={{
              __html: content.text,
            }}
          />
        );
      })}
    </ContainerView>
  );
};

export default ViewText;
