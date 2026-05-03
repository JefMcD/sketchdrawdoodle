
import {useState, useEffect} from "react";

// components
import CategoryPicker    from "@forms/draw/CategoryPicker";
import SubCategoryPicker from "@forms/draw/SubcategoryPicker";
import SubzonePicker     from "@forms/draw/SubzonePicker";
import PickerMessage     from "@forms/draw/PickerMessage";



export default function PicsSection({
    formData,
    setFormData,
    categoryTree,
    categories,
    subcategories,
    setSubcategories,
    subzones,
    setSubzones,

}
){


    function showMessage(){

        let messageHeader = "";
        let messageBody = "";

        if(formData.categoryChoice?.id){
            messageHeader = formData.categoryChoice.name;
            messageBody = "Pick a subcategory"
        }else{
            messageHeader = ""
            messageBody = "Pick a Category"
        };

        if(formData.subcategoryChoice?.id){
            if(subzones.length > 0){
                messageHeader = formData.subcategoryChoice.name;
                messageBody = "Pick a subzone"
            }else{
                messageHeader = "";
                messageBody = "Click Go! to start"
            }
        }

        if(formData.subzoneChoice?.id){
            messageHeader = formData.subzoneChoice.name;
            messageBody = "Click Go! to start"
        }

        return(
            <PickerMessage
                messageHeader={messageHeader}
                messageBody={messageBody}
            />
        )
    }
  
    return(
    <section className="pics-setup-section">
        <div className="pictures-selection-title writing fs4"> Categories</div>
        {/**Show Category Picker */}
        <CategoryPicker
            formData={formData} 
            setFormData={setFormData} 
            categoryTree={categoryTree} 
            categories={categories}
            setSubcategories={setSubcategories} 
            setSubzones={setSubzones}
        />

        {/**  if there exists a category choice show corresponding subcategories */}
        {formData.categoryChoice?.id && ( 
            <SubCategoryPicker 
                formData={formData} 
                setFormData={setFormData} 
                categoryTree={categoryTree}
                subcategories={subcategories}
                setSubzones={setSubzones} 
            />
        )}

        {/* Show SubzonePicker if subcategory is chosen  */}
        {formData.subcategoryChoice?.id && (
            <SubzonePicker 
                formData={formData} 
                setFormData={setFormData} 
                subzones={subzones}
            />
        )}

        {/* Show instructional message to user */}
        {showMessage()}



    </section> 
  )
}