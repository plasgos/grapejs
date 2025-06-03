import { Button } from "@/components/ui/button";
import { FaCheckCircle } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MdOutlineReadMore } from "react-icons/md";

const patterns = [
  "https://ik.imagekit.io/ez1ffaf6o/patterns/pattern11.webp?updatedAt=1748932319488",
  "https://ik.imagekit.io/ez1ffaf6o/patterns/pattern7.webp?updatedAt=1748932320770",
  "https://ik.imagekit.io/ez1ffaf6o/patterns/pattern14.webp?updatedAt=1748932321453",
  "https://ik.imagekit.io/ez1ffaf6o/patterns/pattern13.webp?updatedAt=1748932322379",
  "https://ik.imagekit.io/ez1ffaf6o/patterns/pattern15.webp?updatedAt=1748932322815",
  "https://ik.imagekit.io/ez1ffaf6o/patterns/pattern10.webp?updatedAt=1748932323590",
  "https://ik.imagekit.io/ez1ffaf6o/patterns/pattern12.webp?updatedAt=1748932323656",
  "https://ik.imagekit.io/ez1ffaf6o/patterns/pattern9.webp?updatedAt=1748932324100",
  "https://ik.imagekit.io/ez1ffaf6o/patterns/pattern8.webp?updatedAt=1748932326301",
  "https://ik.imagekit.io/ez1ffaf6o/patterns/pattern16.webp?updatedAt=1748932327256",
];

const PatternBox = ({ img, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-lg shadow-md cursor-pointer w-full h-[100px] ${
        isSelected ? "opacity-80" : "opacity-100"
      } `}
    >
      <LazyLoadImage
        src={img}
        alt="pattern"
        className="object-cover w-full h-full group-hover:scale-110 transform transition-all ease-in-out"
        loading="lazy"
        effect="blur"
        visibleByDefault={true}
        wrapperProps={{
          style: { transitionDelay: "1s" },
        }}
      />

      <div className="absolute inset-0  opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity duration-300" />

      {isSelected && (
        <div className="absolute top-2 right-2 text-green-600">
          <FaCheckCircle className="scale-125" />
        </div>
      )}
    </div>
  );
};

const PatternOptions = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="grid grid-cols-2 gap-3">
        {patterns.slice(0, 4).map((item, index) => {
          const handleSelectPattern = () => {
            onChange("background.pattern", item);
          };

          const isSelected = item === value;

          return (
            <div key={index}>
              <PatternBox
                img={item}
                isSelected={isSelected}
                onClick={handleSelectPattern}
              />
            </div>
          );
        })}
      </div>

      <div className="w-full flex justify-center my-5">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="px-[26px]">
              More Pattern <MdOutlineReadMore />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" w-[300px] h-[400px] overflow-y-auto relative -right-3">
            <div className="grid grid-cols-2 gap-3">
              {patterns.map((item, index) => {
                const handleSelectPattern = () => {
                  onChange("background.pattern", item);
                };

                const isSelected = item === value;

                return (
                  <div key={index}>
                    <PatternBox
                      img={item}
                      isSelected={isSelected}
                      onClick={handleSelectPattern}
                    />
                  </div>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default PatternOptions;
