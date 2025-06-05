import "react-lazy-load-image-component/src/effects/blur.css";

import { cn } from "@/lib/utils";

const ViewText = ({ section }) => {
  const { contents } = section;

  return (
    <div>
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
    </div>
  );
};

export default ViewText;
