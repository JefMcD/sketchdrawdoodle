import getServer from "@modules/getServer.js";
import {useEffect} from "react";

/*******************************************************************
 * 
 * Component CategoryImage.jsx
 * 
 * Receives the category object for the category as per the database
 * category = {id, name, description, image_url}
 * 
 * OnCLick fetches the corrosponding subcategories and 
 * sets state for re-render
 * 
 *******************************************************************/
// The clickable image in the category scroller
export default function CategoryImage({ 
  index,            // index of category in the list of categories. allows staggered loading of the categoryImage icons
  formData,         // formData.categoryChoice{id, name}
  setFormData,      // update the contents of the form data
  categoryTree,     // The entire categoryTree data category/subcategory/subzone
  category,         // instance of category {id, name, description, imageUrl}
  setSubcategories, // set new subcategories for the chosen category
  setSubzones       // clear subzones whena new category is selected
}) {

  function handleCategorySelect(e){
    e.stopPropagation();
  
    // fetch subcategories for selected category or get from cache
    console.log(`DEBUG: handleCategorySelect: formData.subcategoryChoices type = ${formData.subcategoryChoices} isAray = ${Array.isArray(formData.subcategoryChoices)}`)
    
    // setFormData with new category, clear subcategoryChoices and trigger render
    const clearChoice = {id: null, name:""}
    setFormData( (prev)=> ({
      ...prev, 
      categoryChoice: {
        id: category.id, // This CategoryImage id
        name: category.name // This CategoryImage name
      },
      subcategoryChoice:clearChoice, // When a new Category is chosen, subcategory choices are reset to null
      subzoneChoice:clearChoice  // clear subzone choices too
    })
    );
    
    // get the new subcategories from the categoryTree
    console.log(`categoryTree = ${categoryTree}`)
    let sub_list = []
    for (const cat of categoryTree){
      if(cat.id === category.id){ // The chosen category
        sub_list = cat.subcategories.map(sub=> ( //iterate the subcategories and return a list containing an object for each
          {
            id: sub.id,
            name: sub.name,
            desciption: sub.description,
            image_url: sub.image_url
          }
        ))
      }
    }
    setSubcategories(sub_list); // set new subcategories
    setSubzones([]); // clear subzones

      
  }
  
  return (
      <div
        className={`category-tile ${formData.category === category.id ? 'active' : ''}`}
        onClick={handleCategorySelect}
      >
        <img src={category.image_url} alt={category.name} />
        <div className="category-label">{category.name}</div>
      </div>
  );
};

/**
 * 
 * Fetch Subcategories from the Django Endpoint
 * 
  async function handleFetchCategorySelect(e){
    e.stopPropagation()

    const server = getServer();
    const getSubcategories = `${server}get_subcategory_options/${category.id}`

    // fetch subcategories for selected category or get from cache
    setIsLoadingSubcategories(true)
    try{
      const response = await fetch(getSubcategories,{
        method: "GET",
        //cache: "no-store"
      });
      const data = await response.json();
      if(!response.ok){
        const error = data.error
        return
      }else{
        // setFormData with new category, clear subcategoryChoices and trigger render
        setFormData( (prev)=> ({
          ...prev, 
          categoryChoice: {id: category.id, name: category.name},
          subcategoryChoices:[]
        }));
        setSubcategories(data.subcategory_payload);
      }
    }
    catch (error){
      setFormError(`Fetch Subcategories Failed: ${error}`)
    }
    finally{
      setIsLoadingSubcategories(false)
    }
  }
 * 
 */