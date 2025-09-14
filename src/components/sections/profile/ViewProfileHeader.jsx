
import ProfileBanner from "@sections/profile/ProfileBanner";
import ProfileAvatar from "@sections/profile/ProfileAvatar";

export default function ViewProfileHeader({
  banner,
  avatar,
  username
}){

  return(
    <div className="profile-header">
        <ProfileBanner banner={banner} />
        <ProfileAvatar avatar={avatar}/>
        <div className="profile-username fs8">{username}</div>
    </div>
  )
}