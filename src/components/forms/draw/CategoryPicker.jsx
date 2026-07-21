
import {useState, useRef, useEffect} from "react";

import CategoryImage from "@forms/draw/CategoryImage";
/*****************************************************
categories. An array of objects containing the values retrieved from the Database table Category
eg
categories = [
  { id: 1,
    name:"transport", 
    description:"ways of getting around", 
    image_url:"/media/setup_categories/transport.jpg"
  },
  {next category object},
  ...
]
*****************************************************/
export default function CategoryPicker({
  formData,
  setFormData,
  categoryTree,
  categories,
  setSubcategories,
  setSubzones

}){
    for (let category of categoryTree){
        console.log(`CategoryPicket image = ${category.image_url}`)
    }

  return(
  <div className="category-grid">
    {categories.map((category) => (
      <CategoryImage 
        key={category.id}
        formData={formData}
        setFormData={setFormData}
        categoryTree={categoryTree}
        category={category}
        setSubcategories={setSubcategories}
        setSubzones={setSubzones}
      />
    ))}
  </div>
    
  )
}
