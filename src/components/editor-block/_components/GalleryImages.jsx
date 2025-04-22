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
import {
  useDeleteImagePurgeCacheMutation,
  useGetImagesQuery,
} from "@/redux/services/galleryApi";
import { Loader2 } from "lucide-react";
import clsx from "clsx";
import { useEffect } from "react";

const GalleryImages = ({
  isOpen,
  onClose,
  handleFileUpload,
  setIsOpenUploadModal,
}) => {
  const {
    data: images,
    isLoading,
    refetch,
  } = useGetImagesQuery(
    {
      path: "/sample-folder",
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  console.log("🚀 ~ images:", images);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [deleteImagePurgeCache, { isLoading: isDeleting, isError }] =
    useDeleteImagePurgeCacheMutation();

  const [selectedImage, setSelectedImage] = useState(null);
  console.log("🚀 ~ selectedImage:", selectedImage);
  const [searchValue, setSearchValue] = useState("");
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

  const handleDelete = async () => {
    const { fileId, url } = selectedImage || {};

    if (!fileId || !url) {
      return;
    }

    const cleanUrl = url.split("?")[0];

    const res = await deleteImagePurgeCache({ fileId, url: cleanUrl });
    if (res?.data) {
      const maxAttempts = 5;
      let attempt = 0;

      const pollUntilDeleted = setInterval(async () => {
        const { data: images } = await refetch();

        console.log("RUN REFETCH");

        const stillExists = images?.some((img) => img.fileId === fileId);

        if (!stillExists || attempt >= maxAttempts) {
          clearInterval(pollUntilDeleted);
        }

        attempt++;
      }, 1500);
    }

    if (!isDeleting || !isError) {
      setIsOpenModal(false);
      setSelectedImage({});
    }
  };

  // useEffect(() => {
  //   if (isOpen) {
  //     console.log("RUN EFFECT REFETCH");
  //     refetch();
  //   }
  // }, [isOpen, refetch]);

  const ModalDelete = ({ isOpenDelete, onCloseDelete }) => {
    const [showModal, setShowModal] = useState(isOpenDelete);

    useEffect(() => {
      if (isOpenDelete) {
        setShowModal(true);
      } else {
        // Delay unmount for exit animation
        const timeout = setTimeout(() => setShowModal(false), 200); // match with duration-200
        return () => clearTimeout(timeout);
      }
    }, [isOpenDelete]);

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
            "relative w-[350px]  m-5 bg-white shadow-lg  rounded-lg transition-all duration-200",
            ""
          )}
        >
          <div className="">
            <div className="flex gap-x-3 items-center  border-b p-5">
              <FaTrashCan className="text-red-500" size={18} />

              <p className="font-semibold">Delete Image</p>
            </div>

            <p className="text-sm p-5">
              This will permanently delete all the selected files, folders and
              content in the selected folder. Once submitted, this action can
              not be reversed.
            </p>

            <div className="flex justify-end gap-x-3  p-5 ">
              <Button onClick={() => onCloseDelete(false)} variant="outline">
                Cancel
              </Button>

              <Button
                disabled={isDeleting}
                onClick={handleDelete}
                variant="destructive"
              >
                Delete {isDeleting && <Loader2 className="animate-spin" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
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
        ) : images?.length > 0 ? (
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
                        onClick={() => setIsOpenModal(true)}
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

                <ModalDelete
                  isOpenDelete={isOpenModal}
                  onCloseDelete={setIsOpenModal}
                />

                <Button onClick={handleUploadImages} variant="outline">
                  Upload Images
                  <FaCloudUploadAlt />
                </Button>
              </div>
            </div>

            {filteredImages?.length > 0 ? (
              <div
                className={`w-full p-2 grid grid-cols-5 gap-5 max-h-[400px] overflow-y-auto    `}
              >
                {filteredImages?.map((image) => {
                  const isSelected = image.url === selectedImage?.url;

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
