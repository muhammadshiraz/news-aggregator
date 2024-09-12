import React, { useContext, useState } from "react";
import { PreferencesContext } from "../context/PreferencesContext";

const Preferences = () => {
  const { preferences, setPreferences } = useContext(PreferencesContext);
  const [selectedSources, setSelectedSources] = useState(
    preferences.sources || []
  );

  const handleSavePreferences = () => {
    setPreferences({ ...preferences, sources: selectedSources });
  };

  return (
    <div className='preferences'>
      <h2>Customize Your Feed</h2>
      <label>
        <input
          type='checkbox'
          value='newsapi'
          checked={selectedSources.includes("newsapi")}
          onChange={(e) => {
            const source = e.target.value;
            setSelectedSources((prev) =>
              prev.includes(source)
                ? prev.filter((s) => s !== source)
                : [...prev, source]
            );
          }}
        />
        NewsAPI
      </label>
      <label>
        <input
          type='checkbox'
          value='guardian'
          checked={selectedSources.includes("guardian")}
          onChange={(e) => {
            const source = e.target.value;
            setSelectedSources((prev) =>
              prev.includes(source)
                ? prev.filter((s) => s !== source)
                : [...prev, source]
            );
          }}
        />
        The Guardian
      </label>
      <label>
        <input
          type='checkbox'
          value='nytimes'
          checked={selectedSources.includes("nytimes")}
          onChange={(e) => {
            const source = e.target.value;
            setSelectedSources((prev) =>
              prev.includes(source)
                ? prev.filter((s) => s !== source)
                : [...prev, source]
            );
          }}
        />
        NY Times
      </label>
      <button onClick={handleSavePreferences}>Save Preferences</button>
    </div>
  );
};

export default Preferences;
