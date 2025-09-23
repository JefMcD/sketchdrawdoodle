
import {useState} from "react";

// components
import CategoryScroller  from "@forms/draw/CategoryScroller";
import SubCategoryPicker from "@forms/draw/SubcategoryPicker"

export default function PicsSection(
    formData,
    setFormData
){

    return(
    <section className="pics-setup-section">
        <div className="form-title"> Choose some pictures</div>
        <CategoryScroller />
        <SubCategoryPicker />
    </section> 
  )
}