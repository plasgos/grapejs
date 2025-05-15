import ContainerView from "@/components/ContainerView";

import "react-lazy-load-image-component/src/effects/blur.css";

import ContainerSlider from "./ContainerSlider";
import Layout1 from "./layout/Layout1";
import Layout2 from "./layout/Layout2";
import Layout3 from "./layout/Layout3";
import Layout4 from "./layout/Layout4";
import { useGlobalOptions } from "@/hooks/useGlobalOptions";
import { getColorOverride } from "@/utils/getColorOverride";

const ViewTestimony = ({ section, editor, index }) => {
  const { contents, isOverrideSchemeColor } = section;
  const { variant, header, headerColor, withSlider, autoPlaySlider } =
    section.wrapperStyle;

  const [globalOptions] = useGlobalOptions(editor);
  const { schemeColor } = globalOptions || {};

  const colorScheme = schemeColor?.colours[index];

  const headerColorPrimary = getColorOverride(
    schemeColor,
    isOverrideSchemeColor,
    headerColor,
    `#${colorScheme?.primary}`
  );

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
      index={index}
    >
      <div className="relative p-5">
        <div
          style={{
            color: headerColorPrimary,
            marginBottom: variant === "2" ? 40 : 20,
          }}
          dangerouslySetInnerHTML={{ __html: header }}
        />

        {variant === "1" && (
          <div>
            {withSlider ? (
              <ContainerSlider
                editor={editor}
                section={section}
                autoPlaySlider={autoPlaySlider}
                LayoutComponent={Layout1}
                isOverrideSchemeColor={isOverrideSchemeColor}
                colorScheme={colorScheme}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5  auto-rows-min ">
                {contents.map((content) => (
                  <Layout1
                    key={content.id}
                    content={content}
                    styles={section.wrapperStyle}
                    editor={editor}
                    isOverrideSchemeColor={isOverrideSchemeColor}
                    colorScheme={colorScheme}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {variant === "2" && (
          <div>
            {withSlider ? (
              <ContainerSlider
                editor={editor}
                section={section}
                autoPlaySlider={autoPlaySlider}
                LayoutComponent={Layout2}
                isOverImage
                isOverrideSchemeColor={isOverrideSchemeColor}
                colorScheme={colorScheme}
              />
            ) : (
              <div
                style={{ rowGap: 40 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5   auto-rows-min "
              >
                {contents.map((content) => (
                  <Layout2
                    key={content.id}
                    content={content}
                    styles={section.wrapperStyle}
                    editor={editor}
                    isOverImage
                    isOverrideSchemeColor={isOverrideSchemeColor}
                    colorScheme={colorScheme}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {variant === "3" && (
          <div>
            {withSlider ? (
              <ContainerSlider
                editor={editor}
                section={section}
                autoPlaySlider={autoPlaySlider}
                LayoutComponent={Layout3}
                isOverrideSchemeColor={isOverrideSchemeColor}
                colorScheme={colorScheme}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5  auto-rows-min ">
                {contents.map((content) => (
                  <Layout3
                    key={content.id}
                    content={content}
                    styles={section.wrapperStyle}
                    editor={editor}
                    isOverrideSchemeColor={isOverrideSchemeColor}
                    colorScheme={colorScheme}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {variant === "4" && (
          <div>
            {withSlider ? (
              <ContainerSlider
                editor={editor}
                section={section}
                autoPlaySlider={autoPlaySlider}
                LayoutComponent={Layout4}
                isOverrideSchemeColor={isOverrideSchemeColor}
                colorScheme={colorScheme}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5  auto-rows-min ">
                {contents.map((content) => (
                  <Layout4
                    key={content.id}
                    content={content}
                    styles={section.wrapperStyle}
                    editor={editor}
                    isOverrideSchemeColor={isOverrideSchemeColor}
                    colorScheme={colorScheme}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </ContainerView>
  );
};

export default ViewTestimony;
