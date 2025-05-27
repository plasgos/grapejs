import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIsEditorDirty } from "@/hooks/useIsEditorDirty";
import { useState } from "react";
import { useBlocker } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { PiWarningCircle } from "react-icons/pi";
import { Save } from "lucide-react";
import { useSelector } from "react-redux";

const NavigationGuard = ({ editor }) => {
  const { isSaving } = useSelector((state) => state.landingPage);
  const isDirty = useIsEditorDirty(editor);
  const [isOpenAlert, setIsOpenAlert] = useState(null);

  const blocker = useBlocker(isDirty && !isSaving);

  const handleLeave = () => {
    if (blocker.state === "blocked") {
      blocker.proceed();
    }
  };

  useEffect(() => {
    if (blocker.state === "blocked") {
      setIsOpenAlert(blocker);
    }
  }, [blocker]);

  useEffect(() => {
    const handler = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  return (
    <Dialog
      open={!!isOpenAlert}
      onOpenChange={(open) => !open && setIsOpenAlert(null)}
    >
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>You have unsaved changes!</DialogTitle>
          <DialogDescription>
            Please save your work before leaving the page.
          </DialogDescription>

          <PiWarningCircle className="text-yellow-400 mx-auto " size={150} />

          <p>
            You have unsaved changes. If you leave now, your changes will be
            lost. Would you like to save your changes or cancel and stay on this
            page?
          </p>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={() => setIsOpenAlert(null)} variant="outline">
            Cancel
          </Button>
          <Button
            className="bg-blue-500 hover:bg-blue-600"
            onClick={handleLeave}
          >
            Save Changes <Save />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NavigationGuard;
