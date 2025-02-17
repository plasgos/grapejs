import { Toaster } from "@/components/ui/toaster";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import MainWebEditor from "./components/MainWebEditor";
import PublishedPage from "./pages/published";
import { CanvasProvider } from "./components/CanvasProvider";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

function App() {
  return (
    <>
      <CanvasProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainWebEditor />} />
            <Route path="/published" element={<PublishedPage />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </CanvasProvider>
    </>
  );
}

export default App;
