


const localhost = "http://localhost:8000/" // Django localhost (react on localhost and they need to be on the same host)

// Fake Profile Data
import default_avatar from "@images/profile/avatar/into-the-fire.jpg"; // temporary until db is wiredup


// prompts Django to set the csrf cookie in the browser
export async function tapDjangoCSRF() {
  const getCSRFToken = localhost+"get_csrf_token/"
  const res = await fetch(getCSRFToken, {
    method: "GET",
    credentials: "include",  // Important: allows cookies
  });

  if (!res.ok) throw new Error("Failed to fetch CSRF token");
  const data = await res.json(); // json is an async process
  return data.csrf_token;
}


// helper to read csrftoken from cookie
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default async function fetchInitialData(){
  console.log("fetchInitialData started")

  // Grab CSRF token from the browser cookie
  let csrfToken = getCookie("csrftoken")
  //console.log(`csrftoken: ${csrfToken}`)

  // if no csrf cookie exists get one, otherwise use the existing one
  if (csrfToken === null){
    try{
      // Get Django to set csrf token in the browser
      const shakeOutCsrfToken = await tapDjangoCSRF() // Sets browser csrftoken and also returns a getToken() csrf

      // Grab the CSRF token from the browser cookie
      csrfToken = getCookie("csrftoken")
      if(!csrfToken){
        throw new Error("CSRF token not set")
      }else{
        console.log(`csrftoken: ${csrfToken}`)
      }
    }catch(err){
      console.error(`React: ${err}`)
    }
  }

  
  // Send POST with csrfToken and session cookies with header to get initialization data
  const get_initial_data = localhost+"initial_data/"
  const fakePostData = {}
  const response = await fetch(get_initial_data, {
    method: "POST",            // POST to send cookies for session
    credentials : "include",   // Send session cookie and csrf cookie
    headers:{
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken, // Required for POST
    },
    body: JSON.stringify(fakePostData)
  })
  
  console.log("fetch returned, parsing response")
  const data = await response.json() // json is async

  try{
    
    if (!response.ok){
      throw new Error (`React: !response.ok `) 
    }

    // create initial data object
    const appInitData ={
      is_authenticated  : data.initial_data["is_authenticated"] ?? false,
      initial_username  : data.initial_data["username"]         ?? "Doodler",
      initial_avatar    : data.initial_data["avatar"]           ?? default_avatar,
      initial_section   : data.initial_data["initial_section"]  ?? "welcome-section",
    } // null-coalescing mofo
    
    return appInitData

  } catch (err){
    console.log(`React: ${err}`)
  }

}


/*
Alternative getCSRFCookie()
does the exact same thing but with some debug
function getCSRFCookie(){
    const name = 'csrftoken';

    if(document.cookie){
      console.log("cookies exist")
    }else{
      console.log("no cookies :(")
    }
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(name))
        ?.split('=')[1];

    return cookieValue || '';
};

*/