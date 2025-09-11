
import {useState, useEffect} from "react";
import {tapDjangoCsrf} from "@modules/manageApi";

import JoinForm from "@authForms/JoinForm";
import JoinVerifyForm from "@authForms/JoinVerifyForm";
import sketchDrawDoodleLogo from "@images/logo1_w500.png";

export default function Join({
	userData,
	setUserData,
	setActiveSection
}){

	// When a user signs out the session is flushed and the csrftoken becomes invalid
  // Join is only available when not signed in, so they need a new csrftoken
	const server = userData.server;
	useEffect( ()=> {
		async function ensureCsrf(){
			await tapDjangoCsrf(server) // Shake out a new csrftoken
		};
		ensureCsrf();
	}, []) // Empty dependencies], run once when component mounts
	
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
					  userData={userData}
						setUserData={setUserData}
						setActiveSection={setActiveSection}
					/>				
				:
					<JoinForm 
						userData = {userData}
						setIsJoinOk={setIsJoinOk}
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