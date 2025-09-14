
import UploadIcon   from "@forms/profile/UploadIcon";

export default function BannerOverlay({

  handleImageChange
}){

  return(
    <div className="banner-overlay">
      <UploadIcon 
        key="uploadIconBanner"
        name={"banner"} 
        handleImageChange={handleImageChange} 
        />
    </div>
  )
}