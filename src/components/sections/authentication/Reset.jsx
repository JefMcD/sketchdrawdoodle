

import {useState} from "react";
import logo from "@images/logo1_w500.png";

import EmailForm from "@authForms/EmailForm";
import CodeForm  from "@authForms/CodeForm";
import PasswordForm from "@authForms/PasswordForm";

import getCsrfCookie from "@modules/getCsrfCookie.js";


const csrfToken = getCsrfCookie();

export default function Reset({
	userData,
	setUserData,
	setActiveSection,
  server
}){

/*
	Signout needs to set userData to default values not null

*/

  const [step, setStep]= useState("email");
	const [subheader, setSubheader] = useState("What's your email?")
	const [message, setMessage] = useState("We'll send you a secret code")

	console.log(`React.Reset UserData: ${userData.username}`)
	function renderForm(){
		switch (step){
			case "email":
				return <EmailForm server={server} csrfToken={csrfToken} setMessage={setMessage} setSubheader={setSubheader} setStep={setStep}/>;
			case "code":
				return <CodeForm  server={server} csrfToken={csrfToken} setMessage={setMessage} setSubheader={setSubheader} setStep={setStep}/>;
			case "password":
				return <PasswordForm server={server} csrfToken={csrfToken} setActiveSection={setActiveSection} setUserData={setUserData}/>;

			default:
				return <EmailForm server={server} csrfToken={csrfToken} setStep={setStep}/>;
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