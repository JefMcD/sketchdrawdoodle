
export default function FormError({
  formError,
  setFormError
}){

  if (formError){
    console.log(`form error = ${formError}`)
  }else{
    console.log(`No formError ${formError}`)
  }
  function handleClose(e){
    e.stopPropagation();
    setFormError("")
  }
  return(
    <div className="error-box">
      <div className="form-message">
        {formError && <div>{formError}</div>}
      </div>
      <div onClick={handleClose} className="form-message-close-box">
        Ok
      </div>
    </div>
  )
}