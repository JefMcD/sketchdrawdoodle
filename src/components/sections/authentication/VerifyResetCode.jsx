
import VerifyResetForm from "@authForms/VerifyResetForm"

export default function VerifyResetCode({
	userData,
	setUserData,
	setActiveSection,
}){

	return(
		<div className="main-panel">
			<div className="authenticate-container">
    		<div className="authenticate-inner-wrapper">

					<div className="form-title">
							Verify reset Code
					</div>

					<VerifyResetForm 
						userData={userData} 
						setUserData={setUserData}
						setActiveSection={setActiveSection}
					/>

					<div className="form-message">
							An email with a secret code was sent to the email you provided.
					</div>
					<div className="form-message">
							Enter it above to Choose a New Password
					</div>
    		</div>
			</div>
		</div>
	)
}