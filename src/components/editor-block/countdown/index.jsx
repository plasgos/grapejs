import TabsEditor from "@/components/TabsEditor";
import { TabsContent } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { useChangeContents } from "@/hooks/useChangeContents";

import { Label } from "@/components/ui/label";
import { useChangeWrapperStyles } from "@/hooks/useChangeWrapperStyles";

import BackgroundEditor from "../components/BackgroundEditor";
import { CiText } from "react-icons/ci";
import { GoNumber } from "react-icons/go";
import { SiStagetimer } from "react-icons/si";
import SelectCircle from "../components/SelectCircle";
import SelectOptions from "../components/SelectOptions";
import { Input } from "@/components/ui/input";
import { produce } from "immer";
import StylesTab from "./StylesTab";
import { useState } from "react";
import TextEditor from "../components/TextEditor";
import DatePicker from "react-datepicker";
import { CalendarMinus2 } from "lucide-react";
import { textShadowOptions } from "@/components/SelectOptions";
import TransiitonEditor from "../components/TransiitonEditor";

const modeOptions = [
  { value: "countdown", label: "Countdown" },
  { value: "finished", label: "Finished" },
];

const variantCountdownOptions = [
  { value: "basic", label: "Basic", icon: <CiText /> },
  { value: "digital", label: "Digital", icon: <GoNumber /> },
  { value: "circle", label: "Circle", icon: <SiStagetimer /> },
];

const typeCountdownOptions = [
  { value: "duration", label: "Duration" },
  { value: "date-time", label: "Date Time" },
];

const minuteOptions = Array.from({ length: 60 }, (_, i) => {
  const value = i; // Menyimpan nilai menit langsung (0-59)
  const label = i < 10 ? `0${i}` : `${i}`; // Format label untuk menit
  return { value, label };
});

const EditorCountdown = ({ selectedComponent }) => {
  const { contents, setContents, handleContentChange } =
    useChangeContents(selectedComponent);

  const { wrapperStyle, handleStylesChange } =
    useChangeWrapperStyles(selectedComponent);

  const [finished, setFinished] = useState(
    selectedComponent?.get("customComponent").finish
  );

  /*   const [previewMode, setPreviewMode] = useState("countdown"); */

  const handleCountdownChange = (id, source, key, value) => {
    setContents((prevContents) =>
      prevContents.map((content) =>
        content.id === id
          ? {
              ...content,
              [source]: {
                ...content[source],
                [key]: value,
              },
            }
          : content
      )
    );

    // Update GrapesJS canvas component
    selectedComponent?.set(
      "customComponent",
      produce(selectedComponent?.get("customComponent"), (draft) => {
        draft.contents = draft.contents.map((content) =>
          content.id === id
            ? {
                ...content,
                [source]: {
                  ...content[source],
                  [key]: value,
                },
              }
            : content
        );
      })
    );
  };

  const handleFinishedChange = (key, value) => {
    selectedComponent?.set(
      "customComponent",
      produce(selectedComponent?.get("customComponent"), (draft) => {
        draft.finish[key] = value;
      })
    );

    setFinished((prevValue) => ({
      ...prevValue,
      [key]: value,
    }));
  };

  const handlePreviewChange = (value) => {
    if (value === "finished") {
      handleFinishedChange("isFinished", true);
      handleFinishedChange("previewMode", value);
    } else {
      handleFinishedChange("isFinished", false);
      handleFinishedChange("previewMode", value);
    }
  };

  const filterPassedDate = (date) => {
    const currentDate = new Date();
    // Hanya nonaktifkan tanggal sebelum hari ini
    return date >= new Date(currentDate.setHours(0, 0, 0, 0));
  };

  const handleDateChange = (newDate) => {
    const selectedDay = newDate.getDate(); // Hari
    const selectedMonth = newDate.getMonth() + 1; // Bulan (0-indexed)
    const selectedYear = newDate.getFullYear(); // Tahun

    const selectedHour = newDate.getHours(); // Jam (0-23)
    const selectedMinute = newDate.getMinutes(); // Menit (0-59)

    setContents((prevContents) =>
      prevContents.map((content) =>
        content.id === contents[0].id
          ? {
              ...content,
              datePicked: {
                ...content.datePicked,
                date: selectedDay,
                month: selectedMonth,
                years: selectedYear,
                dateView: newDate,
                hours: selectedHour,
                minutes: selectedMinute,
              },
            }
          : content
      )
    );

    // Update GrapesJS canvas component
    selectedComponent?.set(
      "customComponent",
      produce(selectedComponent?.get("customComponent"), (draft) => {
        draft.contents = draft.contents.map((content) =>
          content.id === contents[0].id
            ? {
                ...content,
                datePicked: {
                  ...content.datePicked,
                  date: selectedDay,
                  month: selectedMonth,
                  years: selectedYear,
                  dateView: newDate,
                  hours: selectedHour,
                  minutes: selectedMinute,
                },
              }
            : content
        );
      })
    );
  };

  return (
    <TabsEditor>
      <TabsContent
        className="px-4 pb-5 animate__animated animate__fadeInLeft"
        value="content"
      >
        <div className="flex flex-col gap-y-5  mt-4 bg-white p-3 rounded-lg">
          <div className="flex items-center gap-x-3">
            {modeOptions.map((mode) => {
              return (
                <Button
                  key={mode.value}
                  type="button"
                  className={`${
                    finished.previewMode === mode.value
                      ? "border-primary bg-orange-100 text-primary"
                      : ""
                  } hover:bg-orange-50`}
                  onClick={() => handlePreviewChange(mode.value)}
                  variant="outline"
                >
                  {mode.label}
                </Button>
              );
            })}
          </div>

          {finished.previewMode === "countdown" ? (
            <>
              <SelectCircle
                label="Variant"
                options={variantCountdownOptions}
                value={wrapperStyle.variant}
                onClick={(value) => handleStylesChange("variant", value)}
              />

              <SelectOptions
                label="Countdown Type"
                options={typeCountdownOptions}
                value={contents[0].type}
                onChange={(value) =>
                  handleContentChange(contents[0].id, "type", value)
                }
              />

              {contents[0].type === "duration" ? (
                <div className="w-full flex gap-x-3">
                  <div className="space-y-2">
                    <Label>Hours</Label>
                    <Input
                      type="number"
                      value={contents[0].duration.hours}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleCountdownChange(
                          contents[0].id,
                          "duration",
                          "hours",
                          value
                        );
                      }}
                    />
                  </div>

                  <SelectOptions
                    label="Minutes"
                    options={minuteOptions}
                    value={contents[0].duration.minutes}
                    onChange={(value) =>
                      handleCountdownChange(
                        contents[0].id,
                        "duration",
                        "minutes",
                        value
                      )
                    }
                  />
                </div>
              ) : (
                <DatePicker
                  placeholderText="Select Date"
                  className="border rounded-lg  w-full bg-white cursor-pointer "
                  showIcon
                  icon={<CalendarMinus2 className="mt-0.5" />}
                  selected={contents[0].datePicked.dateView}
                  onChange={(date) => handleDateChange(date)}
                  showTimeSelect
                  dateFormat=" MMM d, yyyy h:mm aa"
                  timeIntervals={30} // Set interval waktu dalam menit
                  timeCaption="Time"
                  popperPlacement="bottom-end"
                  filterDate={filterPassedDate} // Menonaktifkan tanggal yang telah berlalu
                />
              )}
            </>
          ) : (
            <>
              <SelectOptions
                label="Text Shadow"
                options={textShadowOptions}
                value={finished.textShadow}
                onChange={(value) => handleFinishedChange("textShadow", value)}
              />

              <TextEditor
                label="Content"
                value={finished.text}
                onChange={(value) => handleFinishedChange("text", value)}
              />
            </>
          )}
        </div>
      </TabsContent>

      <TabsContent
        className="px-4 pb-5 animate__animated animate__fadeInLeft"
        value="styles"
      >
        <StylesTab selectedComponent={selectedComponent} />
      </TabsContent>

      <TabsContent className="px-4 pb-5" value="transition">
        <TransiitonEditor selectedComponent={selectedComponent} />
      </TabsContent>

      <TabsContent
        className="px-4 pb-5 animate__animated animate__fadeInLeft"
        value="background"
      >
        <BackgroundEditor selectedComponent={selectedComponent} />
      </TabsContent>
    </TabsEditor>
  );
};

export default EditorCountdown;
