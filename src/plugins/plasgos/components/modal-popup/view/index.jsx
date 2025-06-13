import ContainerView from "@/components/ContainerView";
import { useGlobalOptions } from "@/hooks/useGlobalOptions";
import clsx from "clsx";
import { produce } from "immer";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import "react-lazy-load-image-component/src/effects/blur.css";

const ModalPopup = ({
  section,
  editor,
  childrenModels,
  buildContainerStyle,
}) => {
  const [globalOptions, updateGlobalOptions] = useGlobalOptions(editor);
  const currentGlobalOptions = editor ? globalOptions : buildContainerStyle;

  const { isFocusContent, maxWidthPage } = currentGlobalOptions;

  const { width, appearEffect, rounded } = section.wrapperStyle;
  const { popupId, isPreviewModal, contents } = section;
  const { typeOpen, delayDuration } = section.popupModalOption;
  const [isOpen, setIsOpen] = useState(false);
  const [isDelayAnimate, setisDelayAnimate] = useState(false);

  const handleClosePreview = () => {
    const selectedComponent = editor.getSelected();
    selectedComponent?.set(
      "customComponent",
      produce(selectedComponent?.get("customComponent"), (draft) => {
        draft.isPreviewModal = false;
      })
    );
  };

  const onClose = () => {
    setisDelayAnimate(true);

    if (typeOpen === "onClick" && globalOptions.popup.length > 0) {
      const selectedPopup = globalOptions.popup.find(
        (popup) => popup.id === popupId
      );

      if (selectedPopup) {
        updateGlobalOptions({
          popup: globalOptions.popup.map((item) =>
            item.id === selectedPopup.id
              ? {
                  ...item,
                  isShown: false,
                }
              : item
          ),
        });
      }

      setTimeout(() => {
        setIsOpen(false);
        setisDelayAnimate(false);
      }, 300);
      handleClosePreview();
    } else {
      setTimeout(() => {
        setIsOpen(false);
        setisDelayAnimate(false);
      }, 300);
      handleClosePreview();
    }

    setTimeout(() => {
      editor.select(null);
    }, 0);
  };

  useEffect(() => {
    if (isPreviewModal) {
      setIsOpen(true);
    } else if (typeOpen === "immediately") {
      setIsOpen(true);
    } else if (typeOpen === "delay" && delayDuration) {
      setTimeout(() => {
        setIsOpen(true);
      }, delayDuration);
    } else if (typeOpen === "onClick" && globalOptions.popup.length > 0) {
      const selectedPopup = globalOptions.popup.find(
        (popup) => popup.id === popupId
      );

      if (selectedPopup?.isShown) {
        setIsOpen(true);
      }
    }
  }, [delayDuration, globalOptions.popup, popupId, typeOpen, isPreviewModal]);

  const currentPopup = globalOptions.popup.find((item) => item.id === popupId);

  const containerRef = useRef(null);
  console.log("🚀 ~ containerRef:", containerRef);

  useEffect(() => {
    if (editor) {
      editor.on("component:add", () => {
        if (childrenModels && childrenModels.length > 0) {
          // Kosongkan dulu
          containerRef.current.innerHTML = "";

          // Append semua child component
          childrenModels.forEach((child) => {
            const childEl = child.view?.el;

            console.log("🚀 ~ childrenModels.forEach ~ childEl:", childEl);

            if (childEl) {
              containerRef.current.appendChild(childEl);
            }
          });
        }
      });
    }
  }, [childrenModels, editor]);

  useEffect(() => {
    editor.on("component:add", () => {
      if (!containerRef.current) return;

      containerRef.current.innerHTML = "";

      childrenModels.forEach((child) => {
        const childEl = child.view?.el;

        console.log("🚀 ~ childrenModels.forEach ~ childEl:", childEl);

        if (childEl) {
          containerRef.current.appendChild(childEl);
        }
      });
    });
  }, [childrenModels, editor]);

  return (
    <>
      {isOpen ? (
        <>
          {/* <div
            className={`fixed inset-0 bg-black/50  z-50 !pointer-events-none ${
              isDelayAnimate
                ? "animate__animated animate__fadeOut"
                : "animate__animated animate__fadeIn"
            }  `}
          >
           
          </div> */}

          {/* <div className="bg-red-500 relative flex flex-col items-center justify-center h-[500px]  overflow-y-auto ">
            <div
              className={clsx(
                "relative w-full p-6 m-5 bg-white shadow-lg  sm:max-w-screen-sm md:max-w-screen-md rounded-lg transition-all duration-200 z-[9999]  right-0 h-[500px]  ",
                ""
              )}
              style={{
                borderRadius: rounded,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                onClick={onClose}
                className="absolute top-3 right-3 cursor-pointer z-10 "
              >
                <MdClose size={24} />
              </div>

              <ContainerView
                targetId={section?.scrollTarget?.value || ""}
                editor={editor}
                section={section}
                maxWidthPage={maxWidthPage}
              >
                <div data-slot="modal-children" />
              </ContainerView>
            </div>
          </div> */}

          <div
            style={{
              display: "block",
              position: "fixed",
              zIndex: 100,
              paddingTop: 100,
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              overflow: "auto",
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
            className=""
          >
            <div className="bg-white m-auto p-5 border w-[80%]">
              <p>MODAL</p>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ModalPopup;
{
  /* <div ref={containerRef} className="gjs-children-wrapper" /> */
}
