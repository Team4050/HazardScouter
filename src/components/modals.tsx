import { useLiveQuery } from "@tanstack/react-db";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { type ReactNode, useMemo, useState } from "react";
import { Autocomplete } from "@/components/inputs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { type Match, matchCollection, newId } from "@/data/db";
import { useIsMobile } from "@/hooks/useIsMobile";
import { setSentryUser } from "@/sentry";
import { cn } from "@/util";

type NewMatchForm = Omit<Match, "started" | "finished" | "phases" | "id">;

export function NewMatchModal({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}): ReactNode {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile();
  const { data: allMatches = [] } = useLiveQuery(() => matchCollection);
  const matches = useMemo(
    () => allMatches.filter((m) => !m.deleted),
    [allMatches],
  );
  const scouters = useMemo(() => {
    return [...new Set(matches.map((match) => match.scouter))];
  }, [matches]);

  const teams = useMemo(() => {
    return [...new Set(matches.map((match) => match.teamNumber))];
  }, [matches]);

  const form = useForm({
    defaultValues: {
      scouter: "",
      teamNumber: 0,
      matchNumber: 0,
    } as NewMatchForm,
    onSubmit: async ({ value }) => {
      if (!value.scouter || value.scouter.length >= 50) {
        return;
      }
      if (value.matchNumber <= 0 || value.matchNumber > 999) {
        return;
      }
      if (value.teamNumber <= 0 || value.teamNumber > 99999) {
        return;
      }

      setLoading(true);

      setSentryUser({ username: value.scouter });

      const id = newId();
      matchCollection.insert({
        id,
        ...value,
        started: new Date(),
        phases: {},
      });

      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);

      onClose();
      // iOS Safari doesn't restore scroll position after the keyboard
      // dismisses inside a drawer, leaving the next page scrolled down.
      if (window.scrollY > 0) {
        window.scrollTo(0, 0);
      }
      navigate({
        to: "/scouting/$matchId/collect",
        params: { matchId: id },
      });
    },
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  const formContent = (
    <>
      {loading && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-50 rounded-lg">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}

      <form className="flex flex-col gap-y-4" onSubmit={handleFormSubmit}>
        <form.Field
          name="scouter"
          validators={{
            onChange: ({ value }) =>
              !value || value.length >= 50 ? "Invalid scouter name" : undefined,
          }}
        >
          {(field) => (
            <Autocomplete
              label="Scouter"
              data={scouters}
              value={field.state.value}
              onChange={(val) => field.handleChange(val)}
              emptyMessage="No scouters"
              portal={false}
            />
          )}
        </form.Field>
        <form.Field
          name="teamNumber"
          validators={{
            onChange: ({ value }) =>
              value <= 0 || value > 99999 ? "Invalid team number" : undefined,
          }}
        >
          {(field) => (
            <Autocomplete
              label="Team"
              data={teams.map((t) => t.toString())}
              inputMode="numeric"
              value={field.state.value ? field.state.value.toString() : ""}
              onChange={(val) => field.handleChange(Number(val) || 0)}
              emptyMessage="No saved teams."
              portal={false}
            />
          )}
        </form.Field>
        <form.Field
          name="matchNumber"
          validators={{
            onChange: ({ value }) =>
              value <= 0 || value > 999 ? "Invalid match number" : undefined,
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <label className="ml-1 font-medium text-base">Match</label>
              <Input
                type="text"
                inputMode="numeric"
                value={field.state.value || ""}
                onChange={(e) =>
                  field.handleChange(Number(e.target.value) || 0)
                }
                onKeyDown={(event: React.KeyboardEvent) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    form.handleSubmit();
                  }
                }}
              />
            </div>
          )}
        </form.Field>
        <Button
          type="submit"
          className={cn("ml-auto mt-2 w-20", isMobile ? "w-full" : "")}
        >
          Go
        </Button>
      </form>
    </>
  );

  if (isMobile) {
    return (
      <Drawer
        open={opened}
        onOpenChange={(open) => !open && onClose()}
        repositionInputs={false}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>New Match</DrawerTitle>
            <DrawerDescription className="sr-only">
              Create a new scouting match
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-4">{formContent}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={opened} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Match</DialogTitle>
          <DialogDescription className="sr-only">
            Create a new scouting match
          </DialogDescription>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  );
}

// Confirm Dialog Component
type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: "default" | "destructive";
  onConfirm: () => void;
  onCancel?: () => void;
};

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmVariant = "default",
  onConfirm,
  onCancel,
}: ConfirmDialogProps): ReactNode {
  const isMobile = useIsMobile();

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const buttons = (
    <>
      <Button variant="outline" onClick={handleCancel}>
        {cancelLabel}
      </Button>
      <Button variant={confirmVariant} onClick={handleConfirm}>
        {confirmLabel}
      </Button>
    </>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>{buttons}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">{buttons}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Hook to manage confirm dialog state
export function useConfirmDialog() {
  const [state, setState] = useState<{
    open: boolean;
    title: string;
    description: string;
    confirmLabel: string;
    cancelLabel: string;
    confirmVariant: "default" | "destructive";
    onConfirm: () => void;
    onCancel?: () => void;
  }>({
    open: false,
    title: "",
    description: "",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
    confirmVariant: "default",
    onConfirm: () => {},
  });

  const openConfirmDialog = (config: {
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmVariant?: "default" | "destructive";
    onConfirm: () => void;
    onCancel?: () => void;
  }) => {
    setState({
      open: true,
      title: config.title,
      description: config.description,
      confirmLabel: config.confirmLabel ?? "Confirm",
      cancelLabel: config.cancelLabel ?? "Cancel",
      confirmVariant: config.confirmVariant ?? "default",
      onConfirm: config.onConfirm,
      onCancel: config.onCancel,
    });
  };

  const closeConfirmDialog = () => {
    setState((prev) => ({ ...prev, open: false }));
  };

  return {
    confirmDialogProps: {
      ...state,
      onOpenChange: (open: boolean) => {
        if (!open) {
          closeConfirmDialog();
        }
      },
    },
    openConfirmDialog,
    closeConfirmDialog,
  };
}
