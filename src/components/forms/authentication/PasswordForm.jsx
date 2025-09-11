
import {useState}    from "react";
import {useProfile}  from "@providers/ProfileContext";
import {checkCookie} from "@modules/manageApi";
import FormError from "@forms/FormError";

export default function PasswordForm({
  server,
  setUserData,
  setActiveSection,
}){
  const {profileData, setProfileData} = useProfile();
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
    try{
      const csrfToken = checkCookie(server) 
      const set_new_password = server+"set_new_password/";
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
        console.log("response ok")
        // Sucesss Password changed

        console.log("setUserData")
        // set userData
        setUserData((prev)=>({
          ...prev, 
          ["is_authenticated"]: data.is_authenticated, 
          ["username"]: data.username
        }))

        console.log("setProfileData")
       // set profileData
        setProfileData( (prev)=> ({
          ...prev,
          ["banner"] : data.banner,
          ["avatar"] : data.avatar,
          ["story"]  : data.story,
          ["caption"]: data.caption,
          ["website"]: data.website
        }))
        console.log("setActiveSection")
        setActiveSection("welcome-section");
      }
    }catch(err){
      setFormError(`React : Catch ${err}`);
    }
  }


  return(
    <div className="form-wrapper">
        <form className="standard-form verify-form" onSubmit={handleSubmit}>
           {/*CSKA Rooskis */}

            <input onChange={handleInput} className="form-input" type="password" name="password" placeholder="new password" autoFocus required/>
            <input onChange={handleInput} className="form-input" type="password" name="confirm"  placeholder="confirm"      required/>

            <div className="form-submit">
                <input className = "form-btn" type="submit" value="Confirm" />
            </div>
        </form>

        <FormError formError={formError} />  

    </div>

  )
}