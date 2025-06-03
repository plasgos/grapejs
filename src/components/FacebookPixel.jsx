import { useState } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Input } from "./ui/input";
import SelectOptions from "@/plugins/plasgos/components/_components-editor/SelectOptions";

const FacebookPixel = () => {
  const { optionsFbPixelId, optionsFbPixelEvent } = useSelector(
    (state) => state.landingPage
  );

  const [eventName, setEventName] = useState("");
  const [pixelValue, setPixelValue] = useState("");
  const [contentName, setContentName] = useState("");

  const [selectedOptionPixelEvent, setSelectedOptionPixelEvent] = useState(
    optionsFbPixelEvent[0].options[0]?.value
  );

  const [selectedOptionPixelId, setSelectedOptionPixelId] = useState(
    optionsFbPixelId[0]
  );

  const handleChangeOptionsPixelEvent = (selectedOptionValue) => {
    setSelectedOptionPixelEvent(selectedOptionValue);
  };

  const handleChangeOptionsPixelId = (selectedOptionValue) => {
    setSelectedOptionPixelId(selectedOptionValue);
  };

  const handleChangeContentName = (value) => {
    setContentName(value);
  };

  const handleChangeEventName = (value) => {
    setEventName(value);
  };

  const handleChangePixelValue = (value) => {
    setPixelValue(+value);
  };

  return (
    <div className="my-3">
      <div
        className="flex items-center mb-2 p-2 bg-muted rounded 
           "
      >
        <FaFacebookF style={{ marginRight: 4 }} /> Facebook Pixel
      </div>
      <div className="">
        {selectedOptionPixelEvent &&
        selectedOptionPixelEvent.value !== null &&
        selectedOptionPixelEvent.value !== "custom" ? (
          <div className="flex flex-col gap-y-2">
            <div style={{ gap: 10 }} className="flex items-center ">
              <SelectOptions
                label="Pixel Event"
                options={optionsFbPixelEvent}
                onChange={handleChangeOptionsPixelEvent}
                value={selectedOptionPixelEvent}
              />

              <SelectOptions
                label="Pixel Id"
                options={optionsFbPixelId}
                onChange={handleChangeOptionsPixelId}
                value={selectedOptionPixelId}
              />
            </div>

            <div style={{ gap: 10 }} className="flex items-center ">
              <Input
                label="Content Name"
                value={contentName}
                placeholder="T-Shirt"
                type="text"
                onChange={(e) => handleChangeContentName(e.target.value)}
              />

              <Input
                label="Pixel Value"
                value={pixelValue}
                placeholder="0 (Harga Barang)"
                type="number"
                onChange={(e) => handleChangePixelValue(e.target.value)}
              />
            </div>
          </div>
        ) : selectedOptionPixelEvent?.value === "custom" ? (
          <div className="flex flex-col gap-y-2">
            <div style={{ gap: 10 }} className="flex items-center ">
              <SelectOptions
                label="Pixel Event"
                options={optionsFbPixelEvent}
                onChange={handleChangeOptionsPixelEvent}
                value={selectedOptionPixelEvent}
              />
              <Input
                label="Event Name"
                value={eventName}
                placeholder="Custom Event"
                type="text"
                onChange={(e) => handleChangeEventName(e.target.value)}
              />
            </div>

            <div style={{ gap: 10 }} className="flex items-center ">
              <SelectOptions
                label="Pixel Id"
                options={optionsFbPixelId}
                onChange={handleChangeOptionsPixelId}
                value={selectedOptionPixelId}
              />
              <Input
                label="Content Name"
                value={contentName}
                placeholder="T-Shirt"
                type="text"
                onChange={(e) => handleChangeContentName(e.target.value)}
              />
            </div>

            <div style={{ gap: 10 }} className=" w-1/2 flex items-center ">
              <Input
                label="Pixel Value"
                value={pixelValue}
                placeholder="0 (Harga Barang)"
                type="number"
                onChange={(e) => handleChangePixelValue(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div style={{ gap: 10 }} className="flex items-center ">
            <SelectOptions
              label="Pixel Event"
              options={optionsFbPixelEvent}
              onChange={handleChangeOptionsPixelEvent}
              value={selectedOptionPixelEvent}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FacebookPixel;
