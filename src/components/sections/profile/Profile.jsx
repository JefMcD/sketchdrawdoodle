
import {useState, useEffect} from "react";
import {useProfile} from "@providers/ProfileContext";

import ViewProfileHeader from "@sections/profile/ViewProfileHeader";
import ProfileBlog       from "@sections/profile/ProfileBlog";
import EditButton        from "@sections/profile/EditButton";

import UpdateProfileForm from "@profForms/UpdateProfileForm";

export default function Profile({
	userData,
}){

	const [isShowForm, setIsShowForm] = useState(false);
	const {profileData, setProfileData} = useProfile()
	// The form state is in the parent so that the data persists if they close the form without saving

	function toggleShowForm(e){
		e.stopPropagation();
		setIsShowForm(!isShowForm)
	}

	return(
		<div className="main-panel">
			<ViewProfileHeader 
				banner={profileData.banner}
			  avatar={profileData.avatar}
				username={userData.username} 
			/>
			<div className="profile-caption fs4">{profileData.caption}</div>
			<div className="profile-story fs3">{profileData.story}</div>
			<EditButton toggleShowForm={toggleShowForm}/>
			{isShowForm &&
					<UpdateProfileForm 
						userData      = {userData}
						isShowForm		= {isShowForm}
						setIsShowForm = {setIsShowForm}
					/>
			}
			<ProfileBlog />
		</div>
	)
}