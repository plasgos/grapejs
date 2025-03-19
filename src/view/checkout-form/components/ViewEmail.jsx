import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const ViewEmail = ({ content, index }) => {
  const { control } = useFormContext();

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
                type={"email"}
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

export default ViewEmail;
