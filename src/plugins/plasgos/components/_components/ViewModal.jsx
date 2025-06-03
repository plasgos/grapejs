import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import clsx from "clsx";

const ViewModal = ({ children, isOpen, onClose }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    } else {
      // Delay unmount for exit animation
      const timeout = setTimeout(() => setShowModal(false), 200); // match with duration-200
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose(false);
  };

  if (!showModal) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-200",
        {
          " animate-in fade-in-0": isOpen,
          " animate-out fade-out-0": !isOpen,
        }
      )}
    >
      <div
        className={clsx(
          "relative w-full p-6 m-5 bg-white shadow-lg  sm:max-w-screen-sm md:max-w-screen-md rounded-lg transition-all duration-200",
          ""
        )}
      >
        <div
          onClick={handleClose}
          className="absolute top-2 right-3 cursor-pointer z-10"
        >
          <MdClose
            size={20}
            className="transition-all ease-in-out hover:scale-125"
          />
        </div>

        <div className="my-2">{children}</div>
      </div>
    </div>
  );
};

export default ViewModal;
