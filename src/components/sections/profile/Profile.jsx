
import {useState, useEffect} from "react";
import {useProfile} from "@providers/ProfileContext";
import UpdateProfileForm from "@profForms/UpdateProfileForm";

export default function Profile({
	userData,
	setUserData,
}){

	const [showForm, setShowForm] = useState(false);
	const {profileData, setProfileData} = useProfile()
	// The form state is in the parent so that the data persists if they close the form without saving

	function toggleShowForm(e){
		e.stopPropagation();
		setShowForm(!showForm)
	}

	return(
		<div className="main-panel">
      <div className="profile-header">

					<div className="profile-banner">
						<img className="banner-img" src={profileData.banner} />
					</div>

					<div className="avatar-wrapper">
						<div className="profile-avatar">
							<img className="avatar-img" src={profileData.avatar} />
						</div>
					</div>

					<div className="profile-username fs8">{userData.username}</div>

					<div className="toggle-form-btn">
						<div className="curtain-btn profile-button">
								<div className="curtain-btn-hover-state"></div>
								<span  onClick={toggleShowForm} >Edit</span>
						</div>
					</div>

			
			</div>
					
			<div className="profile-caption fs4">{profileData.caption}</div>

			<div className="profile-story fs3">{profileData.story}</div>

			{showForm &&
					<UpdateProfileForm 
						userData    = {userData}
						setUserData = {setUserData}
						showForm		= {showForm}
						setShowForm = {setShowForm}
					/>
			}
   

			<div className="profile-gallery">
				gallery-component
			</div>

		</div>
	)
}