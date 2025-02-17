import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const options = [
  {
    value: "font-thin",
    label: "Font Thin", // fontWeight: 100
  },
  {
    value: "font-extralight",
    label: "Font Extralight", // fontWeight: 200
  },
  {
    value: "font-light",
    label: "Font Light", // fontWeight: 300
  },
  {
    value: "font-normal",
    label: "Font Normal", // fontWeight: 400
  },
  {
    value: "font-medium",
    label: "Font Medium", // fontWeight: 500
  },
  {
    value: "font-semibold",
    label: "Font Semibold", // fontWeight: 600
  },
  {
    value: "font-bold",
    label: "Font Bold", // fontWeight: 700
  },
  {
    value: "font-extrabold",
    label: "Font Extrabold", // fontWeight: 800
  },
  {
    value: "font-black",
    label: "Font Black", // fontWeight: 900
  },
];

const SelectFontWeight = ({ asChild, label, value, onChange }) => {
  return (
    <div className="w-full flex items-center justify-between">
      {label && (
        <Label className={`${asChild && "font-normal"}`}>{label}</Label>
      )}

      <Select value={value} onValueChange={(value) => onChange(value)}>
        <SelectTrigger className="w-[180px] bg-muted">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem className={opt.value} key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectFontWeight;
