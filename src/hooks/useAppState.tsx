import { AppContext } from "@/providers/AppState";
import { useContext } from "react";

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppProvider");
  }
  return context;
}
