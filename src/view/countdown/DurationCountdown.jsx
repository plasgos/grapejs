import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { FinishedContent } from "./DateCountDown";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

const DurationCountdown = ({ styles, content, finish }) => {
  const [isPreviewFinished, setIsPreviewFinished] = useState(false);

  const { hours, minutes } = content.duration;

  const {
    daysColor,
    hoursColor,
    minutesColor,
    secondsColor,
    size,
    dividerColor,
    variant,
  } = styles || {};

  const { isFinished, text, textShadow, textColor } = finish;

  const startTime = Date.now() / 1000;
  const endTime = startTime + hours * hourSeconds + minutes * minuteSeconds;

  const daysDuration =
    daySeconds + hours * hourSeconds + minutes * minuteSeconds;

  const initialSize = 20; // size awal
  const initialFontSize = 32; // fontSize awal

  const timerProps = {
    isPlaying: true,
    size: size * 5,
    strokeWidth: 6,
  };

  const dynamicFontSize = (size / initialSize) * initialFontSize * 0.6;

  const [remainingTime, setRemainingTime] = useState(endTime - startTime);

  useEffect(() => {
    const newEndTime = Date.now() / 1000 + hours * 3600 + minutes * 60;
    setRemainingTime(newEndTime - Date.now() / 1000);
  }, [hours, minutes]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        // Hitung waktu baru
        const newTime = prevTime > 0 ? prevTime - 1 : 0;
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval); // Bersihkan interval saat unmount
  }, [hours, minutes, startTime]);

  const formatTime = (totalSeconds) => {
    const daysView = Math.floor(totalSeconds / (24 * 3600));
    const hoursView = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutesView = Math.floor((totalSeconds % 3600) / 60);
    const secondsView = totalSeconds % 60;
    return { daysView, hoursView, minutesView, secondsView };
  };

  const { daysView, hoursView, minutesView, secondsView } =
    formatTime(remainingTime);

  useEffect(() => {
    if (isFinished) {
      setIsPreviewFinished(true);
    } else {
      setIsPreviewFinished(false);
    }
  }, [isFinished]);

  if (isPreviewFinished) {
    return (
      <FinishedContent
        text={text}
        textShadow={textShadow}
        textColor={textColor}
      />
    );
  }

  const renderTime = (dimension, time) => {
    let label;
    switch (dimension) {
      case "days":
        label = "Hari";
        break;
      case "hours":
        label = "Jam";
        break;
      case "minutes":
        label = "Menit";
        break;
      case "seconds":
        label = "Detik";
        break;
      default:
        label = dimension; // Jika dimension tidak dikenal, tampilkan nama aslinya
        break;
    }
    return (
      <div className="flex flex-col items-center">
        <div style={{ fontSize: dynamicFontSize }} className="font-semibold">
          {time}
        </div>
        <div style={{ fontSize: dynamicFontSize }}>{label}</div>
      </div>
    );
  };

  return (
    <>
      {variant === "basic" && (
        <div>
          {remainingTime > 0 && !isFinished ? (
            <div className="flex flex-wrap justify-center items-center gap-3">
              <div
                style={{
                  fontSize: size,
                  color: dividerColor,
                }}
                className="flex items-center gap-2  font-bold"
              >
                {daysView > 0 && (
                  <div className={`font-bold `}>
                    <span
                      style={{
                        fontSize: size,
                        color: daysColor,
                      }}
                      className={`font-bold `}
                    >
                      {daysView} Hari
                    </span>{" "}
                    - <br />
                  </div>
                )}
                {hoursView > 0 && (
                  <div className={`font-bold `}>
                    <span
                      style={{
                        fontSize: size,
                        color: hoursColor,
                      }}
                      className={`font-bold `}
                    >
                      {hoursView} Jam
                    </span>{" "}
                    - <br />
                  </div>
                )}
                <span
                  style={{
                    fontSize: size,
                    color: minutesColor,
                  }}
                  className={`font-bold `}
                >
                  {minutesView} Menit
                </span>{" "}
                - <br />
                <span
                  style={{
                    fontSize: size,
                    color: secondsColor,
                  }}
                  className={`font-bold `}
                >
                  {secondsView} Detik
                </span>
              </div>
            </div>
          ) : (
            <FinishedContent text={text} textShadow={textShadow} />
          )}
        </div>
      )}

      {variant === "digital" && (
        <div className="flex flex-wrap justify-center items-center gap-3">
          {remainingTime > 0 && !isFinished ? (
            <div className="flex flex-wrap justify-center items-center gap-3">
              <div
                style={{
                  fontSize: size,
                  color: dividerColor,
                }}
                className="flex items-center  font-bold"
              >
                {daysView > 0 && (
                  <div className="mr-2">
                    <span
                      style={{
                        fontSize: size,
                        color: daysColor,
                      }}
                      className={`font-bold `}
                    >
                      {daysView} Hari
                    </span>{" "}
                    - <br />
                  </div>
                )}
                <div>
                  <span
                    style={{
                      fontSize: size,
                      color: hoursColor,
                    }}
                    className={`font-bold `}
                  >
                    {hoursView === 0
                      ? "00"
                      : hoursView.toString().padStart(2, "0")}
                  </span>
                  : <br />
                </div>
                <span
                  style={{
                    fontSize: size,
                    color: minutesColor,
                  }}
                  className={`font-bold `}
                >
                  {minutesView === 0
                    ? "00"
                    : minutesView.toString().padStart(2, "0")}
                </span>{" "}
                : <br />
                <span
                  style={{
                    fontSize: size,
                    color: secondsColor,
                  }}
                  className={`font-bold `}
                >
                  {secondsView === 0
                    ? "00"
                    : secondsView.toString().padStart(2, "0")}
                </span>
              </div>
            </div>
          ) : (
            <FinishedContent text={text} textShadow={textShadow} />
          )}
        </div>
      )}

      {variant === "circle" && (
        <div>
          {remainingTime > 0 && !isFinished ? (
            <div className="flex flex-wrap justify-center items-center gap-3">
              <>
                {remainingTime >= daySeconds && (
                  <CountdownCircleTimer
                    key={`days-${hours}-${minutes}-${remainingTime}`}
                    {...timerProps}
                    colors={daysColor}
                    duration={daysDuration}
                    initialRemainingTime={remainingTime}
                  >
                    {({ elapsedTime, color }) => (
                      <span style={{ color }}>
                        {renderTime(
                          "days",
                          getTimeDays(daysDuration - elapsedTime)
                        )}
                      </span>
                    )}
                  </CountdownCircleTimer>
                )}

                {remainingTime >= hourSeconds && (
                  <CountdownCircleTimer
                    key={`hours-${hours}-${minutes}-${remainingTime}`}
                    {...timerProps}
                    colors={hoursColor}
                    duration={daySeconds}
                    initialRemainingTime={remainingTime % daySeconds}
                    onComplete={(totalElapsedTime) => {
                      const finish =
                        remainingTime - totalElapsedTime <= hourSeconds;

                      return { shouldRepeat: !finish }; // Jangan ulang jika sudah selesai
                    }}
                  >
                    {({ elapsedTime, color }) => (
                      <span style={{ color }}>
                        {renderTime(
                          "hours",
                          getTimeHours(daySeconds - elapsedTime)
                        )}
                      </span>
                    )}
                  </CountdownCircleTimer>
                )}
                <CountdownCircleTimer
                  key={`minutes-${hours}-${minutes}-${remainingTime}`}
                  {...timerProps}
                  colors={minutesColor}
                  duration={hourSeconds}
                  initialRemainingTime={remainingTime % hourSeconds}
                  onComplete={(totalElapsedTime) => {
                    const finish =
                      remainingTime - totalElapsedTime <= minuteSeconds;

                    return { shouldRepeat: !finish }; // Jangan ulang jika sudah selesai
                  }}
                >
                  {({ elapsedTime, color }) => (
                    <span style={{ color }}>
                      {renderTime(
                        "minutes",
                        getTimeMinutes(hourSeconds - elapsedTime)
                      )}
                    </span>
                  )}
                </CountdownCircleTimer>
                <CountdownCircleTimer
                  key={`seconds-${hours}-${minutes}-${remainingTime}`}
                  {...timerProps}
                  colors={secondsColor}
                  duration={minuteSeconds}
                  initialRemainingTime={remainingTime % minuteSeconds}
                  onComplete={(totalElapsedTime) => {
                    const finish = remainingTime - totalElapsedTime <= 0; // Cek apakah waktu sudah habis

                    return { shouldRepeat: !finish }; // Jangan ulang jika sudah selesai
                  }}
                >
                  {({ elapsedTime, color }) => {
                    return (
                      <span style={{ color }}>
                        {renderTime("seconds", getTimeSeconds(elapsedTime))}
                      </span>
                    );
                  }}
                </CountdownCircleTimer>
              </>
            </div>
          ) : (
            <FinishedContent
              text={text}
              textShadow={textShadow}
              textColor={textColor}
            />
          )}
        </div>
      )}
    </>
  );
};

export default DurationCountdown;
