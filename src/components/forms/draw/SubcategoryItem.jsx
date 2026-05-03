import {useRef, useState, useEffect} from "react";

export default function SubcategoryItem({
  index,        // The array index the item has in the Subcategories list. Used for controlling the timing of the item being diaplsye4d
  formData,    // contains formData.subcategoryChoices[{id1, name1}, {id2, name2} ... etc]
  setFormData, // for setting SubCategoryChoices[]
  categoryTree, // The full tree of category/subcategory/subzone
  subcategory,  // The selectable subcategory item on screen {id, name, description, image_url}
  setSubzones,  // for setting the new list of subzones for the chosn subcategory 

}){

// DEBUG
  useEffect(
    ()=>(
      console.log(`DEBUG: SubcategoryItem: formData.subcategoryChoices type = ${formData.subcategoryChoices} isAray = ${Array.isArray(formData.subcategoryChoices)}`)
    ),[]
  )


// Debug: Check categoryTree data structure returned
    // useEffect(
    //     () => {
    //         console.log("Checking categoryTree")
    //         const categoryName = "LifeDrawing";
    //         let LD_cat_id = null;
    //         let LD_cat_name = null;
    //         let LD_subcategories = null;

    //         const subcategoryName = "Women";
    //         let wom_subcat_id = null;
    //         let wom_subcat_name = null;
    //         let wom_subzones = null;

    //         for(let cat of categoryTree){
    //             if(cat.name === categoryName){
    //                 console.log(`DEBUG: Found LifeDrawing category = ${cat.name}`);
    //                 LD_cat_id = cat.id;
    //                 LD_cat_name = cat.name;
    //                 LD_subcategories = cat.subcategories;
    //                 console.log(`DEBUG: subcategories = ${LD_subcategories}`)
    //             }
    //         };
    //         for(const subcat of LD_subcategories){
    //             console.log(`DEBUG: subcategory ${subcat.name}`)
    //             if(subcat.name === subcategoryName){
    //                 console.log("DEBUG: Found Women Subcategory")
    //                 wom_subcat_id = subcat.id;
    //                 wom_subcat_name = subcat.name;
    //                 wom_subzones = subcat.subzones;
    //             }
    //         };
    //         console.log(`DEBUG: subzones = ${wom_subzones}`)
    //         for(let zone of wom_subzones){
    //             console.log(`zubzone = ${zone.name}`)
    //         }

    //     },[]
    // )
    

  // if a user is Pro they can have up to three subcategory choices
  // if a user is Guest they can have one
  //const isPro = userData.is_authenticated;
  //const maxSelections = 1; // limit selections to One Category/Subcategory/Subzone

  // Determine if the selected subcategory isCurrentCnoice
  let isCurrentChoice = false;
  // if the subcategoryChoice exist, iterate over the array of choices and check if this item is already checked
  if(formData.subcategoryChoice.id === subcategory.id){
    isCurrentChoice = true;
    const currentSubcategoryChoice = formData.subcategoryChoice;// shallow copy obj {id: 1, name: "people"}
  }

  // reveal subcategories one at a time. Broooop!
  const [isVisible, setIsVisible] = useState(false);
  useEffect( () => {
    const timer = setTimeout(()=>{
      setIsVisible(true);
    }, index*80); // 80 ms stagger between Items being displayed
    return ()=> clearTimeout(timer);
  }, [index])


  // Clear subcategory selection and select new pick
  function handleSubcategorySelect(e){
    e.stopPropagation();
  
    const {checked} = e.target; // checked==true means selected subcategory item changed from unselected to selected and vice-versa
    
    // make shallow copy of prev subcategoryChoices
    let newSubcategoryChoice = {}; // initialise empty object for subcategoryChoice
    
    // Handle checking and unchecking a subcategory, ensure only one is active.
    if (checked){ // subcategory changed from unchecked to checked 
      // Update subcategory choice
      newSubcategoryChoice = 
        {
          id: subcategory.id,
          name: subcategory.name
        }; 
    }else{ // subcategory went from checked to unchecked
        newSubcategoryChoice = {id: null, name:""};  // clear selection
    };

    // add the new subcategory choice to the updataedChoices list
    console.log(`DEBUG: SUbcategory Choice is ${newSubcategoryChoice.name}`);

    // add new choice to formData
    setFormData( (prev)=> ({
      ...prev,
      subcategoryChoice:newSubcategoryChoice
    }));


    // 1. get the new subcategories from the categoryTree
    console.log(`categoryTree = ${categoryTree}`)
    const category_id = formData.categoryChoice.id; // get the currently selected category
    let subcategoryList = []; // initialise an empty subcategory_list
    for (const cat of categoryTree){ // iterate over the top level category objects in the tree
      if(cat.id === category_id){ // Find the currently chosen category
        subcategoryList = cat.subcategories.map(sub=> ( //iterate the subcategories and return a list containing an object for each
          {
            id: sub.id,
            name: sub.name,
            desciption: sub.description,
            image_url: sub.image_url,
            subzones: sub.subzones
          }
        ))
      };



      // 2. Get the subzones for the chosen subcategory
      let subzoneList = []; // initialise an empty subzone list
      const new_subcat_id = newSubcategoryChoice.id; // what is the currently selected subcategory?
      for (let subcat of subcategoryList){ // iterate over the subcategoryList
        console.log(`DEBUG: checking subcat.id = ${subcat.id}`)

        if (new_subcat_id === subcat.id){ // find the subcategory in the subcategoryList that has the chosen subcategory is
          subzoneList = subcat.subzones; // get the list of subzones. An array of subzone obj [{}, {}, ...]
          console.log(`found subcat check for subzones-> ${subzoneList}`);
          
        }else{
          console.log("No Match");
        }
        
      }



      // set the subzone state or clear if none exists.
      if (subzoneList){
        console.log(`subzones exist: ${subzoneList}`)
        setSubzones(subzoneList);
      }else{
        console.log("No subzones found")
        setSubzones([])
      }

    }

  }


  return(

    <div className={`subcategory-item ${isVisible ? 'fade-in':""}`}>

      <div className="subcategory-checkbox">
        <input 
          type="checkbox" 
          id={`subcategory-${subcategory.id}`}
          name="subcategory"
          value={subcategory.id}
          checked={isCurrentChoice}
          onChange={handleSubcategorySelect}
        />
        <label htmlFor={`subcategory-${subcategory.id}`} className="subcategory-label">
          <img src={subcategory.image_url} alt={subcategory.name} />
        </label>
      </div>

      <div className="subcategory-name">{subcategory.name}</div>
      

    </div>

  )
}
/**
 * fetch subzone options from Django endpoint
 * 
 * 
 * 
  async function getSubzoneOptions(){
  e.stopPropagation()

    const server = getServer();
    const getSubzones = `${server}get_subzone_options/${subcategory.id}`

    // fetch subcategories for selected category or get from cache
    setIsLoadingSubcategories(true)
    try{
      const response = await fetch(getSubzones,{
        method: "GET",
        //cache: "no-store"
      });
      const data = await response.json();
      if(!response.ok){
        const error = data.error
        return
      }else{
        // setFormData with new subzones, clear subzoneChoices and trigger render
        setFormData( (prev)=> ({
          ...prev, 
          subzoneChoice: {id: category.id, name: category.name},
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