
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import "react-lazy-load-image-component/src/effects/blur.css";
import { produce } from "immer";
import ContentShowcase from "../content-showcase";

import GjsEditor, { Canvas, WithEditor } from "@grapesjs/react";
import grapesjs from "grapesjs";

const ModalPopup = ({ section, editor, }) => {
  const editorModel = editor.getModel();
  const globalOptions = editorModel.get("globalOptions");

  const { width, appearEffect, rounded } = section.wrapperStyle;
  const { popupId, isPreviewModal, contents } = section;
  console.log("🚀 ~ ModalPopup ~ contents:", contents);
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

  const onCLose = () => {
    setisDelayAnimate(true);

    if (typeOpen === "onClick" && globalOptions.popup.length > 0) {
      const selectedPopup = globalOptions.popup.find(
        (popup) => popup.id === popupId
      );

      if (selectedPopup) {
        editorModel.set("globalOptions", {
          ...globalOptions,
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

  return (
    <>
      {isOpen && (
        <div
          className={`absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-50 ${
            isDelayAnimate
              ? "animate__animated animate__fadeOut"
              : "animate__animated animate__fadeIn"
          }  `}
        >
          <ContainerView
            id={section?.scrollTarget?.value || ""}
            editor={editor}
            section={section}
            customClassName={`flex flex-col p-5  animate__animated ${appearEffect} animate__fast overflow-hidden `}
            customStyles={{
              width,
              borderRadius: rounded,
              height: "auto",
              backgroundColor:
                section.background.bgType === null
                  ? "white"
                  : section.background.bgColor,
            }}
          >
            <div onClick={onCLose} className="ml-auto cursor-pointer z-10 ">
              <MdClose size={24} />
            </div>
            <div className="flex flex-col  rounded-xl p-5 max-h-[500px] overflow-y-auto mt-2">
              {/* <p className="w-full text-center">MODAL {currentPopup.value}</p> */}

              <div className="">
                {contents.map((content) => {
                  return (
                    <div key={content.id} className="">
                      {content.componentType === "content-showcase" && (
                        <ContentShowcase section={content} editor={editor} />
                      )}
                    </div>
                  );
                })}
                {/* 
                <GjsEditor
                  // onEditor={}
                  grapesjs={grapesjs}
                  plugins={[]}
                >
                  <Canvas
                    style={{
                      backgroundColor: "#FFF4EA",
                      width: "100%",
                      height: "100vh",
                    }}
                  />
                </GjsEditor> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalPopup;
