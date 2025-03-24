import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ImageUploader = ({ label, handleFileUpload, image }) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div
        style={{
          backgroundColor: "#F5F5F5",
          width: "100%",
          overflow: "hidden",
        }}
        className="mx-auto mb-3 border rounded-md  "
      >
        <img
          style={{ objectFit: "contain", width: "100%", height: 120 }}
          src={image}
          alt="img"
        />
      </div>

      <Button className="w-full" onClick={handleFileUpload} variant="outline">
        Upload
      </Button>
    </div>
  );
};

export default ImageUploader;
