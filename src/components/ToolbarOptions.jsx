import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { setEditComponent } from "@/redux/modules/landing-page/landingPageSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaTrashAlt } from "react-icons/fa";
import { FaPenToSquare, FaRegCopy } from "react-icons/fa6";
import { FiMove } from "react-icons/fi";
import { IoEllipsisVerticalCircle } from "react-icons/io5";

const ToolbarOptions = ({ editor }) => {
  const { editComponent, isDraggingComponent, currentDeviceView } = useSelector(
    (state) => state.landingPage
  );
  // const [hasModalPopup, setHasModalPopup] = useState(false);

  const dispatch = useDispatch();

  const [editElement, setEditElement] = useState("");

  // useEffect(() => {
  //   const checkModalPopup = () => {
  //     const found = editor?.getWrapper()?.find("[data-gjs-type=modal-popup]");
  //     setHasModalPopup(found.length > 0);
  //   };

  //   checkModalPopup(); // initial check

  //   editor.on("component:add component:remove", checkModalPopup);

  //   return () => {
  //     editor.off("component:add component:remove", checkModalPopup);
  //   };
  // }, [editor]);

  const handleRemove = () => {
    if (editElement == "text-element") {
      return;
    } else {
      editor.runCommand("core:component-delete");
    }
  };

  const items = [
    {
      icon: <FaPenToSquare />,
      tooltip: "Edit Component",
      onClick: () => {
        const selectedComponent = editor.getSelected()?.attributes?.blockLabel;
        dispatch(setEditComponent(selectedComponent));
      },
    },
    {
      icon: <FiMove />,
      tooltip: "Move",
      onClick: () => editor.runCommand("tlb-move"),
    },
    {
      icon: <FaRegCopy />,
      tooltip: "Copy",
      onClick: () => editor.runCommand("custom-copy"),
    },
    {
      icon: <FaTrashAlt />,
      tooltip: "Delete",
      onClick: () => handleRemove(),
    },
  ];

  const ToolbarDesktop = () => {
    return (
      <div className="sticky w-max ml-auto  m-[15px] top-5 right-5  z-[9999]">
        <div className="flex space-x-2 bg-white border rounded-xl shadow p-1 w-fit">
          {items.map(({ icon, tooltip, onClick }) => (
            <TooltipProvider key={tooltip} delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onClick}
                    className="w-7 h-7 hover:bg-orange-200"
                    variant="ghost"
                  >
                    {icon}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-sm">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    );
  };

  const ToolbarTablet = () => {
    return (
      <div className="sticky w-max ml-auto  m-[15px] top-5 right-5  z-[9999]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="p-2 shadow-xl rounded-lg ring-1"
              variant="outline"
            >
              <IoEllipsisVerticalCircle className="scale-150" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {items.map(({ icon, tooltip, onClick }) => (
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={onClick}
                key={tooltip}
              >
                {icon}
                <p className="text-sm">{tooltip}</p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  // useEffect(() => {
  //   if (editor) {
  //     editor.on("component:selected", () => {
  //       dispatch(setEditComponent(""));
  //     });
  //   }
  // }, [dispatch, editor]);

  // const monitoredTypes = ["text-element", "image-element"];

  // let updateTimeout;
  // editor.on("component:update", (component) => {
  //   const type = component.get("type");
  //   if (monitoredTypes.includes(type)) {
  //     setEditElement(type);

  //     clearTimeout(updateTimeout);
  //     updateTimeout = setTimeout(() => {
  //       setEditElement("");
  //     }, 500);
  //   }
  // });

  // useEffect(() => {
  //   if (!editor) return;

  //   const checkModalPopup = (component) => {
  //     const type = component.get("type");

  //     if (type === "modal-popup") {
  //       // Hide toolbar hanya untuk modal-popup

  //       setHasModalPopup(true);
  //     }
  //   };

  //   editor.on("component:add", checkModalPopup);

  //   // Cleanup listener saat komponen unmount
  //   return () => {
  //     editor.off("component:add", checkModalPopup);
  //   };
  // }, [editor]);

  const renderToolbar = () => {
    switch (currentDeviceView) {
      case "desktop":
        return <ToolbarDesktop />;
      case "tablet":
        return <ToolbarTablet />;
      case "mobileModern":
        return <ToolbarTablet />;
    }
  };

  if (editComponent || editElement) return null;

  return <>{renderToolbar()}</>;
};

export default ToolbarOptions;
