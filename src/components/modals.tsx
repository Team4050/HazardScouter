import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { type Match, matchCollection, newId, useReactivity } from "@/data/db";

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
  const matches = useReactivity(() => matchCollection.find().fetch(), []);
  const scouterInputRef = useRef<HTMLInputElement>(null);

  const scouters = useMemo(() => {
    return [...new Set(matches.map((match) => match.scouter))];
  }, [matches]);

  const teams = useMemo(() => {
    return [...new Set(matches.map((match) => match.teamNumber))];
  }, [matches]);

  // Focus input when dialog opens
  useEffect(() => {
    if (opened) {
      // Small delay to ensure dialog is mounted
      const timer = setTimeout(() => {
        scouterInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [opened]);

  const form = useForm({
    defaultValues: {
      scouter: "",
      teamNumber: 0,
      matchNumber: 0,
    } as NewMatchForm,
    onSubmit: async ({ value }) => {
      // Validate
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

  return (
    <Dialog open={opened} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Match</DialogTitle>
        </DialogHeader>

        {/* Loading overlay */}
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
                !value || value.length >= 50
                  ? "Invalid scouter name"
                  : undefined,
            }}
          >
            {(field) => (
              <Autocomplete
                ref={scouterInputRef}
                label="Scouter"
                data={scouters}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
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
                onChange={(e) =>
                  field.handleChange(Number(e.target.value) || 0)
                }
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
          <Button type="submit" className="ml-auto mt-2">
            Go
          </Button>
        </form>
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
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleCancel}>
            {cancelLabel}
          </Button>
          <Button variant={confirmVariant} onClick={handleConfirm}>
            {confirmLabel}
          </Button>
        </DialogFooter>
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
        if (!open) closeConfirmDialog();
      },
    },
    openConfirmDialog,
    closeConfirmDialog,
  };
}
