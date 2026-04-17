
import {useState} from "react";

// components
import CategoryPicker    from "@forms/draw/CategoryPicker";
import SubCategoryPicker from "@forms/draw/SubcategoryPicker";
import Spinner from "@components/Spinner";

function Loading(){
    return(
        <div className="waiting-box writing fs5"> 
            <Spinner />
        </div>
    )
}

export default function PicsSection({
    userData,
    formData,
    setFormData,
    categories,
    subcategories,
    subzones,
    setSubcategories,
    setSubzones,
    setFormError,
}
){

    
    // When a category is selected disolays the loading spinner in the subcategories section
    const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(false);

    const [isLoadingSubzones, setIsLoadingSubzones] = useState(false);

    
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
                    userData={userData}
                    formData={formData} 
                    setFormData={setFormData} 
                    setFormError={setFormError}
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