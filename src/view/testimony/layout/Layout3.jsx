import { useGlobalOptions } from "@/hooks/useGlobalOptions";
import { getColorOverride } from "@/utils/getColorOverride";
import { getContentFocusStyle } from "@/utils/getContentFocusStyle";
import { FaStar } from "react-icons/fa";
import { ImQuotesLeft } from "react-icons/im";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Layout3 = ({
  content,
  styles,
  editor,
  isOverrideSchemeColor,
  colorScheme,
}) => {
  const [globalOptions] = useGlobalOptions(editor);
  const { schemeColor, isFocusContent } = globalOptions || {};

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
    descriptionColor,
  } = styles;

  const primaryDescriptionColor = getColorOverride(
    schemeColor,
    isOverrideSchemeColor,
    descriptionColor,
    `#${colorScheme?.primary}`
  );

  const secondaryColorProfetion = getColorOverride(
    schemeColor,
    isOverrideSchemeColor,
    profectionColor,
    `#${colorScheme?.secondary}`
  );

  const primaryColorName = getColorOverride(
    schemeColor,
    isOverrideSchemeColor,
    nameColor,
    `#${colorScheme?.primary}`
  );

  return (
    <div
      style={{
        backgroundColor: bgColor,
        border: `1px solid  ${borderColor}`,
      }}
      key={content.id}
      className={`p-3 rounded-lg shadow relative     ${getContentFocusStyle(
        isFocusContent,
        content.id
      )} `}
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
              color: primaryDescriptionColor,
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
                color: primaryColorName,
                fontFamily: fontFamily,
                fontSize: fontSize,
              }}
              className={`w-full break-all  ${fontFamily} ${fontWeight}`}
            >
              {content.name}
            </p>
            <p
              style={{
                color: secondaryColorProfetion,
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
