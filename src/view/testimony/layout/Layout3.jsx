import { FaStar } from "react-icons/fa";
import { ImQuotesLeft } from "react-icons/im";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useSelector } from "react-redux";

const Layout3 = ({ content, styles }) => {
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
      className={`p-3 rounded-lg shadow relative    ${
        isFocusContent === content.id &&
        "ring-2 ring-purple-600  bg-orange-100 transition-all duration-300 ease-in-out "
      } `}
    >
      <div className="">
        <ImQuotesLeft color={quoteColor} size={36} />
      </div>
      <div className="flex flex-col  gap-y-5">
        <div className="h-[120px] overflow-y-auto mt-2">
          <div
            className="text-muted-foreground text-base"
            style={{
              textShadow: content?.textShadow,
            }}
            dangerouslySetInnerHTML={{
              __html: content.description,
            }}
          />
        </div>

        <div className="flex  gap-x-3 items-center mb-5">
          <div className="w-16 h-16 rounded-full  overflow-hidden shadow-md flex-shrink-0   ">
            <LazyLoadImage
              src={content?.image}
              alt="avatar"
              className={`object-cover w-full h-full `}
              effect="blur"
              wrapperProps={{
                style: { transitionDelay: "1s" },
              }}
            />
          </div>

          <div>
            <p
              style={{
                color: nameColor,
                fontFamily: fontFamily,
                fontSize: fontSize,
              }}
              className={`w-full break-all  ${fontFamily} ${fontWeight}`}
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

          <div className="flex flex-wrap  gap-x-1 ml-auto">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                color={index < content.stars ? starsColor : "#ccc"}
                size={starsSize}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute right-3 bottom-0    ">
        <ImQuotesLeft color={quoteColor} className="rotate-180" size={36} />
      </div>
    </div>
  );
};

export default Layout3;
