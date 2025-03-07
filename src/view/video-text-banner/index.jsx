import ContainerView from "@/components/ContainerView";
import useAnimatedVisibility from "@/hooks/useAnimatedVisibility";
import "react-lazy-load-image-component/src/effects/blur.css";

const ViewVideoText = ({ section }) => {
  const { contents, animation, animationText } = section;

  const { elementRef, getClassName, duration } =
    useAnimatedVisibility(animation);

  const {
    elementRef: elementRefContent,
    getClassName: getClassNameContent,
    duration: durationContent,
  } = useAnimatedVisibility(animationText);

  const getYoutubeUrl = (url) => {
    if (url) {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get("v"); // Mendapatkan parameter 'v' dari URL
      return videoId;
    }
  };

  return (
    <ContainerView id={section?.scrollTarget?.value || ""} section={section}>
      {contents.map((content) => (
        <div
          key={content.id}
          className="flex !flex-wrap md:!flex-nowrap  gap-x-5 items-center"
        >
          <div
            ref={elementRef}
            className={`${getClassName()} `}
            style={{
              transform: `rotate(${content.rotation}deg)`,
              zIndex: 999,
              overflow: "hidden",
              // margin: "auto",
              aspectRatio: content.ratio,
              "--animation-duration": `${duration}s`,
              width: `${content.width}px`,
              height: `${content.width * content.ratio}`,
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${getYoutubeUrl(
                content.url
              )}?autoplay=${content.isAutoPlay ? 1 : 0}&mute=${
                content.isMuted ? 1 : 0
              }&playlist=${getYoutubeUrl(content.url)}&loop=${
                content.isLoop ? 1 : 0
              }&controls=${content.isControls ? 0 : 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube Video"
            />
          </div>

          <div
            ref={elementRefContent}
            className={`${getClassNameContent()} p-3 md:p-0  `}
            style={{
              "--animation-duration": `${durationContent}s`,
            }}
          >
            <div
              style={{
                textShadow: content?.textShadow,
              }}
              // className={`tw-p-2 ${content?.content.fontSize} ${content?.content.textAlign}`}
              dangerouslySetInnerHTML={{ __html: content.textBanner }}
            />
          </div>
        </div>
      ))}
    </ContainerView>
  );
};

export default ViewVideoText;
