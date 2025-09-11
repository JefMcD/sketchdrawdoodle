
/*
  The AppWrapper component 
    fetches the initial data (Composite of userData, profileData and apiData)
    sets the server
    gets the csrfToken
*/

import {useState, useEffect} from "react";
 
// Components
import SketchDrawDoodle from '@components/SketchDrawDoodle';
import LoadingPage      from "@components/LoadingPage";

// Initialise App
import fetchInitialData from "@modules/fetchInitialData.js"; // Dev: Fetch directly from API after page served
import {rebootCsrf}     from "@modules/manageApi.js";
import getServer        from "@modules/getServer.js";
//import getInitialData   from "@modules/getInitialData.js";   // Production: load from Django json payload in the browser
//import checkSession     from "@modules/checkSession.js"; // log session details

// Scss
import '@scss/sketchDrawDoodle.scss'; // relative path to Daddy stylesheet

// const initialData = getInitialData() // production: get initialData from Django json payload in the browser;

export default function AppWrapper(){
  
  const [server, setServer] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialData, setInitialData] = useState({});
  
  // In dev get initial data by fetch. Synchronize with Django API
  useEffect( () => {
    console.log(`useEffect mounted after rendr`)
    
    async function asyncDoodleTap(){
      
      const serverUrl = getServer();
      setServer(serverUrl);

      const token = await rebootCsrf(serverUrl)
      setCsrfToken(token)

      const data = await fetchInitialData(serverUrl, token); // This is used to fetch initial data in dev. In production it loaded into the browser by Django. async functions need to WAIT!
      setIsLoaded(true)
      setInitialData({...data}) // This sets the state variable to reference a different object, its the change in reference that triggers the React rerender. It doenst mutate the values of the objects attributes inside
      //await checkSession()
      
    }
    asyncDoodleTap()
    
  }, []); // Empty dependency array to Run once when the component mounts
  
  console.log("############ AppWrapper ################")
  return(
  <>
    {isLoaded ? (
      <SketchDrawDoodle 
        initialData = {initialData}
        server = {server}
      />
    ):(
      <LoadingPage />  
    )}
  </>
  )
}