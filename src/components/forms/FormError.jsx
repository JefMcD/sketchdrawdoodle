
export default function FormError({
  formError,
  setFormError
}){

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