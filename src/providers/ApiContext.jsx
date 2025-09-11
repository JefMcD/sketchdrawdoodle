
// API Data mainly used in components with form making fetches on the sketchdrawdoodle API

import { createContext, useContext, useState } from "react";

// 1. Create the context
const ApiContext = createContext(null);

// 2. Provider component
export function ApiProvider({ server, children }) {
  const [apiData, setApiData] = useState({
    server,
  });

  return (
    <ApiContext.Provider value={{ apiData, setApiData }}>
      {children}
    </ApiContext.Provider>
  );
}

// 3. Custom hook for easy usage
export function useApi() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
}
