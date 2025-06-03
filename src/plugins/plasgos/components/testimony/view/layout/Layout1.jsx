import { useGlobalOptions } from "@/hooks/useGlobalOptions";
import { getContentFocusStyle } from "@/utils/getContentFocusStyle";
import { FaStar } from "react-icons/fa";
import { ImQuotesLeft } from "react-icons/im";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Layout1 = ({ content, styles, editor, buildContainerStyle }) => {
  const [globalOptions] = useGlobalOptions(editor);
  const currentGlobalOptions = editor ? globalOptions : buildContainerStyle;

  const { isFocusContent } = currentGlobalOptions;

  const {
    nameColor,
    fontWeight,
    fontFamily,
    fontSize,
    cardColor,
    borderColor,
    profectionColor,
    quoteColor,
    starsColor,
    starsSize,
    descriptionColor,
    descriptionFontWeight,
    descriptionFontFamily,
    descriptionFontSize,
    textAligment,
  } = styles;

  return (
    <div
      style={{
        backgroundColor: cardColor,
        border: `1px solid  ${borderColor}`,
      }}
      key={content.id}
      className={`  p-3 rounded-lg  shadow      ${getContentFocusStyle(
        isFocusContent,
        content.id
      )}`}
    >
      <div className="">
        <ImQuotesLeft color={quoteColor} size={36} />
      </div>
      <div className="flex flex-col items-center gap-y-5">
        <div className="w-20 h-20 rounded-full  overflow-hidden shadow-md">
          <LazyLoadImage
            src={content?.image}
            alt="avatar"
            style={{
              width: "100%",
              height: "100%",
            }}
            className={`object-cover  ${
              content?.target?.options?.type ? "cursor-pointer" : ""
            }`}
            effect="blur"
            wrapperProps={{
              style: { transitionDelay: "1s" },
            }}
          />
        </div>
        <div className="flex  gap-x-1">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              color={index < content.stars ? starsColor : "#ccc"}
              size={starsSize}
            />
          ))}
        </div>

        <div className={`h-[120px] overflow-y-auto ${textAligment}  `}>
          <p
            style={{
              color: descriptionColor,
              fontFamily: descriptionFontFamily,
              fontSize: descriptionFontSize,
              fontWeight: descriptionFontWeight,
            }}
            className={`w-full break-all`}
          >
            {content.description}
          </p>
        </div>

        <div className="text-center">
          <p
            style={{
              color: nameColor,
              fontFamily,
              fontSize,
              fontWeight,
            }}
            className={`w-full break-all `}
          >
            {content.name}
          </p>
          <p
            style={{
              color: profectionColor,
            }}
            className="text-muted-foreground text-sm"
          >
            {content.profetion}
          </p>
        </div>
      </div>
      <div className=" flex justify-end  ">
        <ImQuotesLeft color={quoteColor} className="rotate-180" size={36} />
      </div>
    </div>
  );
};

export default Layout1;
