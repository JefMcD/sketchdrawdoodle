
import UploadSvg from "@svgIcons/UploadSvg";

export default function UploadIcon({
  name,
  handleImageChange,
  }){
  console.log("UploadIcon Mounted")
  console.log("UploadIcon.handleImageChange:", typeof handleImageChange);
    
    //console.log(`handleImageChange=${typeof handleImageChange}`)  // debug logs 'handleImageChange = function'
  const editImage = `edit${name}`
  const viewImage = `view${name}`
  const inputId = `${name}-file-id`;

  return(
  <div className="upload-component-wrapper">
    <div className="upload-component">
        <div className={"file-selector-icon"}>
          <label htmlFor={inputId}>
            <UploadSvg />
          </label>
          <input 
            id={inputId} 
            name={name} 
            type="file" 
            accept="image/*" 
            onChange={(e) => {
              if (typeof handleImageChange === "function") {
                console.log(`handleImageChange ${handleImageChange}`)
                handleImageChange(e);
              } else {
                console.warn("handleImageChange missing", handleImageChange);
              }
            }}
            className="choose-file-btn"
          />
        </div>
    </div>
  </div>
  )
}