import { Toaster } from "@/components/ui/toaster";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CanvasProvider } from "./components/CanvasProvider";
import MainWebEditor from "./components/MainWebEditor";
import PublishedPage from "./pages/published";
import TestPage from "./pages/test";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

function App() {
  return (
    <>
      <BrowserRouter>
        <CanvasProvider>
          <Routes>
            <Route path="/" element={<MainWebEditor />} />
            <Route path="/published" element={<PublishedPage />} />
            <Route path="/test" element={<TestPage />} />
          </Routes>
          <Toaster />
        </CanvasProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
