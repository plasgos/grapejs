import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

const ViewCheckbox = ({ content, index }) => {
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
        render={({ field }) => {
          // Pastikan field.value selalu berupa array jika multiple select
          const currentValue = content.isMultipleSelect
            ? Array.isArray(field.value)
              ? field.value
              : []
            : field.value || null;

          const handleChange = (option) => {
            if (content.isMultipleSelect) {
              // Jika multiple select, toggle nilai dalam array
              const isSelected = currentValue.some(
                (item) => item.id === option.id
              );

              field.onChange(
                isSelected
                  ? currentValue.filter((item) => item.id !== option.id) // Hapus jika sudah ada
                  : [...currentValue, option] // Tambahkan jika belum ada
              );
            } else {
              // Jika single select, hanya simpan satu nilai
              field.onChange(option);
            }
          };

          return (
            <FormItem
              className={`${
                content?.layout !== "horizontal"
                  ? "flex flex-col gap-2 space-y-0"
                  : "flex flex-wrap items-center gap-5 space-y-0"
              }`}
            >
              {content.options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-2 my-1"
                >
                  <FormControl>
                    <Checkbox
                      id={option.id}
                      checked={
                        content.isMultipleSelect
                          ? currentValue.some((item) => item.id === option.id) // Cek apakah ada di array
                          : currentValue?.id === option.id // Cek single select
                      }
                      onCheckedChange={() => handleChange(option)}
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
              {errors?.customFields?.[index]?.value && (
                <FormMessage>
                  {errors.customFields[index].value.message}
                </FormMessage>
              )}
            </FormItem>
          );
        }}
      />
    </div>
  );
};

export default ViewCheckbox;
