
import {useState} from "react"

import JoinForm from "@authForms/JoinForm"
import JoinVerifyForm from "@authForms/JoinVerifyForm"
import sketchDrawDoodleLogo from "@images/logo1_w500.png"



export default function Join({
	setUserData,
	setActiveSection,
	server
}){
	
	// isJoinOk - has the joinForm been processed and API response is Ok?
	const [isJoinOk, setIsJoinOk] = useState(false);
	

	return(
	<>
	<div className="main-panel">
		<div className='main-logo'>
				<img   className="logo-img" src = {sketchDrawDoodleLogo} />
		</div>

		<div className="authenticate-container">
			<div className="authenticate-inner-wrapper">
				{isJoinOk ?
					<JoinVerifyForm 
						setUserData={setUserData}
						setActiveSection={setActiveSection}
						setIsJoinOk={setIsJoinOk}
						server={server}
					/>				
				:
					<JoinForm 
						setActiveSection={setActiveSection}
						setIsJoinOk={setIsJoinOk}
						server={server}
					/>
				}
				<div className="authenticate-redirect">     
						Already a Member? <span className="auth-link" onClick={()=>setActiveSection("signin-section")}> Sign-In</span>
				</div>

			</div>
		</div>
	</div>

	</>
	)
}