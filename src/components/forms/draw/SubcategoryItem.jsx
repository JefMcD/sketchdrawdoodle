import {useRef, useState, useEffect} from "react";

export default function SubcategoryItem({
  userData,
  formData,    // contains formData.subcategoryChoices[{id1, name1}, {id2, name2} ... etc]
  setFormData, // for setting SubCategoryChoices[]
  setFormError,
  subcategory,  // The selectable subcategory item on screen {id, name, description, image_url}
  index,
}){

  // if a user is Pro they can have up to three subcategory choices
  // if a user is Guest they can have one
  const isPro = userData.is_authenticated
  const max_subcategories = userData.max_subcategories
  console.log(`max_subcategories = ${max_subcategories}`)

  let isChecked = false;
  // Determine if the subcategory is checked
  // iterate over the objects in the subcategoryChoices array
  for(let choice of formData.subcategoryChoices ){
    // test if this subcategory is already checked
    if(subcategory.id === choice.id){
      isChecked = true;
      break;
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  useEffect( () => {
    const timer = setTimeout(()=>{
      setIsVisible(true);
    }, index*80); // 80 ms stagger between Items being displayed
    return ()=> clearTimeout(timer);
  }, [index])


  function handleSubcategorySelect(e){
    e.stopPropagation()

    const {checked} = e.target; // get the value of checked for the selected subcategory item
    
    // make shallow copy of prev subcategoryChoices
    let updatedChoices = formData.subcategoryChoices
    
    // In full production mode a Guest can CHoose 1 subcategory
    // A Pro user can choose up to 3 subcategories
    const isMaxSelected = formData.subcategoryChoices.length === max_subcategories ? true : false
    
      if (checked){ // subcategory changed from unchecked to checked 
        if (isMaxSelected){
          setFormError("Maximum subcategories selected. Deselect one and choose another")
        }else{

         // add this subcategory if not already in array
          if(!updatedChoices.some((choice)=> choice.id===subcategory.id)){
            updatedChoices.push({
              id:subcategory.id,
              name:subcategory.name
            });
          }  
        }
      }else{ // subcategory went from checked to unchecked
        // remove it if unchecked
        updatedChoices = updatedChoices.filter((choice)=>choice.id!==subcategory.id);
      };


    setFormData( (prev)=> ({
      ...prev,
      subcategoryChoices:updatedChoices
    }))

    newSubzones = getSubzoneOptions()
    setSubzones(newSubzones)
  }


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

  return(

    <div className={`subcategory-item ${isVisible ? 'fade-in':""}`}>

      <div className="subcategory-checkbox">
        <input 
          type="checkbox" 
          id={`subcategory-${subcategory.id}`}
          name="subcategory"
          value={subcategory.id}
          checked={isChecked}
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