import { Toaster } from "@/components/ui/toaster";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "react-datepicker/dist/react-datepicker.css";
import MainWebEditor from "./components/MainWebEditor";
import NotFoundPage from "./components/NotFoundPage";
import CreateNewProjectPage from "./pages/create-new-project";
import FilesPage from "./pages/files";
import PublishedPage from "./pages/published";
import TestPage from "./pages/test";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DeployPage from "./pages/deploy";

const router = createBrowserRouter([
  {
    path: "/web-builder/:slug",
    element: <MainWebEditor />,
  },
  {
    path: "/published",
    element: <PublishedPage />,
  },
  {
    path: "/test",
    element: <TestPage />,
  },
  {
    path: "/files",
    element: <FilesPage />,
  },
  {
    path: "/create",
    element: <CreateNewProjectPage />,
  },
  {
    path: "/deploy",
    element: <DeployPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
