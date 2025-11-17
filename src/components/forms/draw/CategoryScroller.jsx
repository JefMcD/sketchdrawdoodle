

// This Component is no longer Used

import {useState, useRef, useEffect} from "react";

import ScrollerImage from "@forms/draw/ScrollerImage";
import LeftButton from "@svgIcons/general/LeftButton";
import RightButton from "@svgIcons/general/RightButton";
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
export default function CategoryScroller({
  formData,
  setFormData,
  categories,
  setSubcategories
}){

  const scrollRef = useRef(null);
  const [chosenCategory, setChosenCategory]=useState({})

  function handleScrollLeft(e){
    e.preventDefault();
    e.stopPropagation();

    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: -scrollRef.current.clientWidth,
      behavior: "smooth",
    });

  };

  function handleScrollRight(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: scrollRef.current.clientWidth,
      behavior: "smooth",
    });
  };

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
    <>

    <div className="category-scroller-block">
      <LeftButton onClick={handleScrollLeft} />
      <div className="category-scroller-container" 
        ref={scrollRef}
      >
        <div className="category-scroller">
          { // iterate over the categories array and return the image from each object to ScrollerImage
            categories.map( (category)=>(
            <ScrollerImage 
              key={category.id}
              formData={formData}
              setFormData={setFormData}
              category={category}
              setSubcategories={setSubcategories}
            />
          ))}
        </div>
      </div>
      <RightButton onClick={handleScrollRight}/>
  </div>
    </>

    
  )
}
