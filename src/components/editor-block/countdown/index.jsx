import TabsEditor from "@/components/TabsEditor";
import { TabsContent } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

import { textShadowOptions } from "@/components/SelectOptions";
import { Input } from "@/components/ui/input";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { produce } from "immer";
import { CalendarMinus2 } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { CiText } from "react-icons/ci";
import { GoNumber } from "react-icons/go";
import { SiStagetimer } from "react-icons/si";
import BackgroundEditor from "../_components/BackgroundEditor";
import SelectCircle from "../_components/SelectCircle";
import SelectOptions from "../_components/SelectOptions";
import TextEditor from "../_components/TextEditor";
import TransitionEditor from "../_components/TransitionEditor";
import StylesTab from "./StylesTab";

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
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const { contents, wrapperStyle } = currentComponent;

  const [finished, setFinished] = useState(
    selectedComponent?.get("customComponent").finish
  );

  /*   const [previewMode, setPreviewMode] = useState("countdown"); */

  const handleCountdownChange = (id, source, key, value) => {
    setCurrentComponent((prevComponent) =>
      produce(prevComponent, (draft) => {
        const content = draft.contents.find((c) => c.id === id);
        if (content) {
          content[source][key] = value;
        }
      })
    );

    // Update GrapesJS canvas component
    selectedComponent?.set(
      "customComponent",
      produce(selectedComponent?.get("customComponent"), (draft) => {
        const content = draft.contents.find((c) => c.id === id);
        if (content) {
          content[source][key] = value;
        }
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

    setCurrentComponent((prevComponent) =>
      produce(prevComponent, (draft) => {
        const content = draft.contents.find((c) => c.id === contents[0].id);
        if (content) {
          content.datePicked = {
            date: selectedDay,
            month: selectedMonth,
            years: selectedYear,
            dateView: newDate,
            hours: selectedHour,
            minutes: selectedMinute,
          };
        }
      })
    );

    // Update GrapesJS canvas component
    selectedComponent?.set(
      "customComponent",
      produce(selectedComponent?.get("customComponent"), (draft) => {
        const content = draft.contents.find((c) => c.id === contents[0].id);
        if (content) {
          content.datePicked = {
            date: selectedDay,
            month: selectedMonth,
            years: selectedYear,
            dateView: newDate,
            hours: selectedHour,
            minutes: selectedMinute,
          };
        }
      })
    );
  };

  return (
    <TabsEditor>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
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
                onClick={(value) =>
                  handleComponentChange("wrapperStyle.variant", value)
                }
              />

              <SelectOptions
                label="Countdown Type"
                options={typeCountdownOptions}
                value={contents[0].type}
                onChange={(value) =>
                  handleComponentChange(
                    `contents.${contents[0].id}.type`,
                    value
                  )
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
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="styles"
      >
        <StylesTab selectedComponent={selectedComponent} />
      </TabsContent>

      <TabsContent className="px-4 pb-5" value="transition">
        <TransitionEditor selectedComponent={selectedComponent} />
      </TabsContent>

      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="background"
      >
        <BackgroundEditor selectedComponent={selectedComponent} />
      </TabsContent>
    </TabsEditor>
  );
};

export default EditorCountdown;
