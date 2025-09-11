

import logo from "@images/logo1_w500.png"	


export default function Help({
	setActiveSection
}){

	// state is activeSection

	return(
	<>

		<div className="main-panel">
			<div className="main-logo">
					<img src={logo} />
			</div>

			<div className="text-container">
				<div className="writing fs6">Help Section</div>
			</div>

			<div className="text-container">
				<div className="emphasis fs7">I forgot my Password</div>
				<div className="writing fs5">No worries,</div>
				<span className="auth-link" id="reset-pass-link" onClick={()=>setActiveSection("reset-section")}>choose a new one</span>
			</div>

			<div className="text-container">
				<div className="emphasis fs6">My Login isnt working!</div>
				<div className="writing fs5">Remember to sign in with your Username not your email</div>
				<div className="writing fs5">Username and Password are CAsE SenSitiVe!</div>
			</div>

			<div className="text-container">
				<div className="emphasis fs6">Contact Form!</div>
			</div>


		</div>
	</>
	)
}