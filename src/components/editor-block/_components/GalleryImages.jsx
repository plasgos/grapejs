import ImageKitProviderWrapper from "@/components/ImageKitProviderWrapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetImagesQuery } from "@/redux/services/authImagekit";
import { IKImage } from "imagekitio-react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const GalleryImages = ({ isOpen, onClose, handleFileUpload }) => {
  const { data: images, isLoading } = useGetImagesQuery({
    path: "/sample-folder",
    skip: 0,
    limit: 50,
  });

  const [selectedImage, setSelectedImage] = useState("");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-screen-md">
        <DialogHeader>
          <DialogTitle>Gallery</DialogTitle>
          <DialogDescription className="invisible">X</DialogDescription>
        </DialogHeader>

        {/* {isLoading ? (
          <div className="w-full p-2 grid grid-cols-5 gap-5 max-h-[400px]">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-[150px] w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div
            className={`w-full p-2 grid grid-cols-5 gap-5 max-h-[400px] overflow-y-auto  `}
          >
            <ImageKitProviderWrapper>
              {images?.map((image) => {
                const isSelected = image.url === selectedImage;

                return (
                  <div
                    key={image?.fileId}
                    className={`w-full h-[120px] overflow-hidden rounded-md  ${
                      isSelected && "ring-2 ring-orange-500 ring-offset-2"
                    }`}
                  >
                    <IKImage
                      src={image?.url}
                      transformation={[{ width: "100%" }]}
                      lqip={{ active: true }}
                      loading="lazy"
                      className={`cursor-pointer object-cover h-full w-full `}
                      onClick={() => setSelectedImage(image.url)}
                    />
                  </div>
                );
              })}
            </ImageKitProviderWrapper>
          </div>
        )} */}

        {isLoading ? (
          <div className="w-full p-2 grid grid-cols-5 gap-5 max-h-[400px]">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-[150px] w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div
            className={`w-full p-2 grid grid-cols-5 gap-5 max-h-[400px] overflow-y-auto  `}
          >
            {" "}
            {images?.map((image) => {
              const isSelected = image.url === selectedImage;

              return (
                <div
                  key={image?.fileId}
                  className={`w-full h-[120px] overflow-hidden rounded-md  ${
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
                    onClick={() => setSelectedImage(image.url)}
                  />
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-end">
          <Button
            onClick={() => {
              handleFileUpload(selectedImage);
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
