
import {useState} from "react";
import FormError from "@forms/FormError"
import getCsrfCookie from "@modules/getCsrfCookie.js"

export default function JoinVerifyForm({
  setUserData,
  setActiveSection,
  setIsJoinOk,
  server
}){

  console.log("Verify Form")
  const [formError, setFormError] = useState("");
  const [formInput, setFormInput] = useState("");
  
  function handleInput(e){
    e.stopPropagation();
    let inputValue = e.target.value;
    setFormInput(inputValue);
  }
  
  async function handleSubmit(e){
    console.log("handleSubmit")
    e.preventDefault(); // Hurra! Prevent app being re rendered by form submission
    
    // create FormData
    const verifyForm = new FormData();
    verifyForm.append("secret_code",formInput);

    // Fetch: Send FormData to Django for Validation
    const create_new_user = server+"create_new_user/";
    const csrfToken = getCsrfCookie();
    try{
      const response = await fetch(create_new_user, {
          method: "POST",
          credentials: "include", // Include cookies (sessionid)
          headers: {
            //"Content-Type": "multipart/form-data", // FormData sets this automatically
            "X-CSRFToken" : csrfToken, 
          },
          body: verifyForm,
      });
      console.log("React: fetch promise returned response");
      const data = await response.json(); // response.json() is an async call

      // Unpack response
      const verifyError   = data.error;
      const signedIn      = data.is_authenticated;
      const username      = data.username

      // Handle response
      if (response.ok){
        // Sucesss User has been created and logged in
        setUserData((prev)=>({...prev, ["is_authenticated"]:signedIn, ["username"]:username}))
        setActiveSection("profile-section");
      }else{
        setFormError(verifyError);
      }
    }catch(err){
      setFormError("React : Catch ");
    }
  }


  return(
    <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="standard-form verify-form" >
           {/*CSKA Rooskis */}

            <input onChange={handleInput} className="form-input" type="number" name="secret_code" placeholder="Secret Code" autoFocus required/>

            <div className="form-submit">
                <input className = "form-submit-btn" type="submit" value="Confirm" />
            </div>
        </form>

        <FormError formError={formError} />  
    </div>

  )
}