

import getServer from "@modules/getServer.js";

// Return the local values of server and csrftoken
export function getApiData(){
  const apiServer = getServer();
  const token = checkCookie();

  const apiData = {
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
} // Function to get the Django CSRF token from the browser cookies


// prompts Django to set the csrf cookie in the browser
export async function tapDjangoCsrf(server) {
  const getCSRFToken = server+"get_csrf_token/"
  const res = await fetch(getCSRFToken, {
    method: "GET",
    credentials: "include",  // Important: allows cookies
  });

  if (!res.ok) throw new Error("Failed to fetch CSRF token");
  const data = await res.json(); // json is an async process
  return data.csrf_token;
}

// Request Django to send a new csrf token
export async function rebootCsrf(server){

  let cookieValue = ""
  try{
    // Get Django to set csrf token in the browser
    const shakeOutCsrfToken = await tapDjangoCsrf(server) // Sets browser csrftoken and also returns a (fake) getToken() csrf

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

