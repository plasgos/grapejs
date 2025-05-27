import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DevicesProvider, useEditor } from "@grapesjs/react";
import { FaMobileAlt, FaRegEye, FaTabletAlt } from "react-icons/fa";
import { IoDesktopOutline } from "react-icons/io5";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cx } from "class-variance-authority";

import { Button } from "@/components/ui/button";
import {
  setCanvasData,
  setDeployData,
} from "@/redux/modules/landing-page/landingPageSlice";
import { produce } from "immer";
import { useEffect, useState } from "react";
import { BiSolidLayer } from "react-icons/bi";
import { LuRedo2, LuSquareDashed, LuUndo2 } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navigator from "./Navigator";
import { useProjectSaver } from "@/hooks/useProjectSaver";
import { Loader2 } from "lucide-react";

const Navbar = ({
  currentProject,
  setIsPreviewActive,
  components,
  onReorder,
  setIsDragging,
}) => {
  const editor = useEditor();

  const { handleSave } = useProjectSaver({ editor, currentProject });

  const dispatch = useDispatch();

  const [, setUpdateCounter] = useState(0);
  const [isOpenNavigator, setIsOpenNavigator] = useState(false);

  const [isLoadingDeploy, setIsLoadingDeploy] = useState(false);

  const deviceIcons = {
    desktop: <IoDesktopOutline />,
    tablet: <FaTabletAlt />,
    mobilePortrait: <FaMobileAlt />,
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
      name: "Preview",
      iconPath: <FaRegEye />,
    },
    {
      id: "core:component-outline",
      name: "View Components",
      iconPath: <LuSquareDashed />,
    },
  ];

  const isPreview = Commands.isActive("core:preview");

  useEffect(() => {
    setIsPreviewActive(isPreview);
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
      console.log("🚀 ~ handleDeploy ~ error:", error);
    } finally {
      setIsLoadingDeploy(false);
    }
  };

  const handlePublish = () => {
    const wrapper = editor.getWrapper();
    const allComponents = editor.getComponents();

    // Hapus style tambahan dari semua komponen
    allComponents.forEach((component) => {
      const styles = component.getStyle();
      delete styles.outline;
      delete styles.padding;
      delete styles["box-shadow"];
      component.setStyle(styles);
    });

    editor.select(wrapper);

    setTimeout(() => {
      const editorModel = editor.getModel();
      const projectData = editor.getProjectData();

      const updatedProjectData = produce(projectData, (draft) => {
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
      });

      const jsonString = JSON.stringify(updatedProjectData, null, 2);

      dispatch(setCanvasData(jsonString));
      // setCanvasData({ html: jsonString });
      navigate("/published");
    }, 100);
  };

  const mainComponents = components.filter(
    (comp) => !comp.model.get("category")?.toLowerCase().includes("floating")
  );

  const floatingComponents = components.filter((comp) =>
    comp.model.get("category")?.toLowerCase().includes("floating")
  );

  const DeviceSelector = ({ selected, select, devices }) => {
    const filteredDevices =
      Array.isArray(devices) && devices.length > 1
        ? devices.filter((device) => device.id !== "mobileLandscape")
        : [];

    if (filteredDevices.length === 0) return null;

    return (
      <div className="flex items-center gap-x-2">
        {filteredDevices.map((deviceItem, i) => (
          <TooltipProvider delayDuration={100} key={i}>
            <Tooltip>
              <TooltipTrigger
                key={i}
                onClick={() => {
                  select(deviceItem.id);
                }}
                className={` hover:bg-accent hover:text-accent-foreground p-2 rounded-md ${
                  selected === deviceItem.id
                    ? "bg-white text-black"
                    : "text-slate-300"
                }  px-3 border  border-slate-300`}
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
        <div className="w-80  mr-5">
          <h1>Plasgos Web Builder</h1>
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
                        onClick={() =>
                          Commands.isActive(id)
                            ? Commands.stop(id)
                            : Commands.run(id, options)
                        }
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
          </div>

          <div>
            <DevicesProvider>
              {(deviceContext) => <DeviceSelector {...deviceContext} />}
            </DevicesProvider>
          </div>

          <div>
            <Popover open={isOpenNavigator} onOpenChange={setIsOpenNavigator}>
              <PopoverTrigger asChild>
                <Button
                  className={`${
                    isOpenNavigator && "bg-accent text-accent-foreground"
                  }`}
                  variant="ghost"
                >
                  Navigator <BiSolidLayer />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 relative right-2 bg-neutral-100 w-[400px] ">
                <div className="flex items-center justify-between p-2 bg-white rounded">
                  <p className="font-semibold">Navigator</p>

                  <Button
                    variant="ghost"
                    onClick={() => setIsOpenNavigator(false)}
                  >
                    <MdClose />
                  </Button>
                </div>

                <hr className="text-slate-500 w-full" />

                <Tabs defaultValue="components" className="w-full">
                  <TabsList>
                    <TabsTrigger className="w-full" value="components">
                      Components
                    </TabsTrigger>
                    <TabsTrigger className="w-full" value="Floating Components">
                      Floating Components
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="components">
                    <div className="p-3 max-h-[700px] overflow-y-auto overflow-x-hidden max-w-full">
                      <Navigator
                        components={mainComponents}
                        onReorder={onReorder}
                        setIsDragging={setIsDragging}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="Floating Components">
                    <div className="p-3 max-h-[700px] overflow-y-auto overflow-x-hidden max-w-full">
                      <Navigator
                        components={floatingComponents}
                        onReorder={onReorder}
                        setIsDragging={setIsDragging}
                        isFloatingComponent
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </PopoverContent>
            </Popover>
            <Button onClick={handlePublish} className="ml-3">
              Publish
            </Button>

            <Button
              disabled={isLoadingDeploy}
              onClick={handleDeploy}
              className={cx("ml-3", isLoadingDeploy && "!cursor-not-allowed")}
            >
              Deploy {isLoadingDeploy && <Loader2 className="animate-spin" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
