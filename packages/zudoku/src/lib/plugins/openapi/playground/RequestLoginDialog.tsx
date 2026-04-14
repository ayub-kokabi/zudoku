import { useState } from "react";
import { useZudoku } from "zudoku/components";
import { Button } from "zudoku/ui/Button.js";
import { Checkbox } from "zudoku/ui/Checkbox.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "zudoku/ui/Dialog.js";
import { Label } from "zudoku/ui/Label.js";
import { t } from "../../../util/i18n.js";

const RequestLoginDialog = ({
  open,
  setOpen,
  onSignUp,
  onLogin,
  onSkip,
}: {
  open: boolean;
  onSignUp?: () => void;
  onLogin?: () => void;
  setOpen: (open: boolean) => void;
  onSkip?: (rememberSkip: boolean) => void;
}) => {
  const [rememberSkip, setRememberSkip] = useState(false);

  const handleSkip = () => {
    onSkip?.(rememberSkip);
    setOpen(false);
  };

  const { options } = useZudoku();
  const lang = options.site?.lang;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>
          {t(lang, "playground.welcome", "Welcome to the Playground!")}
        </DialogTitle>
        <DialogDescription>
          {t(
            lang,
            "playground.desc",
            "The Playground is a tool for developers to test and explore our APIs. To use the Playground, you need to login.",
          )}
        </DialogDescription>
        <Label className="flex items-center gap-2 font-normal">
          <Checkbox
            checked={rememberSkip}
            onCheckedChange={(checked) => setRememberSkip(checked === true)}
          />
          {t(lang, "playground.dontShowMessage", "Don't show this again")}
        </Label>
        <DialogFooter className="flex gap-2 sm:justify-between">
          <Button type="button" variant="outline" onClick={handleSkip}>
            {t(lang, "playground.skip", "Skip")}
          </Button>
          <div className="flex gap-2">
            {onSignUp && (
              <Button type="button" variant="outline" onClick={onSignUp}>
                {t(lang, "playground.signUp", "Sign Up")}
              </Button>
            )}
            {onLogin && (
              <Button type="button" variant="default" onClick={onLogin}>
                {t(lang, "playground.login", "Login")}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RequestLoginDialog;
