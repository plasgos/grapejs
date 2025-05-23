import { useSelector } from "react-redux";
import RenderFromData from "./_components/RenderFromData";

const DeployPage = () => {
  const { deployData } = useSelector((state) => state.landingPage);

  const frameGlobalOptions = deployData?.globalOptions;
  const { bgColor } = frameGlobalOptions || {};

  return (
    <div
      style={{
        backgroundColor: bgColor || "white",
      }}
      className="min-h-screen mx-auto"
    >
      <RenderFromData projectData={deployData} />
    </div>
  );
};

export default DeployPage;
