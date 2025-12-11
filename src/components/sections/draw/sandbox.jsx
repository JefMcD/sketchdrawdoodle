// Draw.jsx

export default function sandbox(){

  return(
    <>
      {/*the section to be rendered when a tab is active or unmounted when inactive */}
      <div className="drill-setup-box">
            <div className="">
                <form onSubmit={handleFormSubmission} className="drill-setup-form">

                    <PicsSection/>

                    <div className="drill-summary-box">
                      {/* SECTION: DRILL SUMMARY */}
  
                          <div className="drill-footer">
                              <div className="drill-list fs3">
                                <p>Category: <span className="emphasis fs5">{formData.categoryChoice.id ? formData.categoryChoice.name : "Random"}</span></p>
                                <p>Subcategory: <span className="emphasis fs5">{formData.subcategoryChoices.length > 0 ? `${formData.subcategoryChoices.length} selected` : "Random"}</span> </p>
                                <p>Time:<span className="emphasis fs5"> 30 min Warmup</span></p>	
                              </div>
                              <div className="drill-inksplat-box"><SplatSubmit /></div>
                            
                            </div>

                    </div> {/* end drill-summary-box */}
                </form>
            </div> {/*form-wrapper */}

        </div> {/* end practice-setup-box */}


    
    </>
  )
}

// PicsSection.jsx
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
            
        />
        {formData.categoryChoice?.id?(
            isLoadingSubcategories ? (
                <Loading />
            ) : (
                <SubCategoryPicker 
                     
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
/*

The Draw.jsx component renders with three blocks that id like to display in a particular way.
WIthin the drill-setup-box there is the CategoryPicker, the SubcategoryPicker and the drill-footer.

Im trying to figure out how to get the CategoryPicker to remain in the same place at the top (within the drill-setup-box), like a header 
and the drill-footer to remain the the same place at the bottom of the drill-setup-box. In the middle is the SubcategoryPicker which dynamically loads content which I want to be scrollable.
Can you explain how I might achieve this?

*/