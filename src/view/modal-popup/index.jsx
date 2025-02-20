import ContainerView from "@/components/ContainerView";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import "react-lazy-load-image-component/src/effects/blur.css";

const ModalPopup = ({ section, editor }) => {
  const editorModel = editor.getModel();
  const globalOptionsPopup = editorModel.get("globalOptions").popup;

  const { popupId, typeOpen } = section;
  const [isOpen, setIsOpen] = useState(false);
  const [isDelayAnimate, setisDelayAnimate] = useState(false);

  const onCLose = () => {
    setisDelayAnimate(true);

    setTimeout(() => {
      setIsOpen(false);
      setisDelayAnimate(false);
    }, 300);
  };

  useEffect(() => {
    if (typeOpen === "immediately") {
      setIsOpen(true);
    } else if (typeOpen === "delay") {
      setTimeout(() => {
        setIsOpen(true);
      }, 3000);
    } else if (typeOpen === "onClick" && globalOptionsPopup.length > 0) {
      const selectedPopup = globalOptionsPopup.find(
        (popup) => popup.id === popupId
      );

      if (selectedPopup?.isShown) {
        setIsOpen(true);
      }
    }
  }, [globalOptionsPopup, popupId, typeOpen]);

  return (
    <>
      {isOpen ? (
        <div
          className={`absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-50 ${
            isDelayAnimate
              ? "animate__animated animate__fadeOut"
              : "animate__animated animate__fadeIn"
          }  `}
        >
          <div
            className={`flex flex-col p-5 rounded-lg bg-white w-[60%] h-auto relative animate__animated animate__flipInX`}
          >
            <div
              onClick={onCLose}
              className="absolute right-5 top-5 cursor-pointer z-10"
            >
              <MdClose size={24} />
            </div>

            <ContainerView
              id={section?.scrollTarget?.value || ""}
              section={section}
            >
              <div className="flex justify-center items-center bg-white rounded-xl p-5">
                <p className="w-full text-center">MODAL</p>
              </div>
            </ContainerView>
          </div>
        </div>
      ) : (
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      )}
    </>
  );
};

export default ModalPopup;
