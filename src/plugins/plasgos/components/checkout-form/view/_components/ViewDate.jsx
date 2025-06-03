import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import DatePicker from "react-datepicker";
import { LuCalendarMinus2 } from "react-icons/lu";
import { useEffect } from "react";

const ViewDate = ({ content, index }) => {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    setValue(`customFields[${index}].value`, "");
  }, [content.isShowTime, index, setValue]);

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
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    style={{
                      width: content.width,
                    }}
                    className="border rounded-lg px-3 py-2 max-w-full text-left bg-white flex items-center justify-between"
                  >
                    {field.value && content.isShowTime
                      ? field.value.toLocaleString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : field.value && !content.isShowTime
                      ? field.value.toLocaleString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })
                      : `${content.placeholder}`}
                    <LuCalendarMinus2 className="ml-2 text-gray-500" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-full h-full">
                  <DatePicker
                    selected={field.value || content.value}
                    onChange={(date) => field.onChange(date)}
                    dateFormat=" MMM d, yyyy h:mm aa"
                    inline
                    showTimeSelect={content.isShowTime}
                    timeIntervals={10}
                    timeCaption="Time"
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default ViewDate;
