import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { FaRegTrashCan } from "react-icons/fa6";
import { RxUpload } from "react-icons/rx";

const ViewImageField = ({ content, index }) => {
  const { control } = useFormContext();

  const handleUpload = (onChange) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target.result;
        onChange(imageUrl); // Mengatur nilai gambar
      };

      reader.readAsDataURL(file);
    };
  };

  return (
    <FormField
      control={control}
      name={`customFields[${index}].value`}
      render={({ field }) => {
        return (
          <FormItem>
            {content?.labelField && (
              <FormLabel className="font-normal">
                {content.labelField}
              </FormLabel>
            )}
            <FormControl>
              <>
                {field.value && (
                  <div
                    style={{
                      backgroundColor: "#F5F5F5",
                      width: "100%",
                      overflow: "hidden",
                    }}
                    className="mx-auto mb-2"
                  >
                    <img
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: 100,
                      }}
                      src={field.value}
                      alt="img"
                    />
                  </div>
                )}

                <div className="flex w-full items-center gap-x-3 ">
                  <Button
                    className="w-full"
                    onClick={() => {
                      handleUpload(field.onChange);
                    }}
                    variant="outline"
                  >
                    <RxUpload />
                    Upload Image
                  </Button>

                  {field.value && (
                    <Button
                      className="w-full"
                      onClick={() => field.onChange("")}
                      variant="destructive"
                    >
                      <FaRegTrashCan />
                      Remove Image
                    </Button>
                  )}
                </div>
              </>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default ViewImageField;
