import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const SelectCircle = ({ asChild, options, label, value, onClick }) => {
  const columnClass =
    options.length == "6"
      ? "grid-cols-6"
      : options.length == "5"
      ? "grid-cols-5"
      : options.length == "4"
      ? "grid-cols-4"
      : options.length == "3"
      ? "grid-cols-3"
      : options.length == "2"
      ? "grid-cols-2"
      : "grid-cols-1";

  return (
    <div className="space-y-5">
      <Label className={`${asChild ? "font-normal" : ""}`}>{label}</Label>
      <div className={`grid ${columnClass} gap-x-3 my-3  `}>
        {options.map((opt, index) => {
          const isSelected = opt.value === value;

          return (
            <div key={index} className="text-center">
              <Button
                onClick={() => onClick(opt.value)}
                size="icon"
                className={`h-10 w-10 rounded-full flex justify-center items-center mx-auto 
    ${
      isSelected
        ? "ring-offset-[3px] ring-[3px] ring-purple-600 bg-[#FFF4EA]"
        : "hover:ring-offset-2 ring-2 ring-slate-200 hover:ring-purple-300 hover:bg-[#FFF4EA] bg-muted"
    }`}
                variant="ghost"
              >
                <div
                  className={` scale-150 ${
                    value !== opt.value ? "text-slate-300" : "text-purple-600"
                  }`}
                >
                  {opt.icon}
                </div>
              </Button>

              <p
                className={`text-sm text-nowrap my-2 ${
                  isSelected ? "" : "text-slate-400"
                }`}
              >
                {opt.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectCircle;
