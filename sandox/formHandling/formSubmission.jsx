
/*
  Form Submission onSubmit
  Extended Commentary and docs

*/

  function handleInputChange(e){
    const {name, value} = e.target;// get the event object(the input field) and destructure its name and value attributes
    setFormInputs((prev)=> ({...prev, [name]:value})); // name is the key for each formData property. Mutate its value to the new value
  }

  async function handleSubmit(e){
    console.log("handleSubmit")
    e.preventDefault()
    const fname = document.querySelector("input[name='firstname']")
    console.log("fname: ", fname)
    console.log(fname.value)
    //let cookie = getCookie("csrf_token")
    
    // Create a FormData object to send to Django
    // FormData mirrors Django Form handling and allows File attachments
    // So its straightforward to unpack it and verify it on the server
    const formData = new FormData()
    formData.append("firstname",document.querySelector("input[name='firstname']").value)
    formData.append("lastname", document.querySelector("input[name='lastname']").value)
    formData.append("username", document.querySelector("input[name='username']").value)
    formData.append("email",    document.querySelector("input[name='email']").value)
    formData.append("password", document.querySelector("input[name='password']").value)
    formData.append("confirm",  document.querySelector("input[name='confirm']").value) 
    console.log("formData prepared")
    // console.log(formData) doesn’t show contents clearly. Use 
    // formData.entries() to log key-value pairs for debugging.
    for (let [key, value] of formData.entries()){
      console.log(`${key}`, value)
    }

    try{
      console.log("fetching")
      const response = await fetch("http://127.0.0.1:8000/validate_join_form", {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data", // FormData sets this automatically
          //"X-CSRFToken": getCookie("csrf_token"), // if you’re using Django CSRF
        },
        body: formData,
      })


      // Parse the response
      const data = await response.json() // Async operation hence the need for await
      
      console.log("Checking Response")
      /*
      response.ok: 
      This is a built-in property of the Response object returned by fetch. 
      It’s true if the HTTP status code is in the range 200–299 (indicating success) 
      and false otherwise (e.g., 400, 404, 500).*/
      let join_error = ""
      if(! response.ok){
        // Customize the error based on response.status
        join_error = data.error
        setFormError(join_error) 

        throw new Error("Form Error: "+join_error)
      }

      console.log("response OK")

      // Process the data
      if(data){ 
        // form has passed server side validation.
        // email with verification code has been sent to applicant
        setActiveSection("verify-section")
        // Note: This is setting state during the context of an event handler (onSubmit)
        // No render-phase state updates are occurring, so no errors are thrown.

      }else{
        setFormError(data.message || "Something went wrong")
      }

    } catch(err){
        setFormError(err.message)
    }
  }



import {useState} from "react";

export default function JoinForm({isAuthenticated, setIsAuthenticated, setActiveSection}){

  const [formError, setFormError] = useState("");
  const [formInputs, setFormInputs] = useState({
    firstname:"",
    lastname: "",
    username:"",
    email:"",
    password:"",
    confirm:"",
  });

  return(
  <>
    <div className="form-title">Sketch Draw Doodle Application Form</div>

    <div className="form-wrapper join-form">
      <form className="standard-form join-form" onSubmit={handleSubmit}>
        {/* CSKA Moskva */}
        <input onChange={handleInputChange} type="text"     name="firstname"  className="form-input" placeholder="Firstname"  maxLength="16" autoFocus required="" id="id_firstname" />
        <input onChange={handleInputChange} type="text"     name="lastname"   className="form-input" placeholder="Lastname"   maxLength="16" required id="id_lastname" />
        <input onChange={handleInputChange} type="text"     name="email"      className="form-input" placeholder="Email"      maxLength="45" required id="id_email" />
        <input onChange={handleInputChange} type="text"     name="username"   className="form-input" placeholder="Username"   maxLength="16" required id="id_username" />
        <input onChange={handleInputChange} type="password" name="password"   className="form-input" placeholder="Password"         maxLength="45" minLength="8" required id="join-form-password" />
        <input onChange={handleInputChange} type="password" name="confirm"    className="form-input" placeholder="Confirm Password" maxLength="45" minLength="8" required id="id_confirm" />

        <div className="form-submit">
            <input className="form-submit-btn" type="submit" value="Join Up!" />
        </div>

        <div className="form-error">
          {formError && <div>{formError}</div>}
        </div>
      </form>
    </div>
  </>
  )
}