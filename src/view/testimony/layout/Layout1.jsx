import { getContentFocusStyle } from "@/utils/getContentFocusStyle";
import { FaStar } from "react-icons/fa";
import { ImQuotesLeft } from "react-icons/im";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useSelector } from "react-redux";

const Layout1 = ({ content, styles }) => {
  const { isFocusContent } = useSelector((state) => state.landingPage);

  const {
    nameColor,
    fontWeight,
    fontFamily,
    fontSize,
    bgColor,
    borderColor,
    profectionColor,
    quoteColor,
    starsColor,
    starsSize,
  } = styles;
  return (
    <div
      style={{
        backgroundColor: bgColor,
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

        <div className="h-[120px] overflow-y-auto">
          <div
            className="text-muted-foreground text-center text-base"
            style={{
              textShadow: content?.textShadow,
            }}
            dangerouslySetInnerHTML={{
              __html: content.description,
            }}
          />
        </div>

        <div className="text-center">
          <p
            style={{
              color: nameColor,
              fontFamily: fontFamily,
              fontSize: fontSize,
            }}
            className={`w-full break-all ${fontFamily} ${fontWeight}`}
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
