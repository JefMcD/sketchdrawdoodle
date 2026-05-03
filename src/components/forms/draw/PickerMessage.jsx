


export default function PickerMessage({
  messageHeader,
  messageBody // Message to dispay in the UI
}){

  return(
    <>
    <div className="subcategory-header writing fs4">{messageHeader}</div>
    <div className="subcategory-picker-box">
          {messageBody}
    </div>
    </>
  )

}