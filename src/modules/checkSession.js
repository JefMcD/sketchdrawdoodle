

export default async function checkSession() {
  console.log("React: checkSession()")
  const response = await fetch("http://localhost:8000/check_session/", {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok){
    console.log(`React Error. checkSession !response.ok`);;
  }else{
    console.log("check_session response.ok");
    const data = await response.json(); // Convert json response into javascript object
    // iterate over data and show its contents
    for(let key in data){
      console.log(`${key}: ${data[key]}`);
    };
    const sesh = data.session_data;
    for(let key in sesh){
      console.log(`session_data: ${key}: ${sesh[key]}`)
    }

  }
}