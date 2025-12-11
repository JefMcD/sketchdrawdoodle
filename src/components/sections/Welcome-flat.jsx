
import SocialMediaLinks from "@components/SocialMediaLinks";
import sketchDrawDoodleLogo from "@images/logo1_w500.png"
import alfieReg from "@images/alfie_ink.webp"

import MainSplat from "@components/svgIcons/MainSplat.jsx"


export default function Welcome({
	setActiveSection,
}){
	function handleLinkClick(e){
		//e.stopPropagation();
		setActiveSection("draw-section")
	}

	return(

		<div className="main-panel">
			<div className='main-logo'>
					<img className="logo-img" src = {sketchDrawDoodleLogo} />
			</div>

			<div className='text-container center'>
					<div className="writing fs2">
							"Doodle your way to Drawsomeness!
					</div>
			</div>

			<div className='text-container center'>
					<div className="subtext fs3">
							Doodle Master Alfie
					</div>
			</div>


			<div className="welcome-hero">
					<img className="hero-img" src = {alfieReg} title="Doodle Master Alfie" />
			</div>

			<div className="text-container center">
					<div className="writing fs5">
							Pick from millions of inspiring subjects and epic references. Sci-fi, Horror, fantasy and more!
					</div>
			</div>

			<div className="text-container center">
					<div className="emphasis fs5">
							Fun and Free for all!
					</div>
			</div>

			<MainSplat setActiveSection={setActiveSection}/>

			<div onClick={handleLinkClick} className="text-container center" id="get-drawing">
					<div className="header fs8 text-link" >
							Get Drawing!
					</div>
			</div>

		</div> // End main-panel

	)
}