import ContainerView from "@/components/ContainerView";

import "react-lazy-load-image-component/src/effects/blur.css";
import ViewImagesFooter from "./ViewImagesFooter";

const ViewFooter = ({ section, editor }) => {
  const { contents } = section;

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
    >
      <div className="flex flex-wrap gap-5 items-center justify-center p-5 ">
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
            </div>
          );
        })}
      </div>
    </ContainerView>
  );
};

export default ViewFooter;
