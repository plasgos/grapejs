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
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { HiViewfinderCircle } from "react-icons/hi2";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { useRef } from "react";
import { MdClose } from "react-icons/md";

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

  const [selectedImage, setSelectedImage] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [viewDetail, setViewDetail] = useState(null);

  const detailRef = useRef(null);

  const [deleteImagePurgeCache, { isLoading: isDeleting, isError }] =
    useDeleteImagePurgeCacheMutation();

  const filteredImages = useMemo(() => {
    return images
      ?.filter((image) => image.name.includes(searchValue.toLowerCase()))
      .sort((a, b) => b - a)
      .reverse();
  }, [images, searchValue]);

  const handleUploadImages = () => {
    onClose();
    setTimeout(() => {
      setIsOpenUploadModal(true);
    }, 1000);
  };

  useEffect(() => {
    if (viewDetail && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [viewDetail]);

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
              <Skeleton key={index} className="h-[200px] w-full rounded-lg" />
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

            <div className="max-h-[450px] overflow-y-auto p-3">
              {viewDetail && (
                <div
                  ref={detailRef}
                  className="relative group overflow-hidden w-full h-[350px] mb-4 border rounded-lg p-3"
                >
                  <LazyLoadImage
                    src={viewDetail.url}
                    alt="my-gallery"
                    effect="blur"
                    className="w-full rounded-lg object-contain cursor-pointer h-full  "
                    wrapperProps={{
                      style: { transitionDelay: "0.5s" },
                    }}
                  />

                  <div className="absolute inset-0 bg-neutral-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md cursor-pointer " />
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => {
                            setSelectedImage(null);
                            setViewDetail(null);
                          }}
                          variant="outline"
                          size=""
                          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full h-8 w-8 z-10 shadow-sm"
                        >
                          <MdClose />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Close</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}

              {filteredImages?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
                  {Array.from({ length: 4 }).map((_, columnIndex) => (
                    <div key={columnIndex} className="grid gap-4">
                      {filteredImages
                        .filter((_, i) => i % 4 === columnIndex)
                        .map((image) => {
                          const isSelected = image.url === selectedImage?.url;

                          return (
                            <div
                              key={image.fileId}
                              className={` relative group overflow-hidden   rounded-lg ${
                                isSelected &&
                                "ring-2 ring-orange-500 ring-offset-2"
                              }`}
                              onClick={() => setSelectedImage(image)}
                            >
                              <LazyLoadImage
                                src={image.url}
                                alt="my-gallery"
                                effect="blur"
                                className="w-full rounded-lg object-cover cursor-pointer h-full  "
                                wrapperProps={{
                                  style: { transitionDelay: "0.5s" },
                                }}
                              />
                              {!isDeleting && (
                                <>
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md cursor-pointer " />
                                  <TooltipProvider>
                                    <Tooltip delayDuration={100}>
                                      <TooltipTrigger asChild>
                                        <Button
                                          onClick={() => {
                                            setSelectedImage(image);
                                            setViewDetail(image);
                                          }}
                                          variant="outline"
                                          size=""
                                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full h-8 w-8 z-10"
                                        >
                                          <HiViewfinderCircle />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>View Detail</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>

                                  <div className=" absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="truncate max-w-28 text-white">
                                      {image.name}
                                    </p>
                                  </div>

                                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          className="w-8 h-8 rounded-full"
                                          variant="outline"
                                          size="icon"
                                        >
                                          <IoEllipsisHorizontalSharp className="text-black" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent
                                        onFocusOutside={(e) =>
                                          e.preventDefault()
                                        }
                                      >
                                        <DropdownMenuLabel>
                                          Image Options
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                          onClick={() => setIsOpenModal(true)}
                                          className="cursor-pointer"
                                        >
                                          <FaTrashCan className="text-red-500" />
                                          Delete{" "}
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </>
                              )}

                              {isDeleting && isSelected && (
                                <>
                                  <div className="absolute inset-0 bg-black/50 rounded-md transition-opacity duration-300" />
                                  <Loader2 className="animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                </>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex w-full justify-center mt-5">
                  Images Not Found!
                </div>
              )}
            </div>
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
