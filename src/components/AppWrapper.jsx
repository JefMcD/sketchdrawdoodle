
/*
  The AppWrapper component 
    fetches the initial data 
    sets the server
    gets the csrfToken
*/

import {useState, useEffect} from "react";
 
// Components
import SketchDrawDoodle from '@components/SketchDrawDoodle';
import LoadingPage      from "@components/LoadingPage";

// Initialise App
//import getInitialData   from "@modules/getInitialData.js";   // Production: load from Django json payload in the browser
import fetchInitialData from "@modules/fetchInitialData.js"; // Dev: Fetch directly from API after page served
import checkSession     from "@modules/checkSession.js"; // log session details

// Scss
import '@scss/sketchDrawDoodle.scss'; // relative path to Daddy stylesheet

// const initialData = getInitialData() // production: get initialData from Django json payload in the browser;

export default function AppWrapper(){
  
  const localhost  = "http://localhost:8000/";           // Dev must on same host as react
  const production = "https://www.sketchdrawdoodle.com/";// Production

  const [isLoaded, setIsLoaded] = useState(false);
  const [initialData, setInitialData] = useState({
    is_authenticated : false,
    initial_username : null,
    initial_section  : null,
    initial_avatar   : null,
  });


  
  // Synchronize with Django API
  useEffect( () => {
    console.log(`useEffect mounted`)

    async function asyncDoodleTap(){
      const data = await fetchInitialData(); // async functions need to WAIT!
      setIsLoaded(true)
      setInitialData({...data}) // This sets the state variable to reference a different object, its the change in reference that triggers the React rerender. It doenst mutate the values of the objects attributes inside
      //await checkSession()
    }
    asyncDoodleTap()
    
  }, []); // Empty dependency array to Run once when the component mounts
  
  return(
  <>
    {isLoaded ?
      <SketchDrawDoodle 
        initialData     = {initialData}
        server          = {localhost}
      />
    :
      <LoadingPage />  
    }
  </>
  )
}