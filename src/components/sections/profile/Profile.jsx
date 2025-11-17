
import {useState, useEffect} from "react";
import {useProfile} from "@providers/ProfileContext";

import ViewProfileHeader from "@sections/profile/ViewProfileHeader";
import ProfileBlog       from "@sections/profile/ProfileBlog";
import EditButton        from "@sections/profile/EditButton";

import UpdateProfileForm from "@profForms/UpdateProfileForm";

/*
Getting form inputs to upload user data
function MyForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const username = data.get('username');
    const age = data.get('age');               // text
    const gender = data.get('gender');         // radio
    const hobbies = data.getAll('hobby');      // checkboxes
    const country = data.get('country');       // select
    const files = data.getAll('photos');       // files

    console.log({ username, age, gender, hobbies, country, files });
  };

    <form onSubmit={handleSubmit}>
      <input name="username" />
      <input name="age" type="number" />

      <label><input type="radio" name="gender" value="male" /> Male</label>
      <label><input type="radio" name="gender" value="female" /> Female</label>

      <label><input type="checkbox" name="hobby" value="code" /> Code</label>
      <label><input type="checkbox" name="hobby" value="music" /> Music</label>

      <select name="country">
        <option value="us">USA</option>
        <option value="uk">UK</option>
      </select>

      <input type="file" name="photos" multiple />

      <button type="submit">Save</button>
    </form>


*/



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