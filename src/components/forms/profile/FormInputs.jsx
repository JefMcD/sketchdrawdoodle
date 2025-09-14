

import {useProfile} from "@providers/ProfileContext";


export default function FormInputs({
  updateForm,
  handleInputChange,
}){
  console.log("FormInputs")
  const {profileData} = useProfile();

  return(
    <div className="profile-form-inputs">
      <input    key="caption"
                onChange={handleInputChange}
                name="caption" 
                type="text"  
                className="form-input" 
                value={updateForm.caption}
                placeholder={profileData.caption ? profileData.caption : "caption"}  
                maxLength="25"
                  />
      <textarea key="story"
                onChange={handleInputChange} 
                name="story"   
                type="text"
                className="form-text"  
                value={updateForm.story}
                placeholder= {profileData.story ? profileData.story : "story"}
                maxLength="320" 
                rows="7"
                  />
      <input    key="website"
                onChange={handleInputChange}  
                name="website" 
                type="url" 
                className="form-input" 
                value={updateForm.website}
                placeholder={profileData.website ? profileData.website : "website"}  
                maxLength="30"
                /> 
    </div>
  )
}
