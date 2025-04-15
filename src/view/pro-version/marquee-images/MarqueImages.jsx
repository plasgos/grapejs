import { motion } from "framer-motion";

const MarqueeImages = ({ images, from = 0, to = "-100%" }) => {
  const renderImages = () => {
    return (
      <motion.div
        initial={{ x: `${from}` }}
        animate={{ x: `${to}` }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0"
      >
        {images.map((image, index) => {
          return (
            <img
              className="h-36 w-36 md:h-40 md:w-56  pr-10 md:pr-20 object-contain"
              src={image.image}
              key={index}
            />
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className="flex ">
      {renderImages()}
      {renderImages()}
    </div>
  );
};

export default MarqueeImages;
