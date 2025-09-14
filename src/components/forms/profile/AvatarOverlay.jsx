
import UploadIcon   from "@forms/profile/UploadIcon";

export default function AvatarOverlay({
  handleImageChange,
}){

  return(
    <div className="avatar-overlay">
      <UploadIcon 
        key="uploadIconAvatar"
        name={"avatar"} 
        handleImageChange={handleImageChange}
        />
    </div>
  )
}