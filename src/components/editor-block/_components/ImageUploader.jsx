import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useDropzone } from "react-dropzone";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FcOk } from "react-icons/fc";

import { useLazyGetAuthImagekitQuery } from "@/redux/services/authImagekit";
import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { TbUpload } from "react-icons/tb";
import { TfiDropboxAlt } from "react-icons/tfi";
import GalleryImages from "./GalleryImages";
import { RiGalleryView } from "react-icons/ri";

import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useGetImagesQuery } from "@/redux/services/galleryApi";

const ImageUploader = ({ label, handleFileUpload, image }) => {
  const [getAuthImagekit] = useLazyGetAuthImagekitQuery();

  const {
    data: images,
    isLoading,
    refetch,
  } = useGetImagesQuery({
    path: "/sample-folder",
  });
  console.log("🚀 ~ ImageUploader ~ images:", images);

  const [isOpenUploadModal, setIsOpenUploadModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isOpenGallery, setIsOpenGallery] = useState(false);
  const [fadingOutImages, setFadingOutImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      setSelectedImages((prevState) => [...prevState, file]);
    });
  }, []);

  const [uploadStatuses, setUploadStatuses] = useState([]);
  console.log("🚀 ~ ImageUploader ~ uploadStatuses:", uploadStatuses);

  const updateStatus = (fileName, updates) => {
    setUploadStatuses((prev) =>
      prev.map((file) =>
        file.name === fileName ? { ...file, ...updates } : file
      )
    );
  };

  const urlEndpoint = "https://ik.imagekit.io/ez1ffaf6o/";

  // optional parameters (needed for client-side upload)
  const publicKey = "public_Wwlp5YlR37rYXrDWwNIDMDhBgQo=";

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    isFocused,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxSize: 2 * 1024 * 1024,
  });

  const handleRemoveSelectedImage = (removeIndex) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index !== removeIndex)
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#cbd5e1",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? { borderColor: "#2196f3" } : {}),
      ...(isDragAccept ? { borderColor: "#00e676" } : {}),
      ...(isDragReject ? { borderColor: "#ff1744" } : {}),
    }),
    [baseStyle, isDragAccept, isDragReject, isFocused]
  );

  const uploadWithSignature = async (
    file,
    { auth, onUploadProgress, onSuccess, onError } = {}
  ) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      formData.append("publicKey", publicKey);
      formData.append("urlEndpoint", urlEndpoint);

      formData.append("signature", auth.signature);
      formData.append("expire", auth.expire);
      formData.append("token", auth.token);

      formData.append("useUniqueFileName", "false");
      formData.append("folder", "/sample-folder");
      formData.append("tags", "dropzone,imagekit");
      formData.append("isPrivateFile", "false");
      formData.append("overwriteFile", "true");
      const response = await axios.post(
        "https://upload.imagekit.io/api/v1/files/upload",
        formData,
        {
          onUploadProgress: (event) => {
            if (onUploadProgress) {
              const progress = Math.round((event.loaded * 100) / event.total);
              onUploadProgress(progress, file);
            }
          },
        }
      );

      if (onSuccess) onSuccess(response.data, file);
      return response.data;
    } catch (error) {
      if (onError) onError(error, file);
      throw error;
    }
  };

  const uploadAllImages = async () => {
    if (selectedImages.length === 0) return;

    setUploadStatuses(
      selectedImages.map((file) => ({
        name: file.name,
        progress: 0,
        status: "uploading",
        isUploaded: false,
        error: null,
        data: {},
      }))
    );

    const uploadTasks = selectedImages.map(async (image) => {
      try {
        const timestamp = Date.now() + Math.random(); // biar unik
        const { data: auth } = await getAuthImagekit(timestamp);
        console.log("Auth untuk", image.name, auth);

        const result = await uploadWithSignature(image, {
          auth, // lempar auth ke dalam kalau perlu
          onUploadProgress: (progress, file) =>
            updateStatus(file.name, {
              name: file.name,
              progress,
              status: "uploading",
            }),
          onSuccess: (data, file) =>
            updateStatus(file.name, {
              status: "success",
              isUploaded: true,
              progress: 100,
              data,
            }),
          onError: (error, file) =>
            updateStatus(file.name, { status: "error", error }),
        });

        return result;
      } catch (err) {
        console.log("Failed upload file:", err.message);
        return null;
      }
    });

    const results = await Promise.all(uploadTasks);

    refetch();

    return results;
  };

  const isUploading = uploadStatuses?.some(
    (data) => data?.status === "uploading" && data?.isUploaded === false
  );

  const completeUploaded = uploadStatuses?.filter(
    (data) => data?.isUploaded
  ).length;

  useEffect(() => {
    const completedUploadImage = uploadStatuses
      .filter((upload) => upload.status === "success")
      .map((file) => file.name);

    if (completedUploadImage.length > 0) {
      setFadingOutImages((prev) => [...prev, ...completedUploadImage]);
      setSelectedImages((prevImages) =>
        prevImages.filter((image) => !completedUploadImage.includes(image.name))
      );

      setFadingOutImages((prev) =>
        prev.filter((name) => !completedUploadImage.includes(name))
      );
    }
  }, [uploadStatuses]);

  const handleVisitGallery = () => {
    setUploadStatuses([]);
    setSelectedImages([]);

    setIsOpenUploadModal(false);

    refetch();

    setTimeout(() => {
      setIsOpenGallery(true);
    }, 1000);
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div
        style={{
          backgroundColor: "#F5F5F5",
          width: "100%",
          overflow: "hidden",
        }}
        className="mx-auto mb-3 border rounded-md  "
      >
        <LazyLoadImage
          style={{ objectFit: "contain", width: "100%", height: 120 }}
          src={image}
          alt="img"
          effect="blur"
          wrapperProps={{
            style: { transitionDelay: "0.5s" },
          }}
        />
      </div>

      <div className="flex justify-between gap-3">
        <Dialog open={isOpenUploadModal} onOpenChange={setIsOpenUploadModal}>
          <DialogTrigger asChild>
            <Button className="w-full" variant="outline">
              Upload <TbUpload />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-screen-md">
            <DialogHeader>
              <DialogTitle className="text-xl">Upload Images</DialogTitle>
              <DialogDescription className="invisible">
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>

              <div
                className="text-center rounded-lg "
                {...getRootProps({ style })}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop file(s) here ...</p>
                ) : (
                  <p>Drag and drop file(s) here, or click to select files</p>
                )}

                <TfiDropboxAlt size={36} className="mt-5" />
                <p className="my-2">Maximum 2 MB</p>
              </div>

              <div
                className={`w-full  p-2 grid grid-cols-4 gap-5 max-h-[400px] overflow-y-auto  `}
              >
                {selectedImages.length > 0 &&
                  selectedImages.map((image, index) => {
                    const upload = uploadStatuses.find(
                      (u) => u.name === image.name && u.isUploaded === false
                    );

                    const formatFileSize = (bytes) => {
                      if (bytes < 1024) return `${bytes} B`;
                      if (bytes < 1024 * 1024)
                        return `${Math.round(bytes / 1024)} KB`;
                      return `${Math.round(bytes / (1024 * 1024))} MB`;
                    };

                    return (
                      <div
                        key={index}
                        className={cn(
                          "relative group w-full h-full transition-all duration-1000 transform",
                          fadingOutImages.includes(image.name) &&
                            "opacity-0 scale-95"
                        )}
                      >
                        <div className="relative w-full h-[120px] overflow-hidden rounded-md">
                          <img
                            src={URL.createObjectURL(image)}
                            alt=""
                            className="w-full h-full object-cover"
                          />

                          <div className=" absolute bottom-0 w-full  bg-black/60 opacity-100 transition-opacity duration-300 p-1 z-10 rounded-b-lg ">
                            <div className="flex justify-between">
                              <p className="text-sm text-white truncate max-w-24">
                                {image.name}
                              </p>
                              <p className="text-sm text-white">
                                {formatFileSize(image.size)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {upload && (
                          <div className="flex flex-col items-center gap-y-2 my-2">
                            <Progress
                              indicatorColor={`${
                                upload.status === "success"
                                  ? "bg-green-600"
                                  : upload.status === "uploading"
                                  ? "bg-blue-500"
                                  : "bg-red-500"
                              }`}
                              value={upload.progress}
                              className=""
                            />

                            <div className="flex items-center gap-x-2">
                              <p className="text-sm ">
                                {upload.status === "success"
                                  ? "Completed"
                                  : upload.status === "error"
                                  ? "Failed"
                                  : `Uploading ${upload.progress}%`}
                              </p>

                              {upload.status === "success" && <FcOk />}
                            </div>
                          </div>
                        )}

                        {/* Overlay redup saat hover */}

                        {!isUploading && (
                          <>
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md " />
                            <TooltipProvider>
                              <Tooltip delayDuration={100}>
                                <TooltipTrigger asChild>
                                  <Button
                                    onClick={() =>
                                      handleRemoveSelectedImage(index)
                                    }
                                    variant="destructive"
                                    size=""
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full h-8 w-8 z-10"
                                  >
                                    <MdClose />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Remove</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </>
                        )}
                      </div>
                    );
                  })}
              </div>

              {completeUploaded > 0 && (
                <div className="flex flex-col gap-y-3 items-center  justify-center">
                  <p className="text-green-600">
                    Success Uploaded {completeUploaded} {`image(s)`}
                  </p>
                  <Button onClick={handleVisitGallery} variant="outline">
                    Visit Gallery
                  </Button>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={uploadAllImages}
                  disabled={
                    selectedImages.length === 0 ||
                    uploadStatuses.some((data) => data.status === "uploading")
                  }
                  className="bg-orange-500 hover:bg-orange-600 w-32"
                >
                  {isUploading ? (
                    <>
                      Uploading
                      <Loader2 className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Upload
                      <FaCloudUploadAlt />
                    </>
                  )}
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Button
          onClick={() => setIsOpenGallery(true)}
          className="w-full"
          variant="outline"
        >
          Select From Gallery <RiGalleryView />
        </Button>

        {isOpenGallery && (
          <GalleryImages
            isOpen={isOpenGallery}
            onClose={setIsOpenGallery}
            handleFileUpload={handleFileUpload}
            images={images}
            isLoading={isLoading}
            setIsOpenUploadModal={setIsOpenUploadModal}
          />
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
