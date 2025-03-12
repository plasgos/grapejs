import { createContext, useContext, useState } from "react";

const CanvasProviderContext = createContext();

export const CanvasProvider = ({ children }) => {
  const [canvasData, setCanvasData] = useState({ html: "", css: "" });

  return (
    <CanvasProviderContext.Provider value={{ canvasData, setCanvasData }}>
      {children}
    </CanvasProviderContext.Provider>
  );
};

export const useCanvas = () => {
  const context = useContext(CanvasProviderContext);

  if (!context) {
    throw new Error("useCanvas must be used within a CanvasProvider");
  }

  return context;
};
