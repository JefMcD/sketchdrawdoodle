


export default async function fetchInitialData(server, csrfToken){
  console.log(`fetchInitialData started ${csrfToken}`)
  
  // Send POST with csrfToken and session cookies with header to get initialization data
  const initial_data = `${server}initial_data/`
  const fakePostData = {}
  const response = await fetch(initial_data, {
    method: "POST",            // POST to send cookies for session
    credentials : "include",   // Send session cookie and csrf cookie
    headers:{
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken, // Required for POST
    },
    body: JSON.stringify(fakePostData)
  })
  
  const data = await response.json() // json is async

  try{
    
    if (!response.ok){
      throw new Error (`React: !response.ok `) 
    }

    // create initial data object
    const appInitData ={
      is_authenticated  : data.initial_data["is_authenticated"] ?? false,
      initial_section   : data.initial_data["initial_section"]  ?? "welcome-section",
      initial_username  : data.initial_data["username"] ?? "Doodler",
      initial_banner    : data.initial_data["banner"],
      initial_avatar    : data.initial_data["avatar"],
      initial_story     : data.initial_data["story"],
      initial_caption   : data.initial_data["caption"],
      initial_website   : data.initial_data["website"]
    } // null-coalescing mofo
    

    return appInitData

  } catch (err){
    console.log(`React: ${err}`)
  }

}


/*

helper to read csrftoken from cookie

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