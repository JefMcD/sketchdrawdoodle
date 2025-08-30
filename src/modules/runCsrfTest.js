

// return the value of a named cookie
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

// return the value of the cookie csrftoken
function getCSRFCookie(){
    const name = 'csrftoken';

    if(document.cookie){
      console.log("cookies exist")
    }else{
      console.log("no cookies")
    }
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(name))
        ?.split('=')[1];

    return cookieValue || '';
};

async function tapDjangoCSRF(){
    // React is on http://localhost:5734
    const host1 = "http://localhost:8000/get_csrf_token/" // getCSRFCookie logs cookies exist 
    const host2 = "http://127.0.0.1:8000/get_csrf_token/";// getCSRFCookie logs no cookies
    const res = await fetch(`${host1}`, {
    method: "GET",
    credentials: "include",  // Important: allows cookies
  });

  if (!res.ok) throw new Error("Failed to fetch CSRF token");

  const data = await res.json();
  return data.csrf_token;
}


export async function runPOSTTest(){
  console.log("runPosttest()")
  const transformer = {
    name: "bumblebee",
    size: "small",
    agility: "10",
    speed: "6",
    power: "4"
  }
  // React on localhost so Django needs to be on localhost
  // Client and Server need to be on the same host
  const host1 = "http://localhost:8000/my_frens/" // POST is accepted by Django
  const host2 = "http://127.0.0.1:8000/my_frens/";// Cookies not sent. Django Forbidden (CSRF cookie not set.)

  const shakeOutToken = await tapDjangoCSRF() // External API takes time. You must wait until the cookie is set before trying to retreive it
  let csrfToken = getCSRFCookie();

  const response = await fetch(host1, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken, // Required for POST with CSRF
    },
    body: JSON.stringify(transformer) // Must have json wrapper
  })
  const data = await response.json() //json method is an async process

  if(response.ok){
    console.log(`name: ${data.name}`)
  }else{
    console.log(`error ${data.error}`)
  }
}

export default async function runCookieTest(){
  const djangoToken = await tapDjangoCSRF() // External API takes time. You must wait until the cookie is set before trying to retreive it
  let csrfToken = getCSRFCookie();
  return csrfToken
}