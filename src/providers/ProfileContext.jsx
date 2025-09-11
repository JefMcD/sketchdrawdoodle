
// Enables global state for profileData, setProfileData

// ProfileContext.js
import { createContext, useContext } from "react";

export const ProfileContext = createContext(null);

export function useProfile() {
  // returns object because ProfileContext is given an object
  return useContext(ProfileContext);
}

/*
useContext → returns whatever value the Context.Provider was given:

<ProfileContext.Provider value={{ profileData, setProfileData }}>


*/
