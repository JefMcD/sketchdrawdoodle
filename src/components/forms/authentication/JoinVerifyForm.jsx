
import { useState } from "react";
import { useProfile} from "@providers/ProfileContext";

import {checkCookie} from "@modules/manageApi";

import FormError from "@forms/FormError"

export default function JoinVerifyForm({
  userData,
  setUserData,
  setActiveSection,
}){

  const server = userData.server;
  const csrfToken = checkCookie();

  const {profileData, setProfileData} = useProfile();
  const [formError, setFormError] = useState("");
  const [formInput, setFormInput] = useState("");
  
  function handleInput(e){
    e.stopPropagation();
    let inputValue = e.target.value;
    setFormInput(inputValue);
  }
  
  async function handleSubmit(e){
    e.preventDefault(); // Hurra! Prevent app being re rendered by form submission

    // create FormData
    const verifyForm = new FormData();
    verifyForm.append("secret_code",formInput);

    // Fetch: Send FormData to Django for Validation
    const create_new_user = server+"create_new_user/";
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
        // Django login invalidates csrftoken. 
        // Django @ensure_csrf_token sends DOM a new csrftoken for new session
        setUserData((prev)=>({...prev, ["is_authenticated"]:signedIn, ["username"]:username}))
        // set profileData
        setProfileData( (prev)=> ({
          ...prev,
          ["banner"] : data.banner,
          ["avatar"] : data.avatar,
          ["story"]  : data.story,
          ["caption"]: data.caption,
          ["website"]: data.website
        }))
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
                <input className = "form-btn" type="submit" value="Confirm" />
            </div>
        </form>

        <FormError formError={formError} />  
    </div>

  )
}