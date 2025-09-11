

import {useState} from "react";
import {checkCookie} from "@modules/manageApi";
import FormError from "@forms/FormError";

export default function JoinForm({
  userData,
  setIsJoinOk,
}){
  const server = userData.server;
  const csrfToken = checkCookie();
  const [formError, setFormError] = useState("");
  const [formInputs, setFormInputs] = useState({
    first_name:"",
    last_name: "",
    username:"",
    email:"",
    password:"",
    confirm:"",
  });

  //const {apiData, setApiDat} = useApi(); Context Provider 
  //const server = apiData.server;

  function handleInputChange(e){
    e.stopPropagation()

    // get the event object(the input field) and destructure its name and value attributes
    const {name, value} = e.target;

    // name is the key for each formData property. Mutate its value to the new value
    setFormInputs((prev)=> ({...prev, [name]:value})); 
  }

  async function handleSubmit(e){
    console.log("handleSubmit");
    e.preventDefault();

    const formData = new FormData();
    // Note: these field names need to match the Django User model, so dont change em
    formData.append("first_name",document.querySelector("input[name='first_name']").value);
    formData.append("last_name", document.querySelector("input[name='last_name']").value);
    formData.append("username",  document.querySelector("input[name='username']").value);
    formData.append("email",     document.querySelector("input[name='email']").value);
    formData.append("password",  document.querySelector("input[name='password']").value);
    formData.append("confirm",   document.querySelector("input[name='confirm']").value) ;

    try{
      // fetch 
      const validate_join_form = server+"validate_join_form/";
      const response = await fetch(validate_join_form, {
        method: "POST",
        credentials: "include", // Include cookies (sessionid)
        headers: {
          //"Content-Type": "multipart/form-data", // FormData sets this automatically
          "X-CSRFToken" : csrfToken,  // Needed for all POST requests
        },
        body: formData,
      })

      const data = await response.json()  // Parse the response

      if(response.ok){
        setIsJoinOk(true)
      }else{
        let join_error = data.error
        throw new Error("React: response !ok "+join_error)
      }

    }catch(err){
        setFormError("React:Catch:JoinForm:"+err.message)
    }
  }

  // Special Powers
  // Most powerfull foe vanquished

  return(
  <>
    <div className="form-title">Application Form</div>

    <div className="form-wrapper">
      <form className="standard-form join-form" onSubmit={handleSubmit}>
        {/* CSKA Moskva */}
        <div className="form-inputs-box">
          <input onChange={handleInputChange} type="text"     name="first_name" className="form-input" placeholder="Firstname"  maxLength="16" autoFocus required="" id="id_firstname" />
          <input onChange={handleInputChange} type="text"     name="last_name"  className="form-input" placeholder="Lastname"   maxLength="16" required id="id_lastname" />
          <input onChange={handleInputChange} type="text"     name="email"      className="form-input" placeholder="Email"      maxLength="45" required id="id_email" />
          <input onChange={handleInputChange} type="text"     name="username"   className="form-input" placeholder="Username"   maxLength="16" required id="id_username" />
          <input onChange={handleInputChange} type="password" name="password"   className="form-input" placeholder="Password"         maxLength="45" minLength="8" required id="join-form-password" />
          <input onChange={handleInputChange} type="password" name="confirm"    className="form-input" placeholder="Confirm Password" maxLength="45" minLength="8" required id="id_confirm" />
        </div>

        <div className="form-submit">
            <input className="form-btn" type="submit" value="Join Up!" />
        </div>

      </form>

        <FormError formError={formError} />
    </div>
  </>
  )
}