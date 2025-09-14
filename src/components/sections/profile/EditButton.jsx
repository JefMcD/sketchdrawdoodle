

export default function EditButton({
  toggleShowForm
}){
  return(
    <div className="toggle-form-btn">
      <div className="curtain-btn profile-button">
          <div className="curtain-btn-hover-state"></div>
          <span  onClick={toggleShowForm} >Edit</span>
      </div>
    </div>
  )
}