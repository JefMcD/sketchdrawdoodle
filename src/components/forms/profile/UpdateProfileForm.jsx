
import {useState} from "react";
import getCsrfCookie from "@modules/getCsrfCookie.js"
import FormError from "@forms/FormError"



export default function UpdateProfileForm({
  userData,
  setUserData,
  setShowForm,
  showForm,
  server
}){
  
  const [formError, setFormError] = useState("")

  function toggleShowForm(e){
    e.stopPropagation()
    setShowForm(!showForm)
  }

  function handleInputChange(e){
    e.stopPropagation()
  }
  
  function handleImageChange(e){
    e.stopPropagation()
  }
  async function handleSubmit(e){
    e.preventDefault()
  
    // fetch prelaunch
    const update_profile = server+"update_profile/"
    const csrfToken = getCsrfCookie()
    const updateProfileForm = FormData()
  
    // fetch
    const response = await fetch(update_profile, {
      method: "POST",
      credentials: "include",
      headers: {
        // content-type: "multipart/form-data"
        "X-CSRFToken": csrfToken
      },
      body: updateProfileForm
      })
  
  }
  return(
  <>
    <div className='form-title'>Update Your Profile </div>    
    <div className = "form-wrapper">
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="standard-form  profile-form">

        <input onChange={handleInputChange} className="form-input" type="text"  name="story"   placeholder="story" autoFocus required/>
        <input onChange={handleImageChange} className="form-input" type="image" name="avatar"  placeholder="avatar" />
        <input onChange={handleInputChange} className="form-input" type="url"   name="website" placeholder="website" /> 

        <div className="form-submit">
            <div onClick={toggleShowForm} className = "form-cancel-btn" >Cancel</div>
            <input className="form-submit-btn" type="submit" value="Join Up!" />
        </div>

        <FormError formError={formError} />

        </form>
    </div>
  </>
  )
}