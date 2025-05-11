import ContainerView from "@/components/ContainerView";

import "react-lazy-load-image-component/src/effects/blur.css";
import ViewImagesFooter from "./ViewImagesFooter";
import ViewGroupLink from "./ViewGroupLink";
import ViewText from "./ViewText";
import ViewContactInfo from "./ViewContactInfo";
import ViewSocialMedia from "./ViewSocialMedia";
import ViewNewsletter from "./ViewNewsletter";
import Heading from "./Heading";
import { useSelector } from "react-redux";
import { getContentFocusStyle } from "@/utils/getContentFocusStyle";

const ViewFooter = ({ section, editor, index }) => {
  const { isFocusContent } = useSelector((state) => state.landingPage);

  const { contents, copyright, wrapperStyle } = section;

  const editorModel = editor.getModel();
  const globalOptions = editorModel.get("globalOptions");

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
      index={index}
      isFullwidth={true}
    >
      <div
        style={{
          maxWidth: globalOptions.maxWidthPage,
        }}
        className={` mx-auto relative `}
      >
        <div style={{ gap: 50 }} className="flex flex-wrap  p-5 max-w-full ">
          {contents.map((content, index) => {
            return (
              <div
                key={index}
                className={`  ${getContentFocusStyle(
                  isFocusContent,
                  content.id
                )}  `}
              >
                {content.type === "images" && (
                  <ViewImagesFooter
                    content={content}
                    index={index}
                    editor={editor}
                  >
                    <Heading content={content} wrapperStyle={wrapperStyle} />
                  </ViewImagesFooter>
                )}
                {content.type === "group-link" && (
                  <ViewGroupLink
                    content={content}
                    index={index}
                    editor={editor}
                  >
                    <Heading content={content} wrapperStyle={wrapperStyle} />
                  </ViewGroupLink>
                )}
                {content.type === "text" && (
                  <ViewText content={content} index={index}>
                    <Heading content={content} wrapperStyle={wrapperStyle} />
                  </ViewText>
                )}
                {content.type === "contact-info" && (
                  <ViewContactInfo content={content} index={index}>
                    <Heading content={content} wrapperStyle={wrapperStyle} />
                  </ViewContactInfo>
                )}
                {content.type === "social-media" && (
                  <ViewSocialMedia content={content} index={index}>
                    <Heading content={content} wrapperStyle={wrapperStyle} />
                  </ViewSocialMedia>
                )}
                {content.type === "newsletter" && (
                  <ViewNewsletter content={content} index={index}>
                    <Heading content={content} wrapperStyle={wrapperStyle} />
                  </ViewNewsletter>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-3 border-t p-3">
          <div
            className="break-all"
            style={{
              lineHeight: 1.4,
              color: section?.wrapperStyle?.colorDescription,
            }}
            dangerouslySetInnerHTML={{
              __html: copyright?.text,
            }}
          />
        </div>
      </div>
    </ContainerView>
  );
};

export default ViewFooter;
