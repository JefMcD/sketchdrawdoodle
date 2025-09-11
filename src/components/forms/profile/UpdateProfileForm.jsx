
import {useState, useEffect} from "react";
import {useProfile} from "@providers/ProfileContext";

import {checkCookie} from "@modules/manageApi.js"
import FormError from "@forms/FormError"
import UploadSvg from "@svgIcons/UploadSvg"

export default function updateFormData({
  userData,
  setShowForm,
  showForm,
}){
  console.log("######## updateForm ########");

  const [formError, setFormError] = useState("");
  const {profileData, setProfileData} = useProfile();  
  const csrfToken = checkCookie();
  const server = userData.server;

  // state to handle form inputs
  const [updateForm, setUpdateForm] = useState({
    story: "",
    caption: "",
    website: ""
  });

  // state to handle form image upoads
  const [formImage, setFormImage] = useState({
    banner: "",
    avatar: ""
  });

  // State to store preview URLs
  const [imagePreview, setImagePreview] = useState({
    banner: profileData.banner,
    avatar: profileData.avatar,
  });


  function toggleShowForm(e){
    e.stopPropagation();
    setShowForm(!showForm);
  };

  function handleInputChange(e){
    e.stopPropagation();
    const {name, value} = e.target;
    setUpdateForm( (prev )=>({...prev, [name]:value}));
  };
  


  function handleImageChange(e){
    e.stopPropagation();
    const {name, files: selectedFiles} = e.target;
    
    const file = selectedFiles[0];
    if (file){
      // create temporary URL for preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview((prev)=>({...prev, [name]: previewUrl}));
      setFormImage((prev)=>({...prev, [name]: selectedFiles[0] }));
    }
  }

  //Clean up preview URL's to prevent memory leaks if the image is repeatedly changed
  useEffect(()=>{
    // Revoke Urls when component unmounts or image changes
    return() => {
      if (imagePreview.avatar) URL.revokeObjectURL(imagePreview.avatar);
      if (imagePreview.banner) URL.revokeObjectURL(imagePreview.banner);
    }
  }, [imagePreview.avatar, imagePreview.banner]);






  async function handleSubmit(e){
    e.preventDefault();
  
    // fetch prelaunch
    const update_profile = server+"update_profile/";
    const updateFormData = new FormData();

    // Only append the inputs that have changed (have values) to the updateFormData
    updateForm.story   && updateFormData.append("story", updateForm.story);
    updateForm.caption && updateFormData.append("caption", updateForm.caption);
    updateForm.website && updateFormData.append("website", updateForm.website);

    // Remember, Only image URL's are held in state not the actual image
    // Don’t append the old URLs when no new file is selected. Just omit them 
    // — Django will keep the existing images in the DB if you don’t overwrite them
    formImage.banner && updateFormData.append("banner", formImage.banner) ; 
    formImage.avatar && updateFormData.append("avatar", formImage.avatar);

    // fetch
    try{
      const response = await fetch(update_profile, {
        method: "POST",
        credentials: "include",
        headers: {
          // content-type: "multipart/form-data" (Django requires this to be set by the Browser)
          "X-CSRFToken": csrfToken
        },
        body: updateFormData,
      });
    
      const data = await response.json()
  
      if (!response.ok) throw new Error(data.error || "Failed to update profile");
  
      // Update Profile Data
      setProfileData((prev)=>(
          {...prev, 
            ["banner"] : data.profile_data.banner,
            ["avatar"] : data.profile_data.avatar,
            ["caption"]: data.profile_data.caption,
            ["story"]  : data.profile_data.story,
            ["website"]: data.profile_data.website,
        }
      ))
      setShowForm(false) // Close form on success

    }catch (err){
      setFormError(err.message)
    }
  }

  function ImageUpload({
    name,
    handleImageChange,
    }){

    const inputId = `${name}-file-id`;

    return(
    <>
        <div className={"file-selector-icon"}>
          <label htmlFor={inputId}>
            <UploadSvg svgStyles="grey-svg" />
          </label>
          <input id={inputId} name={name} type="file" accept="image/*" onChange={handleImageChange} className="choose-file-btn" />
        </div>
    </>
    )
  }
  
  return(
  <div className="edit-profile-wrapper">
		<div className="edit-profile-box">

      <div className='form-title'>Update Profile </div>    
      <div className = "form-wrapper">
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="standard-form  profile-form">

          <div className="profile-header">

            <div className="profile-banner">
              <img className="banner-img" src={imagePreview.banner} />
            </div>
            <div className="banner-overlay">
              <div className="upload-component-wrapper">
                <div className="upload-component">
                  <ImageUpload name={"banner"} handleImageChange={handleImageChange}/>
                </div>
              </div>
            </div>

            <div className="avatar-wrapper">
              <div className="profile-avatar">
                <img className="avatar-img" src={imagePreview.avatar} />
              </div>
            </div>
            <div className="avatar-overlay">
              <div className="upload-component-wrapper">
                <div className="upload-component">
                  <ImageUpload name={"avatar"} handleImageChange={handleImageChange}/>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-form-inputs">
            <input    onChange={handleInputChange}
                      name="caption" 
                      type="text"  
                      className="form-input" 
                      placeholder={profileData.caption ? profileData.caption : "caption"}  
                      maxLength="25" />
            <textarea onChange={handleInputChange} 
                      name="story"   
                      type="text"
                      className="form-text"  
                      placeholder= {profileData.story ? profileData.story : "story"}
                      maxLength="320" 
                      rows="7"/>
            <input    onChange={handleInputChange}  
                      name="website" 
                      type="url" 
                      className="form-input" 
                      placeholder={profileData.website ? profileData.website : "website"}  
                      maxLength="30"/> 
          </div>

          <div className="profile-form-buttons-box">
            <div className="form-btn-wrapper">
                <div onClick={toggleShowForm} className = "form-btn" >Cancel</div>
            </div>
            <div className="form-btn-wrapper">
                <input className="form-btn" type="submit" value="Save" />
            </div>
          </div>
        
          <FormError formError={formError} />

        </form>
      </div> {/* form-wrapper */}
    </div> {/* edit-profile-box */}
  </div> // edit-profile-wrapper
  )
}