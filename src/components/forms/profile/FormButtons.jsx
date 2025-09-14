

export default function FormButtons({toggleShowForm}){
  return(
    <div className="profile-form-buttons-box">
      <div className="form-btn-wrapper">
          <div onClick={toggleShowForm} className = "form-btn" >Cancel</div>
      </div>
      <div className="form-btn-wrapper">
          <input className="form-btn" type="submit" value="Save" />
      </div>
    </div>
  )
}