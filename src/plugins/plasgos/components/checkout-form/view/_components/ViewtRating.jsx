import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";

const ViewRating = ({ content, index }) => {
  const { control } = useFormContext();

  const [hoverIndex, setHoverIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const getIconStyle = (index, color) => ({
    transition: "transform 0.2s ease, color 0.2s ease",
    cursor: "pointer",
    transform:
      (hoverIndex !== null && index <= hoverIndex) ||
      (selectedIndex !== null && index <= selectedIndex)
        ? "scale(1.25)"
        : "scale(1)",
    color:
      (hoverIndex !== null && index <= hoverIndex) ||
      (selectedIndex !== null && index <= selectedIndex)
        ? color
        : "#E0E0E0", // Default grey color for unselected and not hovered icons
  });

  const handleIconClick = (index, onChange) => {
    setSelectedIndex(index);
    onChange(index + 1); // Mengirim nilai yang dipilih (1-5)
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
                <div className="flex items-center gap-x-3">
                  {content.design === "stars" ? (
                    <div className="flex gap-x-2">
                      {Array.from({ length: 5 }, (_, index) => (
                        <FaStar
                          key={index}
                          onClick={() => handleIconClick(index, field.onChange)}
                          size={content.ratingSize}
                          style={getIconStyle(index, "#f59e0b")}
                          onMouseEnter={() => setHoverIndex(index)}
                          onMouseLeave={() => setHoverIndex(null)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex gap-x-2">
                      {Array.from({ length: 5 }, (_, index) => (
                        <IoMdHeart
                          key={index}
                          onClick={() => handleIconClick(index, field.onChange)}
                          size={content.ratingSize}
                          style={getIconStyle(index, "#ff0000")}
                          onMouseEnter={() => setHoverIndex(index)}
                          onMouseLeave={() => setHoverIndex(null)}
                        />
                      ))}
                    </div>
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

export default ViewRating;
