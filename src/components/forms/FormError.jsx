


export default function FormError({formError}){
  return(
    <div className="form-error">
      {formError && <div>{formError}</div>}
    </div>
  )
}