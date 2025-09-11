

import {useState, useEffect} from "react";

import {tapDjangoCsrf} from "@modules/manageApi";

import logo from "@images/logo1_w500.png";

import EmailForm from "@authForms/EmailForm";
import CodeForm  from "@authForms/CodeForm";
import PasswordForm from "@authForms/PasswordForm";

export default function Reset({
	userData,
	setUserData,
	setActiveSection,
}){

	// When a user signs out the session is flushed and the csrftoken becomes invalid
	// When they sign in they need a new token
	useEffect( ()=> {
		async function ensureCsrf(){
			await tapDjangoCsrf(userData.server) // Shake out a new csrftoken
		};
		ensureCsrf();
	}, []) // Empty dependencies], run once when component mounts

	/*
		Signout needs to set userData to default values not null

	*/
	const [subheader, setSubheader] = useState("What's your email?")
	const [message, setMessage] = useState("We'll send you a secret code")
	const [step, setStep]= useState("email");

	function renderForm(){
		switch (step){
			case "email":
				return <EmailForm server={userData.server} setMessage={setMessage} setSubheader={setSubheader} setStep={setStep}/>;
			case "code":
				return <CodeForm server={userData.server} setMessage={setMessage} setSubheader={setSubheader} setStep={setStep}/>;
			case "password":
				return <PasswordForm server={userData.server} setActiveSection={setActiveSection} setUserData={setUserData}/>;

			default:
				return <EmailForm setMessage={setMessage} setSubheader={setSubheader} setStep={setStep}/>;
		}
	}

	return(
	<>
	<div className="main-panel">
		<div className='main-logo'>
				<img className="logo-img" src = {logo} />
		</div>
		<div className="authenticate-container">
    	<div className="authenticate-inner-wrapper">

				<div className="text-container">
					<div className="form-title large-font">Reset Password</div>
					<div className="subheading fs5">{subheader}</div>
				</div>
					{renderForm()}
				<div className="form-message fs5">{message}</div>	

    	</div>
		</div>
			
	</div>
	</>
	)
}