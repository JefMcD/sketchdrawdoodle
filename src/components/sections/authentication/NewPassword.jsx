
import NewPasswordForm from "@authForms/NewPasswordForm"

export default function NewPassword({
	userData,
	setUserData,
	setActiveSection,
}){

	return(
		<div className="main-panel">
			<div className="authenticate-container">
    		<div className="authenticate-inner-wrapper">

					<div className="form-title">
							Choose A New Password
					</div>

					<NewPasswordForm 
						userData={userData} 
						setUserData={setUserData}
						setActiveSection={setActiveSection}
					/>

					<div className="form-message">
							Finally!
					</div>
					<div className="form-message">
							Choose a New Password
					</div>
    		</div>
			</div>
		</div>
	)
}