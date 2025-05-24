import { useSelector } from "react-redux";
import RenderFromData from "./_components/RenderFromData";
import Watermark from "@/components/Watermark";

const DeployPage = () => {
  const { deployData } = useSelector((state) => state.landingPage);

  const frameGlobalOptions = deployData?.globalOptions;
  const { bgColor } = frameGlobalOptions || {};

  return (
    <div
      style={{
        backgroundColor: bgColor || "white",
      }}
      className="min-h-screen flex flex-col mx-auto"
    >
      <main className="flex-1">
        <RenderFromData projectData={deployData} />
      </main>
      {frameGlobalOptions?.watermark && <Watermark />}
    </div>
  );
};

export default DeployPage;
