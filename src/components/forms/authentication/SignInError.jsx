


export default function SignInError({formError}){
  return(
    <div className="form-error signin-error">
      {formError && <div>{formError}</div>}
    </div>
  )
}