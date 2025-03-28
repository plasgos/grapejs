import { Toaster } from "@/components/ui/toaster";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CanvasProvider } from "./components/CanvasProvider";
import MainWebEditor from "./components/MainWebEditor";
import PublishedPage from "./pages/published";
import "react-datepicker/dist/react-datepicker.css";
import { useGetUsersQuery } from "./redux/services/userApi";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

function App() {
  const { data, isLoading, error, isSuccess } = useGetUsersQuery();

  return (
    <>
      <BrowserRouter>
        <CanvasProvider>
          <Routes>
            <Route path="/" element={<MainWebEditor />} />
            <Route path="/published" element={<PublishedPage />} />
          </Routes>
          <Toaster />
        </CanvasProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
