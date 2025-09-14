

export default function ProfileBanner({
  banner
}){
  return(
    <div className="profile-banner">
      <img className="banner-img" src={banner} />
    </div>
  )
}