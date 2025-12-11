
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
  categories,
  setSubcategories,
  setIsLoadingSubcategories,
  setFormError
}){

  const scrollRef = useRef(null);
  const [chosenCategory, setChosenCategory]=useState({})

  useEffect(()=>{
    // Get the name of the chosen category
    let categoryName = "";
    for (const category of categories){
        if (formData.categoryChoice.id === category.id){
          categoryName = category.name;
        }
        // else chosenCategory.id === null
    };
    setChosenCategory(categoryName);
  },[]) // Run only when component mounts


  return(
  <div className="category-grid">
    {categories.map((category) => (
      <CategoryImage 
        key={category.id}
        formData={formData}
        setFormData={setFormData}
        setSubcategories={setSubcategories}
        category={category}
        setIsLoadingSubcategories={setIsLoadingSubcategories}
        setFormError={setFormError}
      />
    ))}
  </div>
    
  )
}
