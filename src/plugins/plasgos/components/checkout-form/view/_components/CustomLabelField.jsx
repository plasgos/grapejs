import { Label } from "@/components/ui/label";

const CustomLabelField = ({ label, size, color }) => {
  return (
    <Label
      style={{
        fontSize: size,
        color,
      }}
      className="font-normal"
    >
      {label}
    </Label>
  );
};

export default CustomLabelField;
