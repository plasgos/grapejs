import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ViewNewsletter = ({ children, content, index, wrapperStyle }) => {
  return (
    <div
      style={{
        maxWidth: content.width,
      }}
      key={index}
    >
      {children}
      <p
        style={{
          color: wrapperStyle.subHeadingColor,
        }}
      >
        {content.subTitle}
      </p>

      <div className="flex   gap-2 my-2 ">
        <Input placeholder={content.placeholder} />

        <Button
          style={{
            backgroundColor: content.buttonColor ? content.buttonColor : "",
            color: content.textButton ? content.textButton : "",
          }}
        >
          {content.actionText}
        </Button>
      </div>
    </div>
  );
};

export default ViewNewsletter;
