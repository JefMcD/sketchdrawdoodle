
import {useState} from "react";

// components
import CategoryPicker    from "@forms/draw/CategoryPicker";
import SubCategoryPicker from "@forms/draw/SubcategoryPicker";
import Spinner from "@components/Spinner";

function Loading(){
    console.log("waiting")
    return(
        <div className="waiting-box writing fs5"> 
            <Spinner />
        </div>
    )
}

export default function PicsSection({
    formData,
    setFormData,
    categories,
    subcategories,
    setSubcategories,
    setFormError
}
){
    const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(false);
    return(
    <section className="pics-setup-section">
        <div className="pictures-selection-title writing fs4"> Categories</div>
        <CategoryPicker
            formData={formData} 
            setFormData={setFormData} 
            categories={categories} 
            setSubcategories={setSubcategories} 
            setIsLoadingSubcategories={setIsLoadingSubcategories}
            setFormError={setFormError}
        />
        {formData.categoryChoice?.id?(
            isLoadingSubcategories ? (
                <Loading />
            ) : (
                <SubCategoryPicker 
                    formData={formData} 
                    setFormData={setFormData} 
                    subcategories={subcategories} 
                />
            )
        ):(
            <div className="waiting-box writing fs4">
                Choose a Category!
            </div>
        )}
    </section> 
  )
}