
import sketchDrawDoodleLogo from "@images/logo1_w500.png"
import alfieReg from "@images/alfie_ink.webp"

import MainSplat from "@components/svgIcons/MainSplat.jsx"

export default function Welcome({
	userData,
	setUserData,
	setActiveSection,
}){
	function handleLinkClick(e){
		e.stopPropagation();
		setActiveSection("draw-section")
	}

	return(
		<>
		{/* Home Page with welcome message */}
		<div className="main-panel">
			<div className='main-logo'>
					<img className="logo-img" src = {sketchDrawDoodleLogo} />
			</div>

			<div className='text-container'>
					<div className="writing fs5">
							"Doodle, draw and sketch your way to Drawsomeness!
					</div>
			</div>

			<div className='text-container'>
					<div className="subtext fs5">
							Doodle Master Alfie
					</div>
			</div>


			<div className="welcome-hero">
					<img className="hero-img" src = {alfieReg} title="Doodle Master Alfie" />
			</div>

			<div className="text-container">
					<div className="writing fs6">
							Pick from millions of inspiring subjects and epic references. Sci-fi, Horror, fantasy and more!
					</div>
			</div>

			<div className="text-container">
					<div className="emphasis fs7">
							Fun and Free for all!
					</div>
			</div>

			<MainSplat />

			<div onClick={handleLinkClick} className="text-container" id="get-drawing">
					<div className="header large-font text-link" >
							Get Drawing!
					</div>
			</div>

		</div>
		</>
	)
}