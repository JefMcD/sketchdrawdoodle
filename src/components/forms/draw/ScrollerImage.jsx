import getServer from "@modules/getServer.js";

/*******************************************************************
 * 
 * Component ScrollerImage.jsx
 * 
 * Receives the category object for the category as per the database
 * category = {id, name, description, image_url}
 * 
 * OnCLick fetches the corrosponding subcategories and 
 * sets state for re-render
 * 
 *******************************************************************/
// The clickable image in the category scroller
export default function ScrollerImage({ 
  formData,    // formData.categoryChoice{id, name}
  setFormData, // set state
  category,    // database instance of category {id, name, description, imageUrl}
  setSubcategories, // subcategories for the chosen category
}) {

  async function handleCategorySelect(e){
    e.stopPropagation()

    const server = getServer();
    const getSubcategories = `${server}get_subcategory_options/${category.id}`

    // fetch subcategories for selected category or get from cache
    const response = await fetch(getSubcategories,{
      method: "GET",
      cache: "no-store"
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
  
  return (
    <div className="scroller-image">
      <input
        type="radio"
        id={`category-${category.id}`}
        name="category"
        value={category.id}
        checked={formData.categoryChoice.id === category.id}
        onChange={handleCategorySelect}
        className="sr-only" // screen-reader only. hide visually but keep accessible
      />
      <label htmlFor={`category-${category.id}`} className="image-label">
        <img src={category.image_url} alt={category.name} />
      </label>
    </div>
  );
};
