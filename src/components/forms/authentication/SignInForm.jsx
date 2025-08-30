

import {useState} from "react";
import FormError from "@forms/FormError"
import getCsrfCookie from "@modules/getCsrfCookie.js"

export default function SignInForm({
    userData,
    setUserData,
    setActiveSection,
    server,
}){

  const [formError, setFormError] = useState("");
  const [formInputs, setFormInputs] = useState({
    "username":"",
    "password": ""
  });

  function handleInputChange(e){
    e.stopPropagation();

    const {name, value} = e.target;
    // store the input value in formInputs state
    setFormInputs((prev) => ({...prev, [name]:value}));
  };


  async function handleSubmit(e){
    e.preventDefault(e)

    // FormData isnt a plain object. You cant use for--in to iterate
    const signInFormData = new FormData();// iterable using its methods .entries() .keys() and .values()

    // append form input values to signInFormData
    for (let key in formInputs){
      signInFormData.append(key, formInputs[key]);
    };

    // Fetch: 
    const signin = server+"signin/";
    const csrfToken = getCsrfCookie();
    const response = await fetch(signin, {
      method: "POST",
      credentials: "include",
      headers:{
        //"Content-Type": "application/json", its catulaty multipart form which is autimatically added when a form is supplied
        "X-CSRFToken": csrfToken, // Required for POST
      },
      body: signInFormData
    });

    const data = await response.json();

    if(response.ok){
      setUserData((prev)=>({...prev, 
        ["is_authenticated"]:data.is_authenticated,
        ["username"]:data.username,
      }))
  
      setActiveSection("draw-section");
    }else{
      setFormError(`React: ${data.error}`);
    }
  }


  return(
    <div className="form-wrapper">
        <form onSubmit={handleSubmit} className='standard-form signin-form' id="id-signin-form">
            {/* CSKA Moscow */}
            <input onChange={handleInputChange} className="form-input" type="text"     placeholder="Username" name="username" id="signin-form-username" maxLength="16" required />
            <input onChange={handleInputChange} className="form-input" type="password" placeholder="Password" name="password" id="signin-form-password" maxLength="45" required />

            <div className="form-submit">
                <button className = "form-submit-btn" type="submit">Sign In!"</button>
            </div>
        </form>
        <FormError formError={formError} />
    </div>  
  )
}