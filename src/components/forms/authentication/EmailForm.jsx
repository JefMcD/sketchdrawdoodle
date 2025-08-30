
/*
    Form used for the password reset process
*/

import {useState} from "react"
import FormError from "@forms/FormError"

export default function EmailForm({
    setSubheader,
    setMessage,
    setStep,
    csrfToken,
    server}
){
    const [formError, setFormError] = useState("");
    const [email, setEmail] = useState("")

    function handleInputChange(e){
        e.stopPropagation();
        const email = e.target.value;
        setEmail(email);
    }

    async function handleSubmit(e){
        e.preventDefault();

        const resetForm = new FormData
        resetForm.append("email", email)

        // fetch
        const request_password_reset = server+"request_password_reset/";
        const response = await fetch(request_password_reset, {
            method:"POST",
            credentials: "include",
            headers:{
            // "Content-Type": "multipart/form-data", set automatically by FormData Object in body
            "X-CSRFToken": csrfToken, // Required for POST
            },
            body: resetForm,
        })

        const data = await response.json()

        if(response.ok){
            setStep("code")
            setSubheader("Secret Code")
            setMessage("Enter the secret code we sent you")
        }else{
            setFormError(`React: ${data.error}`)
        }
    }


  return(
    <div className="form-wrapper">
        <form onSubmit={handleSubmit} className='standard-form verify-form'>
            {/* CSKA Moskva URRRAH! */}

            <input onChange={handleInputChange} type="email" className="form-input" name="email" placeholder="Email" required autoFocus />

            <div className="form-submit">
                <input className = "form-submit-btn" type="submit" value="Send Reset" />
            </div>
        </form>

        <FormError formError = {formError} />

    </div>
  )
}