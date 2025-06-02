import { TabsContent } from "@/components/ui/tabs";
import SectionAddScrollTargetId from "../_components/SectionAddScrollTargetId";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import RangeInputSlider from "../_components/RangeInputSlider";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";

const EditorMaps = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  return (
    <>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInRight"
        value="content"
      >
        <div className="flex flex-col gap-y-5 py-1">
          <SectionAddScrollTargetId selectedComponent={selectedComponent} />

          <Accordion
            type="single"
            collapsible
            className="w-full max-w-2xl mx-auto"
          >
            <AccordionItem value="embed-guide">
              <AccordionTrigger>Cara Menyematkan Google Maps</AccordionTrigger>
              <AccordionContent className="space-y-4 text-sm text-muted-foreground bg-white rounded-lg p-3">
                <div>
                  <strong>Langkah 1:</strong> Buka{" "}
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Google Maps
                  </a>
                </div>

                <div>
                  <strong>Langkah 2:</strong> Cari lokasi yang ingin Anda
                  tampilkan, misalnya: <em>Monas, Jakarta</em>.
                </div>

                <div>
                  <strong>Langkah 3:</strong> Klik ikon{" "}
                  <em>&quot;Bagikan&quot;</em> &rarr; Pilih tab{" "}
                  <em>&quot;Sematkan peta&quot;</em> &rarr; Klik tombol{" "}
                  <em>&quot;Salin HTML&quot;</em>.
                </div>

                <div>
                  <strong>Langkah 4:</strong> Tempelkan kode <code>iframe</code>{" "}
                  ke dalam kolom input di editor kami.
                  <pre className="mt-2 bg-gray-100 p-2 rounded text-xs overflow-auto">
                    {`<iframe src="https://www.google.com/maps/embed?pb=..."
  width="600"
  height="450"
  style="border:0;"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade">
</iframe>`}
                  </pre>
                </div>

                <HiOutlineChevronDoubleDown className="mx-auto" size={20} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="space-y-2">
            <Label>Embed Iframe</Label>
            <Textarea
              value={currentComponent?.iframe}
              onChange={(e) => handleComponentChange("iframe", e.target.value)}
              className="min-h-[320px] bg-white"
            />
          </div>

          <RangeInputSlider
            label="Height"
            value={currentComponent?.height}
            onChange={(value) => handleComponentChange("height", value)}
            min={200}
            max={1000}
          />
        </div>
      </TabsContent>
    </>
  );
};

export default EditorMaps;
