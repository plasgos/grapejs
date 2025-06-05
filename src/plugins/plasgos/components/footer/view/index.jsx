import { cn } from "@/lib/utils";
import { getContentFocusStyle } from "@/utils/getContentFocusStyle";
import "react-lazy-load-image-component/src/effects/blur.css";
import Heading from "./Heading";
import ViewContactInfo from "./ViewContactInfo";
import ViewGroupLink from "./ViewGroupLink";
import ViewImagesFooter from "./ViewImagesFooter";
import ViewNewsletter from "./ViewNewsletter";
import ViewSocialMedia from "./ViewSocialMedia";
import ViewText from "./ViewText";

const ViewFooter = ({ section, editor, isFocusContent }) => {
  const { contents, copyright, wrapperStyle } = section;

  const useSchemeColor =
    !!copyright?.copyrightTextColor &&
    copyright?.copyrightTextColor !== "__INLINE__";

  return (
    <div>
      <div className={`relative `}>
        <div
          style={{ gap: 50 }}
          className="flex flex-wrap  p-5 max-w-full md:justify-center "
        >
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
                    wrapperStyle={wrapperStyle}
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
                  <ViewContactInfo
                    content={content}
                    index={index}
                    wrapperStyle={wrapperStyle}
                  >
                    <Heading content={content} wrapperStyle={wrapperStyle} />
                  </ViewContactInfo>
                )}
                {content.type === "social-media" && (
                  <ViewSocialMedia
                    content={content}
                    index={index}
                    wrapperStyle={wrapperStyle}
                  >
                    <Heading content={content} wrapperStyle={wrapperStyle} />
                  </ViewSocialMedia>
                )}
                {content.type === "newsletter" && (
                  <ViewNewsletter
                    content={content}
                    index={index}
                    wrapperStyle={wrapperStyle}
                  >
                    <Heading content={content} wrapperStyle={wrapperStyle} />
                  </ViewNewsletter>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-3 border-t p-3">
          <div
            className={cn("rich-text break-all", {
              "with-scheme-color": useSchemeColor,
            })}
            style={{
              ...(useSchemeColor
                ? { "--richTextColor": copyright?.copyrightTextColor }
                : {}),
            }}
            dangerouslySetInnerHTML={{
              __html: copyright.text,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewFooter;
