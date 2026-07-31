import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isClick, setIsClick] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  return (
    <AppContext.Provider
      value={{
        isClick,
        setIsClick,
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }

  return context;
}
