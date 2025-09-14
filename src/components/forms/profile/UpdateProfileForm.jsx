
import {useState, useEffect} from "react";
import {useProfile} from "@providers/ProfileContext";
import {checkCookie} from "@modules/manageApi.js";

import EditProfileHeader  from "@forms/profile/EditProfileHeader";
import FormInputs  from "@forms/profile/FormInputs";
import FormButtons from "@forms/profile/FormButtons";
import FormError   from "@forms/profile/FormError";


export default function updateFormData({
  userData,
  setIsShowForm,
  isShowForm,
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
    setIsShowForm(!isShowForm);
  };

  function handleInputChange(e){
    e.stopPropagation();
    const {name, value} = e.target;
    setUpdateForm( (prev )=>({...prev, [name]:value}));
  };
  

  function handleImageChangeT(e){
    e.stopPropagation();
    console.log("handleImageChage Test Triggered")
  }

  function handleImageChange(e){
    e.stopPropagation();
    console.log("handleImageChange Triggered")
    const {name, files: selectedFiles} = e.target;
    
    const file = selectedFiles[0];
    if (file){
      console.log("DEBUG: FILE Exists")
      // create temporary URL for preview
      try{
        console.log("DEBUG:setting imagePreview")
        const previewUrl = URL.createObjectURL(file);
        setImagePreview((prev)=>({...prev, [name]: previewUrl}));
        console.log("DEBUG: setting formImage")
        setFormImage((prev)=>({...prev, [name]: selectedFiles[0] }));


      }catch(err){
        console.log(`DEBUG: ERROR${err}`)
      }
    }else{
      console.log("DEBUG: No File")
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
      setIsShowForm(false) // Close form on success

    }catch (err){
      setFormError(err.message)
    }
  }

  console.log(`UpdateProfileForm.imagePreview.avatar = ${imagePreview.avatar}`)

  return(
  <div className="edit-profile-wrapper">
		<div className="edit-profile-box">

      <div className='form-title'>Update Profile </div>    
      <div className = "form-wrapper">
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="standard-form  profile-form">
          <EditProfileHeader 
            banner={imagePreview.banner}
            avatar={imagePreview.avatar}
            username={userData.username} 
            handleImageChange={handleImageChange}
          />
          <FormInputs 
            updateForm={updateForm}
            handleInputChange={handleInputChange}
             />
          <FormError formError={formError} />
          <FormButtons toggleShowForm={toggleShowForm}/>
        </form>
      </div> {/* form-wrapper */}
    </div> {/* edit-profile-box */}
  </div> // edit-profile-wrapper
  )
}




/*
          <div className="profile-header">

            <div className="profile-banner">
              <img className="banner-img" src={imagePreview.banner} />
            </div>

            <div className="banner-overlay">
              <div className="upload-component-wrapper">
                <div className="upload-component">
                  <ImageUpload 
                    name={"banner"} 
                    handleImageChange={handleImageChange} 
                    />
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
                  <ImageUpload 
                    name={"avatar"} 
                    handleImageChange={handleImageChange}
                 />
                </div>
              </div>
            </div>
          </div> 

*/