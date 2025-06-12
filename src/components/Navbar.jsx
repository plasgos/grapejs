import { DevicesProvider, useEditor } from "@grapesjs/react";
import { FaMobileAlt, FaTabletAlt } from "react-icons/fa";
import { IoDesktopOutline } from "react-icons/io5";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cx } from "class-variance-authority";

import { Button } from "@/components/ui/button";
import { useProjectSaver } from "@/hooks/useProjectSaver";
import {
  setCurrentDeviceView,
  setDeployData,
} from "@/redux/modules/landing-page/landingPageSlice";
import { produce } from "immer";
import { Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import { LuRedo2, LuUndo2 } from "react-icons/lu";
import { SlGlobe, SlSizeActual, SlSizeFullscreen } from "react-icons/sl";
import { VscZoomIn, VscZoomOut } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = ({ currentProject }) => {
  const editor = useEditor();

  const { handleSave, isLoadingSaver } = useProjectSaver({
    editor,
    currentProject,
  });

  const dispatch = useDispatch();

  const [, setUpdateCounter] = useState(0);

  const [isLoadingDeploy, setIsLoadingDeploy] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(70);

  const deviceIcons = {
    desktop: <IoDesktopOutline />,
    tablet: <FaTabletAlt />,
    mobileModern: <FaMobileAlt />,
  };

  const { UndoManager, Commands } = editor;
  const cmdButtons = [
    {
      id: "core:undo",
      name: "Undo",
      iconPath: <LuUndo2 />,
      disabled: () => !UndoManager.hasUndo(),
    },
    {
      id: "core:redo",
      name: "Redo",
      iconPath: <LuRedo2 />,
      disabled: () => !UndoManager.hasRedo(),
    },

    {
      id: "core:preview",
      name: "Preview Full Screen",
      iconPath: <SlSizeFullscreen />,
    },
  ];

  const isPreview = Commands.isActive("core:preview");

  const zoomOptions = [
    {
      id: "zoom-out",
      name: "Zoom Out",
      iconPath: <VscZoomOut className="scale-125" />,
      command: () => updateZoom(-10),
      disabled: currentZoom <= 50,
    },
    {
      id: "zoom-in",
      name: "Zoom In",
      iconPath: <VscZoomIn className="scale-125" />,
      command: () => updateZoom(10),
      disabled: currentZoom >= 100,
    },
  ];
  const updateZoom = (delta) => {
    setCurrentZoom((prev) => {
      const next = Math.max(30, Math.min(100, prev + delta));

      editor.Canvas.setZoom(next);

      return next;
    });
  };

  const updateCanvasHeight = (zoom) => {
    const frames = document.querySelector(".gjs-cv-canvas__frames");
    if (!frames) return;

    // Zoom scale
    const scale = zoom / 100;

    // Ubah ukuran agar tetap full height
    const minHeight = 100 * (1 / scale) - 10; // semakin kecil scale, semakin tinggi min-height

    frames.style.minHeight = `${Math.round(minHeight)}vh`; // gunakan vh agar tetap responsif

    // Smooth transition
    frames.style.transition = "transform 0.3s ease, min-height 0.3s ease";
    frames.style.transformOrigin = "top center";
    frames.style.transform = `scale(${scale})`;
  };

  useEffect(() => {
    if (editor) {
      editor.on("component:selected", (component) => {
        const type = component.get("type");
        if (type === "floating-button-circle") {
          setCurrentZoom(50);
        }
      });
    }
  }, [editor]);

  useEffect(() => {
    updateCanvasHeight(currentZoom);
  }, [currentZoom]);

  const replaceWithCustomIcon = () => {
    const el = document.querySelector(".gjs-off-prv");

    if (el) {
      el.style.opacity = "0";

      // 1. Hapus isi lama dan class Font Awesome

      requestAnimationFrame(() => {
        el.innerHTML = "";

        el.classList.remove("fa", "fa-eye-slash");

        // 2. Tambahkan icon custom
        el.innerHTML = renderToString(<SlSizeActual />);

        // 3. Styling seperti button ghost
        el.setAttribute("title", "Exit Preview");
        el.style.cursor = "pointer";
        el.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        el.style.border = "none";
        el.style.outline = "none";
        el.style.padding = "8px";
        el.style.borderRadius = "6px";
        el.style.color = "#000000";
        el.style.fontSize = "20px";
        el.style.padding = "10px";
        el.style.margin = "10px";
        el.style.transition = "background-color 0.2s ease";

        el.style.transition = "background-color 0.2s ease";
        el.style.opacity = "1";

        // 4. Hover effect (via JS)
        el.addEventListener("mouseenter", () => {
          el.style.backgroundColor = "rgba(255, 255, 255, 1)";
          el.style.color = "#000000";
        });
        el.addEventListener("mouseleave", () => {
          el.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
          el.style.color = "#000000";
        });
      });
    }
  };

  useEffect(() => {
    if (isPreview) {
      replaceWithCustomIcon();
    } else {
      editor.Canvas.setZoom(currentZoom);
      updateCanvasHeight(currentZoom);
    }
  }, [isPreview]);

  useEffect(() => {
    if (!isPreview) {
      const canvasWrapper = document.querySelector(".gjs-frame-wrapper");

      if (canvasWrapper) {
        const currentWidth = canvasWrapper.style.width;
        const deviceManager = editor.Devices;

        const selectedDevice = deviceManager.getSelected();

        if (selectedDevice.id !== "desktop" && currentWidth === "100%")
          canvasWrapper.style.width = selectedDevice.attributes.width;
      }
    }
  }, [isPreview]);

  useEffect(() => {
    const cmdEvent = "run stop";
    const updateEvent = "update";
    // editor.Commands.run("core:component-outline");

    const updateCounter = () => setUpdateCounter((value) => value + 1);
    const onCommand = (id) => {
      cmdButtons.find((btn) => btn.id === id) && updateCounter();
    };
    editor.on(cmdEvent, onCommand);
    editor.on(updateEvent, updateCounter);

    return () => {
      editor.off(cmdEvent, onCommand);
      editor.off(updateEvent, updateCounter);
    };
  }, []);

  const navigate = useNavigate();

  const handleDeploy = async () => {
    try {
      setIsLoadingDeploy(true);

      const saveProject = await handleSave({ shouldRedirect: false });

      handleSave({ shouldRedirect: false });

      const editorModel = editor.getModel();

      const updatedProjectData = produce(
        saveProject.resultComponent,
        (draft) => {
          // Disable preview finished mode countdown
          if (draft?.pages && Array.isArray(draft.pages)) {
            draft.pages.forEach((page) => {
              if (page.frames && Array.isArray(page.frames)) {
                page.frames.forEach((frame) => {
                  if (frame.component && frame.component.components) {
                    frame.component.components.forEach((component) => {
                      component.isFromAI = false;

                      if (
                        component.type === "countdown" &&
                        component.customComponent?.finish
                      ) {
                        component.customComponent.finish.isFinished = false;
                      }
                    });
                  }
                });
              }
            });
          }

          // Update global options
          draft.globalOptions = editorModel.get("globalOptions");
        }
      );

      dispatch(setDeployData(updatedProjectData));

      setTimeout(() => {
        navigate("/deploy");
      }, 300);
    } catch (error) {
    } finally {
      setIsLoadingDeploy(false);
    }
  };

  const DeviceSelector = ({ selected, select, devices }) => {
    return (
      <div className="flex items-center gap-x-2">
        {devices.map((deviceItem, i) => (
          <TooltipProvider delayDuration={100} key={i}>
            <Tooltip>
              <TooltipTrigger
                key={i}
                onClick={() => {
                  select(deviceItem.id);
                  dispatch(setCurrentDeviceView(deviceItem.id));
                }}
                className={` hover:bg-accent hover:text-accent-foreground p-2 rounded-md ${
                  selected === deviceItem.id
                    ? "bg-white text-black"
                    : "text-slate-300"
                }  px-3 `}
              >
                {deviceIcons[deviceItem.id]}
              </TooltipTrigger>
              <TooltipContent>
                <p>{deviceItem.getName()}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    );
  };

  return (
    <div className={`${isPreview ? "hidden" : "block"}`}>
      <div className="h-[56px] w-full z-50 bg-gradient-to-r from-orange-400 to-[#fa541c] text-white p-2 shadow-md flex  items-center">
        <div className="mr-5">
          <h3>Plasgos Web Builder</h3>
        </div>

        <div className="flex  flex-1  items-center justify-between pr-5">
          <div className="flex gap-x-1 border-x border-x-muted/30 px-2">
            {cmdButtons.map(
              ({ id, name, iconPath, disabled, options = {} }) => {
                return (
                  <TooltipProvider delayDuration={100} key={id}>
                    <Tooltip>
                      <TooltipTrigger
                        key={id}
                        onClick={() => {
                          const isActive = Commands.isActive(id);
                          if (isActive) {
                            Commands.stop(id);
                          } else {
                            if (id === "core:preview") {
                              const deviceManager = editor.Devices;

                              const selectedDevice =
                                deviceManager.getSelected();

                              if (selectedDevice.id !== "desktop") {
                                const canvasWrapper =
                                  document.querySelector(".gjs-frame-wrapper");

                                if (canvasWrapper) {
                                  canvasWrapper.style.width = "100%";
                                }
                                editor.Canvas.setZoom(100);
                                updateCanvasHeight(100);
                              } else {
                                editor.Canvas.setZoom(100);
                                updateCanvasHeight(100);
                              }

                              setTimeout(() => {
                                Commands.run(id, options);
                              }, 300);
                            } else {
                              Commands.run(id, options);
                            }
                          }
                        }}
                        disabled={disabled?.()}
                        className={cx(
                          "hover:bg-accent hover:text-accent-foreground p-2 rounded-md   px-3",
                          Commands.isActive(id) && "bg-white text-black",
                          disabled?.() && "opacity-50  cursor-not-allowed "
                        )}
                      >
                        {iconPath}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              }
            )}
            <DevicesProvider>
              {(deviceContext) => <DeviceSelector {...deviceContext} />}
            </DevicesProvider>

            {zoomOptions.map((item, i) => {
              return (
                <TooltipProvider delayDuration={100} key={i}>
                  <Tooltip>
                    <TooltipTrigger asChild key={i}>
                      <Button
                        disabled={item.disabled}
                        variant="ghost"
                        onClick={() => {
                          item.command();

                          editor.select(null);

                          setTimeout(() => {
                            editor.refresh();
                          }, 300);
                        }}
                      >
                        {item.iconPath}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>

          <div>
            <p className="font-semibold">{currentProject?.name}</p>
          </div>

          <div className="flex items-center gap-x-3">
            <Button
              disabled={isLoadingSaver}
              variant="outline"
              onClick={() =>
                handleSave({ shouldRedirect: true, redirectPath: "/files" })
              }
              className="bg-transparent"
            >
              Save
              {isLoadingSaver ? <Loader2 className="animate-spin" /> : <Save />}
            </Button>
            <Button
              disabled={isLoadingDeploy}
              onClick={handleDeploy}
              className={cx(
                "bg-indigo-700 hover:bg-indigo-800",
                isLoadingDeploy && "!cursor-not-allowed"
              )}
            >
              Publish
              {isLoadingDeploy ? (
                <Loader2 className="animate-spin" />
              ) : (
                <SlGlobe />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
