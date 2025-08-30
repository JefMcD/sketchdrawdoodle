
import {useState} from "react";
import FormError from "@forms/FormError"

export default function PasswordForm({
  setUserData,
  setActiveSection,
  csrfToken,
  server
}){
	console.log(`React.Password setUserData: ${setUserData}`)

  const [formError, setFormError] = useState("");
  const [formInputs, setFormInputs] = useState({
    password: "",
    confirm: ""
  });

  function handleInput(e){
    e.stopPropagation();
  
    const {name, value} = e.target
    setFormInputs((prev)=>({...prev, [name]:value}));
  }
  
  async function handleSubmit(e){
    console.log("handleSubmit")
    e.preventDefault(); // Hurra! Prevent app being re rendered by form submission
    
    // create FormData
    const verifyForm = new FormData();
    verifyForm.append("password",formInputs["password"]);
    verifyForm.append("confirm",formInputs["confirm"]);

    // Fetch: Send FormData to Django for Validation
    const set_new_password = server+"set_new_password/";
    try{
      const response = await fetch(set_new_password, {
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

      // Handle response
      if (!response.ok){
        setFormError(`API: ${data.error}`);
      }else{
        // Sucesss Password changed
        setUserData((prev)=>({...prev, ["is_authenticated"]: data.is_auth, ["username"]: data.username}))
        setActiveSection("welcome-section");
      }
    }catch(err){
      setFormError("React : Catch ");
    }
  }


  return(
    <div className="form-wrapper">
        <form className="standard-form verify-form" onSubmit={handleSubmit}>
           {/*CSKA Rooskis */}

            <input onChange={handleInput} className="form-input" type="password" name="password" placeholder="new password" autoFocus required/>
            <input onChange={handleInput} className="form-input" type="password" name="confirm"  placeholder="confirm"      required/>

            <div className="form-submit">
                <input className = "form-submit-btn" type="submit" value="Confirm" />
            </div>
        </form>

        <FormError formError={formError} />  

    </div>

  )
}