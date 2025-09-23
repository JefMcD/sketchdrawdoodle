

import getServer from "@modules/getServer.js";

// In development the React client(5734) and Django server(8000) are on two different port of localhost.
// In production the client is served as static data inside Django ie hotdog mode
export function getMode(){
  //const mode = "hotdog"; // hotdog when build is inside Django, dev when developing on separate ports
  const mode = "dev"; //  dev when developing on separate ports
  return mode; 
}

// Return the local values of server and csrftoken
export function getApiData(){
  const apiServer = getServer();
  const token = checkCookie();

  const apiData = {
    mode : getMode(),
    server : apiServer,
    csrfToken : token
  };
  return apiData;
}

// Function to get the Django CSRF token from the browser cookies
export function checkCookie(){
  const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith("csrftoken"))
      ?.split('=')[1];

  return cookieValue || "";
} 


// prompts Django to set the csrf cookie in the browser
export async function tapDjangoCsrf(server) {

  // improvement check for a csrf cookie before fetching 

  const getCSRFToken = server+"get_csrf_token/"
  const res = await fetch(getCSRFToken, {
    method: "GET",
    credentials: "include",  // Important: allows cookies
  });

  if (!res.ok) throw new Error("Failed to initialise CSRF token");
  return;
}

// Request Django to send a new csrf token
export async function rebootCsrf(server){

  let cookieValue = ""
  try{
    // Get Django to set csrf token in the browser
    await tapDjangoCsrf(server) // Sets browser csrftoken

    // Grab the CSRF token from the browser cookie
    cookieValue = checkCookie()
    if(cookieValue === ""){
      throw new Error("Unable to get API to set csrf cookie")
    }
  }catch(err){
    cookieValue  = ""
    console.log(`rebootCsrf: Cant get csrf. POST's wont work ${err}`)
  }

  return cookieValue
    
}

