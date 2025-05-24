import plgLogo from "@/assets/plg-logo.png";

const Watermark = () => {
  return (
    <div
      id="plasgos-watermark"
      className="relative  flex justify-center items-center  bg-black p-3"
    >
      <p className="text-white">Powered By</p>

      <img src={plgLogo} alt="plasgos-logo" className="object-contain w-20 " />
    </div>
  );
};

export default Watermark;
