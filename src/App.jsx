import { Toaster } from "@/components/ui/toaster";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainWebEditor from "./components/MainWebEditor";
import CreateNewProjectPage from "./pages/create-new-project";
import FilesPage from "./pages/files";
import PublishedPage from "./pages/published";
import TestPage from "./pages/test";
import NotFoundPage from "./components/NotFoundPage";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/web-builder/:slug" element={<MainWebEditor />} />
          <Route path="/published" element={<PublishedPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/files" element={<FilesPage />} />
          <Route path="/create" element={<CreateNewProjectPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
