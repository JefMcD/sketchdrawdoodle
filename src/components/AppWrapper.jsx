
/*
  The AppWrapper component 
    Established the initial data (Composite of userData, profileData and apiData)
    Syncs csrf cookie with server

    getServer()  sets the server    - this needs to be set in manageAPI.getServer()
    rebootCsrf() gets the csrfToken - React prompts API to drop a csrf cookie which is them loaded from document.cookies
    getMode()    gets the app Mode  - hotdog is true or false. This needs to be set in manageAPI.getMode()
*/

import {useState, useEffect} from "react";
 
// Components
import SketchDrawDoodle from '@components/SketchDrawDoodle';
import LoadingPage      from "@components/LoadingPage";

// Initialise App
import {rebootCsrf, getApiData} from "@modules/manageApi.js";
import fetchInitialData      from "@modules/fetchInitialData.js"; // Dev: Fetch directly from API after page served
import getDjangoPayload      from "@modules/getDjangoPayload.js"; // Hotdog Mode and Production

//import checkSession     from "@modules/checkSession.js"; // log session details

// Scss
import '@scss/sketchDrawDoodle.scss'; // relative path to Daddy stylesheet

export default function AppWrapper(){
  
  const [server, setServer] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialData, setInitialData] = useState({});
  
  // In dev fetch initial data from API after the index.html returned. Synchronize with Django API
  useEffect( () => {
    const apiData = getApiData(); // returns an object {mode, server, csrfToken }
    setServer(apiData.server);
    if (apiData.mode==="hotdog"){
      // Django Server renders index.html,including a payload of Initialization data in the browser (including csrf cookie) when it is first rendered on the server  
      const data = getDjangoPayload(); // Retrieve initial data from the Django Payload includeing csrfToken
      setInitialData({...data}); // This sets the state variable to reference a different object, its the change in reference that triggers the React rerender. It doenst mutate the values of the objects attributes inside
      setIsLoaded(true);
    }else{
      // React Client renders index.html on http://127.0.0.1:5743 and fetches initialization data and csrf from Django API
      async function initialize_dev_mode(){
          const token = await rebootCsrf(apiData.server);
          const data = await fetchInitialData(apiData.server, token); // This is used to fetch initial data in dev. In production it loaded into the browser by Django. async functions need to WAIT!
          setInitialData({...data}); // This sets the state variable to reference a different object, its the change in reference that triggers the React rerender. It doenst mutate the values of the objects attributes inside
          setIsLoaded(true);
          //await checkSession()
      }
      initialize_dev_mode();
    }

  }, []); // Empty dependency array to Run once when the component mounts
  
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