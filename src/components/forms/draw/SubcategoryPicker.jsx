import {useState, useEffect} from "react";

import SubcategoryItem from "@forms/draw/SubcategoryItem";


export default function SubcategoryPicker({
  formData,
  setFormData,
  categoryTree,
  subcategories,
  setSubzones,
}){

  /*
  subcategories = [
  {id:123, name:"boats", description:"machines of the water", image_url:"/media/setup_subcategories/boats.jpg"},
  ...
  ]
  */


  return(
    <>
    <div className="subcategory-picker-box">
          {subcategories.map( (subcategory, index)=> (
            <SubcategoryItem 
              key={subcategory.id}
              index={index}
              formData = {formData}
              setFormData = {setFormData}
              categoryTree={categoryTree}
              subcategory={subcategory}
              setSubzones={setSubzones}
            />
          ))}
      </div>
    </>
  )
}