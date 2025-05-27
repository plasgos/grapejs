import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Watermark from "@/components/Watermark";
import { generateId } from "@/lib/utils";
import { viewComponentsRender } from "@/pages/deploy/_components/RenderFromData";
import { setNewProject } from "@/redux/modules/landing-page/landingPageSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";

const PreviewTemplate = ({ isOpen, onClose, data }) => {
  const frameGlobalOptions = data?.frameProject?.globalOptions;

  const { bgColor, watermark } = frameGlobalOptions || {};

  const rootComponents =
    data?.frameProject?.pages[0].frames?.[0]?.component?.components;

  const renderComponent = (comp) => {
    const Component = viewComponentsRender[comp.type];

    if (!Component || Component === "") return null;

    return (
      <Component
        key={comp?.attributes?.id || Math.random()}
        section={comp?.customComponent}
        editor={null}
        buildContainerStyle={frameGlobalOptions}
      />
    );
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelectComponent = () => {
    const name = `Untitled-${generateId()}`;
    const slug = slugify(name);

    dispatch(
      setNewProject({
        id: generateId(),
        name,
        slug,
        description: "",
        thumbnail: "",
        frameProject: data?.frameProject,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );
    navigate(`/web-builder/${slug}`);
  };

  return (
    // <Dialog open={isOpen} onOpenChange={onClose}>
    //   <DialogContent
    //     className="max-w-screen-2xl h-screen "
    //     onInteractOutside={(e) => e.preventDefault()}
    //   >
    //     <DialogHeader>
    //       <DialogTitle>{data?.name}</DialogTitle>
    //       <DialogDescription className="hidden">X</DialogDescription>
    //     </DialogHeader>

    //     {/* <DialogFooter>
    //       <Button onClick={() => onClose(undefined)} variant="outline">
    //         close
    //       </Button>
    //     </DialogFooter> */}
    //   </DialogContent>
    // </Dialog>

    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="h-[95%]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <SheetHeader className="mb-5 ">
          <SheetTitle className=""></SheetTitle>
          <SheetDescription className="hidden">x</SheetDescription>
        </SheetHeader>

        <div className="w-full mx-auto mb-5">
          <p className="text-4xl font-semibold ">{data?.name}</p>
        </div>

        <div className=" w-[80%] mx-auto overflow-y-auto h-[85%] rounded-lg border mb-5 ">
          <div
            style={{
              backgroundColor: bgColor || "white",
            }}
            className="min-h-screen flex flex-col mx-auto "
          >
            <main className="flex-1">
              {rootComponents?.map(renderComponent)}
            </main>
            {watermark && <Watermark />}
          </div>
        </div>

        <div className="w-[80%] mx-auto   flex justify-end items-center">
          <Button
            onClick={handleSelectComponent}
            className="bg-orange-400 hover:bg-orange-500 "
          >
            Select Template
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PreviewTemplate;
