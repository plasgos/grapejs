import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

const ViewChecbox = ({ content, index }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <div className="mb-3">
        {content?.labelField && (
          <Label className="font-normal">{content.labelField}</Label>
        )}
      </div>

      <FormField
        control={control}
        name={`customFields[${index}].value`}
        render={({ field }) => (
          <FormItem className="flex items-center gap-5 space-y-0">
            {content.checkboxes.map((option) => (
              <div key={option.id} className="flex items-center space-x-2 my-1">
                <FormControl>
                  <Checkbox
                    id={option.id}
                    checked={field.value?.id === option.id}
                    onCheckedChange={() => field.onChange(option)}
                  />
                </FormControl>
                <Label
                  htmlFor={option.id}
                  className="text-sm font-medium cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
            {/* Hanya menampilkan satu pesan error */}
            {errors?.customFields?.[index]?.value && (
              <FormMessage>
                {errors.customFields[index].value.message}
              </FormMessage>
            )}
          </FormItem>
        )}
      />
    </div>
  );
};

export default ViewChecbox;
