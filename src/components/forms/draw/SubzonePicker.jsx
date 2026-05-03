import {useEffect} from "react";

import SubzoneItem from "@forms/draw/SubzoneItem";

export default function SubzonePicker({
  formData,     // all user choice for submission. set in Sketchdrawdoodle component
  setFormData,  // Update the or Data
  subzones,     // the set of subzones currently available. depends on active subcategorty
}){
  
  return(
    <>
    <div className="subcategory-picker-box">
          {subzones.map( (subzone, index)=> (
            <SubzoneItem 
              key={subzone.id}
              index={index}
              formData = {formData}
              setFormData = {setFormData}
              subzone={subzone}
            />
          ))}
      </div>
    </>
  )

}