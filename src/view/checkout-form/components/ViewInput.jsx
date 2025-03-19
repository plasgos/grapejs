import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const ViewInput = ({ content, index }) => {
  const { control, getValues } = useFormContext();

  const values = getValues();
  console.log("🚀 ~ ViewInput ~ values:", values);

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
              <Input
                value={field.value ?? ""}
                type={content?.inputType || "text"}
                className="placeholder:text-neutral-300"
                placeholder={content?.placeholder}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default ViewInput;
