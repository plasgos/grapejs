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

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import ImageKitProviderWrapper from "@/components/ImageKitProviderWrapper";
import { IKUpload } from "imagekitio-react";
import { useCallback, useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useMemo } from "react";

const ImageUploader = ({ label, handleFileUpload, image }) => {
  const ikUploadRefTest = useRef(null);

  const [selectedImages, setSelectedImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      setSelectedImages((prevState) => [...prevState, file]);
    });
  }, []);

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

  const onError = (err) => {
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    console.log("Success", res);
  };

  const onUploadProgress = (progress) => {
    console.log("Progress", progress);
  };

  const onUploadStart = (evt) => {
    console.log("Start", evt);
  };

  const handleRemoveSelectedImage = (removeIndex) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index !== removeIndex)
    );
  };

  const handelUpload = () => {
    if (selectedImages.length === 0) {
      return;
    }
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
        <img
          style={{ objectFit: "contain", width: "100%", height: 120 }}
          src={image}
          alt="img"
        />
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="w-full"
            // onClick={handleFileUpload}
            variant="outline"
          >
            Upload
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-screen-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Media Library Manager</DialogTitle>
            <DialogDescription className="invisible">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>

            <ImageKitProviderWrapper>
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
                <p className="my-2">Maximum 2 MB</p>
              </div>

              <IKUpload
                // ref={ikUploadRefTest}
                fileName="img.jpg"
                tags={["dropzone", "imagekit"]}
                folder="/sample-folder"
                useUniqueFileName={true}
                isPrivateFile={false}
                overwriteFile={true}
                onError={onError}
                onSuccess={onSuccess}
                onUploadProgress={onUploadProgress}
                onUploadStart={onUploadStart}
                style={{ display: "none" }}
              />

              {/* <IKUpload
                ref={uploadRef}
                fileName="img-.jpg"
                tags={["sample-tag1", "sample-tag2"]}
                customCoordinates={"10,10,10,10"}
                isPrivateFile={false}
                useUniqueFileName={true}
                responseFields={["tags"]}
                validateFile={(file) => file.size < 2000000}
                folder={"/sample-folder"}
                overwriteFile={true}
                overwriteAITags={true}
                overwriteTags={true}
                overwriteCustomMetadata={true}
                onError={onError}
                onSuccess={onSuccess}
                onUploadProgress={onUploadProgress}
                onUploadStart={onUploadStart}
                transformation={{
                  pre: "l-text,i-Imagekit,fs-50,l-end",
                  post: [
                    {
                      type: "transformation",
                      value: "w-100",
                    },
                  ],
                }}
              /> */}

              <div
                className={`w-full p-2 grid grid-cols-5 gap-5 max-h-[400px] overflow-y-auto  `}
              >
                {selectedImages.length > 0 &&
                  selectedImages.map((image, index) => (
                    <div key={index} className="relative group w-full h-full  ">
                      <img
                        src={`${URL.createObjectURL(image)}`}
                        alt=""
                        className="w-full h-full  object-cover "
                      />
                      {/* Overlay redup saat hover */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <TooltipProvider>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => handleRemoveSelectedImage(index)}
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
                    </div>
                  ))}
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handelUpload}
                  disabled={selectedImages.length === 0}
                  className="bg-orange-500 hover:bg-orange-600 w-32"
                >
                  Upload <FaCloudUploadAlt />
                </Button>
              </div>
            </ImageKitProviderWrapper>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageUploader;
