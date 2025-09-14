

export default function ProfileAvatar({
  avatar
}){
  console.log("ProfileAvatar mounted");

  return(
  <div className="avatar-wrapper">
    <div className="profile-avatar">
      <img className="avatar-img" src={avatar} />
    </div>
  </div>
)}