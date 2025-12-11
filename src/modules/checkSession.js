

export default async function checkSession() {
  const response = await fetch("http://localhost:8000/check_session/", {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok){
  }else{
    const data = await response.json(); // Convert json response into javascript object
    const sesh = data.session_data;

  }
}