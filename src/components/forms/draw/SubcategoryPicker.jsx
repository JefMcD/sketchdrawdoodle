import {useState, useEffect} from "react";

import SubcategoryItem from "@forms/draw/SubcategoryItem";


export default function SubcategoryPicker({
  userData,
  formData,
  setFormData,
  setFormError,
  subcategories,
}){

  /*
  subcategories = [
  {id:123, name:"boats", description:"machines of the water", image_url:"/media/setup_subcategories/boats.jpg"},
  ...
  ]
  */

  return(
    <>
    <div className="subcategory-header writing fs4">{formData.categoryChoice.name}</div>
    <div className="subcategory-picker-box">
          {subcategories.map( (subcategory, index)=> (
            <SubcategoryItem 
              key={subcategory.id}
              userData={userData}
              formData = {formData}
              setFormData = {setFormData}
              setFormError={setFormError}
              subcategory={subcategory}
              index={index}
            />
          ))}
      </div>
    </>
  )
}