
export default function FormError({
  message,
  setFormError
}){

  function handleClose(e){
    e.stopPropagation();
    setFormError("")
  }
  return(
    <div className="error-box">
      <div className="form-message">
        {message && <div>{message}</div>}
      </div>
      <div onClick={handleClose} className="form-message-close-box">
        Ok
      </div>
    </div>
  )
}