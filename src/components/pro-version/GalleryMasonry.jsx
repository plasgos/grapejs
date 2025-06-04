import { a, useTransition } from "@react-spring/web";
import { useEffect, useMemo, useRef, useState } from "react";

import { getContentFocusStyle } from "@/utils/getContentFocusStyle";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useGlobalOptions } from "@/hooks/useGlobalOptions";
import ViewModal from "@/plugins/plasgos/components/_components-view/ViewModal";

const GalleryMasonry = ({ data, editor, buildContainerStyle }) => {
  const [globalOptions] = useGlobalOptions(editor);
  const currentGlobalOptions = editor ? globalOptions : buildContainerStyle;

  const { isFocusContent, maxWidthPage } = currentGlobalOptions || {};

  const [columns, setColumns] = useState(2);

  const ref = useRef();
  const [width, setWidth] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    const updateColumns = (targetWindow = window) => {
      const width = targetWindow.innerWidth;

      if (width >= 1500) {
        setColumns(5);
      } else if (width >= 1000) {
        setColumns(4);
      } else if (width >= 600) {
        setColumns(3);
      } else {
        setColumns(1);
      }
    };

    const timeout = setTimeout(() => {
      const iframe = editor?.Canvas.getFrameEl();
      const targetWindow = iframe?.contentWindow || window;

      updateColumns(targetWindow);
      targetWindow.addEventListener("resize", () =>
        updateColumns(targetWindow)
      );

      return () => {
        targetWindow.removeEventListener("resize", () =>
          updateColumns(targetWindow)
        );
      };
    }, 100);

    return () => clearTimeout(timeout);
  }, [editor]);

  useEffect(() => {
    const updateWidth = () => {
      if (editor) {
        const wrapper = editor.getWrapper();
        const wrapperDomEl = wrapper.view?.el;

        if (wrapperDomEl) {
          const widthContainer = Math.min(
            wrapperDomEl.clientWidth,
            maxWidthPage
          );
          setWidth(widthContainer);
        }
      } else {
        const widthContainer = Math.min(window.innerWidth, maxWidthPage);
        setWidth(widthContainer);
      }
    };

    updateWidth();

    const targetWindow = editor?.Canvas.getFrameEl()?.contentWindow || window;
    targetWindow.addEventListener("resize", updateWidth);

    return () => {
      targetWindow.removeEventListener("resize", updateWidth);
    };
  }, [editor, maxWidthPage]);

  const [heights, gridItems] = useMemo(() => {
    let heights = new Array(columns).fill(0);
    let gridItems = data.map((child) => {
      const column = heights.indexOf(Math.min(...heights));
      const x = (width / columns) * column;
      const y = (heights[column] += child.height / 2) - child.height / 2;
      return {
        ...child,
        x,
        y,
        width: width / columns,
        height: child.height / 2,
      };
    });
    return [heights, gridItems];
  }, [columns, data, width]);

  const transitions = useTransition(gridItems, {
    keys: (item) => item.id,
    from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
    enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });

  const handleSelectItem = (item) => {
    setIsOpen(true);
    setSelectedItem(item);
  };

  return (
    <>
      <div
        ref={ref}
        className="relative w-full h-full cursor-pointer"
        style={{
          height: Math.max(...heights),
        }}
      >
        {transitions((style, item) => (
          <a.div
            key={item.id}
            style={style}
            className={`absolute p-[15px] [will-change:transform,width,height,opacity] ${getContentFocusStyle(
              isFocusContent,
              item.id
            )}`}
            onClick={() => handleSelectItem(item)}
          >
            <div
              className="relative w-full h-full overflow-hidden uppercase text-[10px] leading-[10px] rounded-[4px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] transition duration-300 ease hover:scale-110"
              style={{
                backgroundColor: "#ffffff",
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </a.div>
        ))}
      </div>

      <ViewModal isOpen={isOpen} onClose={setIsOpen}>
        <div className="w-full flex  justify-center ">
          <LazyLoadImage
            src={selectedItem.image}
            alt={`detail-${selectedItem.image}`}
            className={`  `}
            effect="blur"
            wrapperProps={{
              style: { transitionDelay: "1s" },
            }}
          />
        </div>
      </ViewModal>
    </>
  );
};

export default GalleryMasonry;
