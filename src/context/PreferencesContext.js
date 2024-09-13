import React, { createContext, useState, useContext } from "react";

// Create the context
const PreferencesContext = createContext();

// Create the provider component
export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    sources: [],
    categories: [],
    authors: [],
  });

  return (
    <PreferencesContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => useContext(PreferencesContext);
