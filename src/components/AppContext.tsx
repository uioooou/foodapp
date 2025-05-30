import React, { createContext, ReactNode, useState } from "react";

interface DessertItem {
  imgSrc?: string;
  name: string;
  price: number;
  quantity: number;
}

interface AppContextProps {
  modalState: string;
  setModalState: React.Dispatch<React.SetStateAction<string>>;
  selectedDessert: DessertItem[];
  setSelectedDessert: React.Dispatch<React.SetStateAction<DessertItem[]>>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [modalState, setModalState] = useState<string>("");
  const [selectedDessert, setSelectedDessert] = useState<DessertItem[]>([]);

  const contextValue: AppContextProps = {
    modalState,
    setModalState,
    selectedDessert,
    setSelectedDessert,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
