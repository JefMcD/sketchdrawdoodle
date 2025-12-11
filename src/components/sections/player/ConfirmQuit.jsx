
// ConfirmQuit.jsx


export default function ConfirmQuit({ 
  setIsDrawing, 
  dispatch 
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const answer = formData.get('confirm-quit'); // "yes" or "no"

    if (answer === 'yes') {
      setIsDrawing(false);
      dispatch({type: "CONFIRM_QUIT"});
    }else{
      dispatch({type: "CANCEL_QUIT"});
    }
  };

  const handleCancel = () => {
    dispatch({type: "CANCEL_QUIT"});
  };

  return (
    <div className="confirm-overlay" onClick={handleCancel}>
      <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
        
        <button className="confirm-close" onClick={handleCancel}>
          ×
        </button>

        <h2 className="confirm-title">Stop Drawing?</h2>
        
        <p className="confirm-message">
          Are you sure you want to stop? You can't resume after quitting.
        </p>

        <form onSubmit={handleSubmit} className="confirm-form">
          <label className="confirm-option">
            <input type="radio" name="confirm-quit" value="yes" defaultChecked />
            <span className="custom-radio"></span>
            Yes, quit
          </label>

          <label className="confirm-option">
            <input type="radio" name="confirm-quit" value="no" />
            <span className="custom-radio"></span>
            No, keep drawing
          </label>

          <div className="confirm-buttons">
            <button type="button" className="confirm-btn cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="confirm-btn confirm">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
