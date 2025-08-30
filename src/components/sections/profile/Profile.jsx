
import {useState, useEffect} from "react";

import profileBanner from "@images/profile/banner/zoe_fish.jpg";
import profileAvatar from "@images/profile/avatar/zoe.jpg";

import UpdateProfileForm from "@profForms/UpdateProfileForm";

export default function Profile({
	userData,
	setUserData,
	server
}){

	const [showForm, setShowForm] = useState(false);

	function toggleShowForm(e){
		e.stopPropagation();
		setShowForm(!showForm)

	}

	//  On component load check if the profile data is loaded
	//  If profile data already loaded us it else fetch the Profile Data from the API


	return(
		<div className="main-panel">
      <div className="profile-banner">
					<img className="banner-img" src={profileBanner} />

					<div className="profile-avatar"><img className="avatar-img" src={profileAvatar} /></div>
					<div className="profile-username fs9">{userData.username}</div>
					<div className="profile-caption">finding the source of inspiration</div>
			</div>

			<div className="profile-story">{userData.story}</div>

			{showForm &&
				<div className="edit-profile-box">
					<UpdateProfileForm 
						userData    = {userData}
						setUserData = {setUserData}
						showForm		= {showForm}
						setShowForm = {setShowForm}
						server			= {server}
					/>
				</div>
			}

				<div className="toggleFormBtn">
					<button onClick={toggleShowForm}>Update</button>
				</div>

			<div className="profile-story">
				{userData.story}
			</div>      

			<div className="profile-gallery">
				gallery-component
			</div>

		</div>
	)
}