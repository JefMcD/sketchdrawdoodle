
import VerifyForm from "@authForms/VerifyForm"

export default function Verify({
	userData,
	setUserData,
	setActiveSection,
}){

	return(
		<div className="main-panel">
			<div className="authenticate-container">
    		<div className="authenticate-inner-wrapper">

					<div className="form-title">
							Enter Verification Code
					</div>

					<VerifyForm 
						userData={userData} 
						setUserData={setUserData}
						setActiveSection={setActiveSection}
					/>

					<div className="form-message">
							An email with a secret code was sent to the email you provided.
					</div>
					<div className="form-message">
							Enter it to confirm!
					</div>
    		</div>
			</div>
		</div>
	)
}