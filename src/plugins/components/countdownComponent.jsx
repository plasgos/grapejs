import moment from "moment";

import ViewCountDown from "@/view/countdown";
import { PiClockCountdownFill } from "react-icons/pi";
import { injectComponents } from "../injectComponent";
const today = moment();
const futureDate = today.clone().add(7, "days"); // Duplikasi untuk menghindari mutasi

const date = futureDate.date(); // Tanggal
const month = futureDate.month() + 1; // Bulan (0-indexed, jadi tambahkan 1)
const years = futureDate.year(); // Tahun

const initialDateView = new Date(new Date().setDate(new Date().getDate() + 7));

export const countdownComponent = (editor) => {
  injectComponents(editor, {
    type: "countdown",
    label: "Countdown",
    icon: <PiClockCountdownFill />,
    ViewComponent: ViewCountDown,
    defaultCustomComponent: {
      scrollTarget: undefined,
      contents: [
        {
          id: "countdown-01",
          type: "date-time",
          datePicked: {
            date,
            month,
            years,
            hours: 8,
            minutes: 0,
            dateView: initialDateView,
          },
          duration: {
            hours: 2,
            minutes: 30,
          },
        },
      ],
      finish: {
        isFinished: false,
        previewMode: "countdown",
        text: `<p style="text-align:center;"><span style="font-size:26px;"><strong>Sudah Selesai</strong></span></p>`,
        textColor: "",
        textAlign: "tw-justify-center",
        textShadow: null,
        fontSize: "tw-text-base",
      },
      background: {
        bgType: null,
        bgColor: "",
        bgImage: "",
        blur: 0,
        opacity: 0,
        paddingY: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingType: "vertical",
        direction: "to right",
        fromColor: "",
        toColor: "",
        isRevert: false,
        pattern: "",
      },
      wrapperStyle: {
        variant: "circle",
        daysColor: "rgba(126, 46, 132,1)",
        hoursColor: "rgba(209, 64, 129,1)",
        minutesColor: "rgba(239, 121, 138,1)",
        secondsColor: "rgba(33, 131, 128,1)",
        size: 20,
      },
      animation: {
        type: null,
        duration: 1,
        delay: null,
        isReplay: false,
      },
    },
  });
};
