
import ProfileBanner from "@sections/profile/ProfileBanner";
import ProfileAvatar from "@sections/profile/ProfileAvatar";

import BannerOverlay from "@forms/profile/BannerOverlay";
import AvatarOverlay from "@forms/profile/AvatarOverlay";

export default function EditProfileHeader({
  banner,
  avatar,
  username,
  handleImageChange,
}){
  console.log(`UpdateProfileForm: avatar=${avatar}`)

  return(
    <div className="profile-header">
      
        <ProfileBanner banner={banner} />
        <BannerOverlay handleImageChange={handleImageChange}/>

        {/* Key change will tell React to destroy the stale avatar rendered in the View and mount a brand new input whenever you toggle between view and edit.*/}
        <ProfileAvatar avatar={avatar} />
        <AvatarOverlay handleImageChange={handleImageChange}
        />
        <div className="profile-username fs8">{username}</div>
    </div>
  )
}