import ContainerView from "@/components/ContainerView";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const ViewFAQ = ({ section, editor }) => {
  const { isFocusContent } = useSelector((state) => state.landingPage);

  const { contents } = section;
  const {
    textShadow,
    color,
    fontWeight,
    fontFamily,
    fontSize,
    borderColor,
    iconColor,
    variant,
  } = section.wrapperStyle;
  const [openItems, setOpenItems] = useState([]);
  const contentRefs = useRef({});
  const prevVariant = useRef(variant);

  const toggleItem = (id) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(id)
        ? prevOpenItems.filter((itemId) => itemId !== id)
        : [...prevOpenItems, id]
    );
  };

  useEffect(() => {
    Object.entries(contentRefs.current).forEach(([id, el]) => {
      if (el) {
        el.style.transition = "max-height 0.3s ease-in-out";
        el.style.maxHeight = openItems.includes(id)
          ? `${el.scrollHeight}px`
          : "0px";
      }
    });
  }, [openItems]);

  useEffect(() => {
    if (prevVariant.current !== variant) {
      setOpenItems([]);
      prevVariant.current = variant;
    }
  }, [variant]);

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
    >
      {variant === "basic" && (
        <div className="flex flex-col p-5">
          {contents.map((content) => {
            const isOpen = openItems.includes(content.id);
            return (
              <div
                key={content.id}
                className={`p-3  transition-all duration-300 ease-in-out ${
                  isFocusContent === content.id
                    ? "ring-2 ring-purple-600 bg-orange-100"
                    : ""
                }`}
                style={{
                  borderBottom: `1px solid ${borderColor} `,
                }}
              >
                <div className="flex justify-between items-center">
                  <p
                    style={{
                      color: color,
                      fontFamily: fontFamily,
                      fontSize: fontSize,
                      textShadow: textShadow,
                      fontWeight,
                    }}
                    className={`w-full break-all italic   `}
                  >
                    {content.title}
                  </p>

                  <ChevronDown
                    style={{
                      color: iconColor,
                    }}
                    onClick={() => toggleItem(content.id)}
                    className={`cursor-pointer transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <div
                  ref={(el) => (contentRefs.current[content.id] = el)}
                  className="overflow-hidden"
                  style={{ maxHeight: "0px" }}
                >
                  <div className="p-2">
                    <div
                      className="text-muted-foreground"
                      style={{
                        textShadow: content?.textShadow,
                      }}
                      dangerouslySetInnerHTML={{ __html: content.description }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {variant === "card" && (
        <div className="flex flex-col p-5">
          {contents.map((content) => {
            const isOpen = openItems.includes(content.id);
            return (
              <div
                key={content.id}
                className={`p-3   rounded-lg my-2 shadow transition-all duration-300 ease-in-out ${
                  isFocusContent === content.id
                    ? "ring-2 ring-purple-600 bg-orange-100"
                    : ""
                }`}
                style={{
                  border: `1px solid ${borderColor} `,
                }}
              >
                <div className="flex justify-between items-center">
                  <p
                    style={{
                      color: color,
                      fontFamily: fontFamily,
                      fontSize: fontSize,
                      textShadow: textShadow,
                    }}
                    className={`w-full break-all ${fontFamily} ${fontWeight}`}
                  >
                    {content.title}
                  </p>

                  <ChevronDown
                    style={{
                      color: iconColor,
                    }}
                    onClick={() => toggleItem(content.id)}
                    className={`cursor-pointer transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <div
                  ref={(el) => (contentRefs.current[content.id] = el)}
                  className="overflow-hidden"
                  style={{ maxHeight: "0px" }}
                >
                  <div className="p-2">
                    <div
                      className="text-muted-foreground"
                      style={{
                        textShadow: content?.textShadow,
                      }}
                      dangerouslySetInnerHTML={{ __html: content.description }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </ContainerView>
  );
};

export default ViewFAQ;
