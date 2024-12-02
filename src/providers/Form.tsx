import { createContext, useContext, useState } from "react";

interface FormContextType {
  isCurrentPageValid: boolean;
  setCurrentPageValid: (valid: boolean) => void;
}

const FormContext = createContext<FormContextType | null>(null);

interface FormProviderProps {
  children: React.ReactNode;
}

export function FormProvider({ children }: FormProviderProps) {
  const [isCurrentPageValid, setCurrentPageValid] = useState(false);

  return (
    <FormContext.Provider
      value={{
        isCurrentPageValid,
        setCurrentPageValid,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context)
    throw new Error("useFormContext must be used within FormProvider");
  return context;
};
