

/*
  Form used in Verifying the secret code in the Password Reset Process
*/

import {useState} from "react";
import FormError from "@forms/FormError"

export default function CodeForm({
  setSubheader,
  setMessage,
  setStep,
  csrfToken,
  server
}){

  const [formError, setFormError] = useState("");
  const [formCode, setFormCode] = useState("");
  
  function handleInput(e){
    e.stopPropagation();
    let inputValue = e.target.value;
    setFormCode(inputValue);
  }
  
  async function handleSubmit(e){
    console.log("handleSubmit")
    e.preventDefault(); // Hurra! Prevent app being re rendered by form submission
    
    // create FormData
    const verifyForm = new FormData();
    verifyForm.append("secret_code",formCode);

    // Fetch: Send FormData to Django for Validation
    const verify_secret_code = server+"verify_secret_code/";
    try{
      const response = await fetch(verify_secret_code, {
          method: "POST",
          credentials: "include", // Include cookies (sessionid)
          headers: {
            //"Content-Type": "multipart/form-data", // FormData sets this automatically
            "X-CSRFToken" : csrfToken, 
          },
          body: verifyForm,
      });

      const data = await response.json(); // response.json() is an async call

      // Unpack response
      const verifyError = data.error

      // Handle response
      if (!response.ok){
        setFormError(verifyError);
      }else{
        // Sucesss; Code is good. load the New Password Form
        setStep("password")
        setSubheader("Your New Password")
        setMessage("Password must have upper case, lower case and a number")
      }
    }catch(err){
      setFormError("React : Catch");
    }
  }


  return(
    <div className="form-wrapper">
        <form className="standard-form verify-form" onSubmit={handleSubmit}>
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