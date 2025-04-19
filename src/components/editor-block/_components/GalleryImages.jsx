import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useMemo } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { IoMdImages } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDeleteImageMutation } from "@/redux/services/galleryApi";
import { Loader2 } from "lucide-react";

const GalleryImages = ({
  isOpen,
  onClose,
  handleFileUpload,
  images,
  isLoading,
  setIsOpenUploadModal,
}) => {
  console.log("🚀 ~ images:", images);
  const [selectedImage, setSelectedImage] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [deleteImage, { isLoading: isDeleting }] = useDeleteImageMutation();

  const filteredImages = useMemo(() => {
    return images?.filter((image) =>
      image.name.includes(searchValue.toLowerCase())
    );
  }, [images, searchValue]);

  const handleUploadImages = () => {
    onClose();
    setTimeout(() => {
      setIsOpenUploadModal(true);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-screen-md lg:max-w-screen-lg mx-5">
        <DialogHeader>
          <DialogTitle>Gallery Manager</DialogTitle>
          <DialogDescription className="hidden">X</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="w-full p-2 grid grid-cols-5 gap-5 max-h-[400px]">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-[150px] w-full rounded-lg" />
            ))}
          </div>
        ) : images.length > 0 ? (
          <div>
            <div className="flex justify-between items-center mt-2 mb-3">
              <div className="flex items-center  relative ">
                <Input
                  placeholder="Search ..."
                  className="w-[300px] bg-white dark:bg-transparent pl-8 "
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <Search size={18} className="absolute left-2 text-gray-400 " />
              </div>

              <div className="px-3 flex gap-x-3">
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => deleteImage(selectedImage.fileId)}
                        disabled={!selectedImage || isDeleting}
                        variant="outline"
                      >
                        <FaTrashCan className="text-red-500" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Button onClick={handleUploadImages} variant="outline">
                  Upload Images
                  <FaCloudUploadAlt />
                </Button>
              </div>
            </div>

            {filteredImages.length > 0 ? (
              <div
                className={`w-full p-2 grid grid-cols-5 gap-5 max-h-[400px] overflow-y-auto    `}
              >
                {filteredImages?.map((image) => {
                  const isSelected = image.url === selectedImage.url;

                  return (
                    <div key={image?.fileId}>
                      <div
                        className={`relative group w-full h-[120px] overflow-hidden rounded-md  ${
                          isSelected && "ring-2 ring-orange-500 ring-offset-2"
                        }`}
                      >
                        <LazyLoadImage
                          src={image?.url}
                          alt={"my-gallery"}
                          className={`cursor-pointer object-cover h-full w-full `}
                          effect="blur"
                          wrapperProps={{
                            style: { transitionDelay: "0.5s" },
                          }}
                          onClick={() => setSelectedImage(image)}
                        />

                        {isDeleting && isSelected && (
                          <>
                            <div className="absolute inset-0 bg-black/50  opacity-100 transition-opacity duration-300 rounded-md " />

                            <Loader2 className="animate-spin absolute  top-1/2 left-[45%]" />
                          </>
                        )}
                      </div>

                      <p className="truncate max-w-36 mt-2">{image?.name}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex w-full justify-center mt-5">
                Images Not Found!
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-y-3 items-center">
            <div className="">You don&apos;t have an image!</div>

            <IoMdImages size={50} />
            <Button onClick={handleUploadImages} variant="outline">
              Upload Images
              <FaCloudUploadAlt />
            </Button>
          </div>
        )}

        <div className="flex justify-end">
          <Button
            onClick={() => {
              handleFileUpload(selectedImage?.url);
              onClose();
            }}
            disabled={!selectedImage}
            className="bg-orange-500 hover:bg-orange-600 w-32"
          >
            Select Image
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryImages;
