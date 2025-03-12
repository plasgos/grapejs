import moment from "moment";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";

import ViewCountDown from "@/view/countdown";
import { PiClockCountdownFill } from "react-icons/pi";
const today = moment();
const futureDate = today.clone().add(7, "days"); // Duplikasi untuk menghindari mutasi

const date = futureDate.date(); // Tanggal
const month = futureDate.month() + 1; // Bulan (0-indexed, jadi tambahkan 1)
const years = futureDate.year(); // Tahun

export const registerCountdown = (editor) => {
  editor.BlockManager.add("countdown", {
    label: "Countdown",
    category: "Contents",
    content: { type: "countdown" },
    activate: true,
    media: renderToString(<PiClockCountdownFill size={40} />),
  });

  editor.Components.addType("countdown", {
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: false,
        selectable: true,
        highlightable: true,
        hoverable: true,
        removable: false, // Nonaktifkan penghapusan
        copyable: false, // Nonaktifkan copy
        toolbar: [], // Hilangkan toolbar
        noMove: true, // Nonaktifkan pergerakan (sorting)
        noResize: true, // Nonaktifkan perubahan ukuran
        attributes: {},
        category: "Contents",
        blockLabel: "Countdown",
        blockIcon: <PiClockCountdownFill size={20} />,
        customComponent: {
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
                dateView: "",
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
            textColor: "#000000",
            textAlign: "tw-justify-center",
            textShadow: undefined,
            fontSize: "tw-text-base",
          },
          background: {
            bgType: null,
            bgColor: "#2196f3",
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
            daysColor: "#7E2E84",
            hoursColor: "#D14081",
            minutesColor: "#EF798A",
            secondsColor: "#218380",
            size: 20,
          },
        },
      },
    },

    view: {
      init() {
        this.listenTo(
          this.model,
          "change:customComponent",
          this.renderReactComponent
        );

        this.renderReactComponent();
      },

      renderReactComponent() {
        if (!this.root) {
          this.root = createRoot(this.el); // Hanya buat satu instance root
        }

        this.root.render(
          <ViewCountDown
            section={this.model.get("customComponent")}
            editor={editor}
          />
        );
      },
    },
    remove() {
      if (this.reactRoot) {
        this.reactRoot.unmount();
      }
    },
  });
};
