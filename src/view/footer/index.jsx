import ContainerView from "@/components/ContainerView";

import "react-lazy-load-image-component/src/effects/blur.css";
import ViewImagesFooter from "./ViewImagesFooter";
import ViewGroupLink from "./ViewGroupLink";
import ViewText from "./ViewText";
import ViewContactInfo from "./ViewContactInfo";

const ViewFooter = ({ section, editor }) => {
  const { contents, copyright } = section;

  const editorModel = editor.getModel();
  const globalOptions = editorModel.get("globalOptions");

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
      isFullwidth={true}
    >
      <div
        style={{
          maxWidth: globalOptions.maxWidthPage,
        }}
        className={` mx-auto`}
      >
        <div style={{ gap: 50 }} className="flex flex-wrap  p-5 max-w-full ">
          {contents.map((content, index) => {
            return (
              <div key={index}>
                {content.type === "images" && (
                  <ViewImagesFooter
                    content={content}
                    index={index}
                    editor={editor}
                  />
                )}
                {content.type === "group-link" && (
                  <ViewGroupLink
                    content={content}
                    index={index}
                    editor={editor}
                  />
                )}
                {content.type === "text" && (
                  <ViewText content={content} index={index} />
                )}
                {content.type === "contact-info" && (
                  <ViewContactInfo content={content} index={index} />
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
