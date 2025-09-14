

export default function updateFormData({
  userData,
  setIsShowForm,
  isShowForm,
}){
  console.log("######## updateForm ########");


  // ... handling state and other functionality

  function handleImageChange(e){
    //e.stopPropagation();
    console.log("handleImageChage Invoked")
  }


  return(
  <div className="edit-profile-wrapper">
    <div className="edit-profile-box">

      <div className='form-title'>Update Profile </div>    
      <div className = "form-wrapper">
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="standard-form  profile-form">
          <ProfileHeader 
            isShowForm={isShowForm}
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


