import {useRef, useState, useEffect} from "react";

export default function SubzoneItem({
  index,        // The array index the item has in the Subcategories list. Used for controlling the timing of the item being diaplsye4d
  formData,    // contains formData.subzoneChoices[{id1, name1}, {id2, name2} ... etc]
  setFormData, // for setting subzoneChoices[]
  subzone,     // The selectable subzone item {id, name, description, image_url}
}){

  // const isPro = userData.is_authenticated;
  // const maxSelections = 1; // limit selections to One Category/subzone/Subzone

  // Determine if the selected subzone isCurrentChoice
  let isCurrentChoice = false;
  // if the subzoneChoice exist,
  if(formData.subzoneChoice.id === subzone.id){
    isCurrentChoice = true;
    const currentSubzoneChoice = formData.subzoneChoice;
  }

  // reveal subzones one at a time. Broooop!
  const [isVisible, setIsVisible] = useState(false);
  useEffect( () => {
    const timer = setTimeout(()=>{
      setIsVisible(true);
    }, index*80); // 80 ms stagger between Items being displayed
    return ()=> clearTimeout(timer);
  }, [index])


  // Clear subzone selection and select new pick
  function handleSubzoneSelect(e){
    e.stopPropagation();
  
    const {checked} = e.target; // checked==true means selected subzone item changed from unselected to selected and vice-versa    
    let newSubzoneChoice = {}; // initialise empty object for subzoneChoice
    
    // Handle checking and unchecking a subzone, ensure only one is active.
    if (checked){ // subzone changed from unchecked to checked 
      // Update subzone choice
      newSubzoneChoice = 
        {
          id: subzone.id,
          name: subzone.name
        }; 
    }else{ // subzone went from checked to unchecked
        newSubzoneChoice = {id: null, name:""};  // clear selection
    };

    // add the new subzone choice to the updataedChoices list
    console.log(`DEBUG: subzone Choice is ${newSubzoneChoice.name}`);

    // add new choice to formData
    setFormData( (prev)=> ({
      ...prev,
      subzoneChoice:newSubzoneChoice
    }));



  }



  return(

    <div className={`subcategory-item ${isVisible ? 'fade-in':""}`}>

      <div className="subcategory-checkbox">
        <input 
          type="checkbox" 
          id={`subzone-${subzone.id}`}
          name="subzone"
          value={subzone.id}
          checked={isCurrentChoice}
          onChange={handleSubzoneSelect}
        />
        <label htmlFor={`subzone-${subzone.id}`} className="subcategory-label">
          <img src={subzone.image_url} alt={subzone.name} />
        </label>
      </div>

      <div className="subcategory-name">{subzone.name}</div>
      

    </div>

  )
}
