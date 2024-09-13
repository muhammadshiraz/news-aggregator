import React from "react";
import { PreferencesProvider } from "./context/PreferencesContext";
import Home from "./pages/Home";

const App = () => (
  <PreferencesProvider>
    <Home />    
  </PreferencesProvider>
);

export default App;
