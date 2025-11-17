
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



			{/* 
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
			</div> */}


      {/* HEADER / TITLE */}
      <div className="zine-title">
        <h1 className="fs8">Sketch•Draw•Doodle</h1>
				<div className='text-container center'>
						<div className="writing fs2">
								"Sketch your way to Drawsomeness!
						</div>
				</div>

				<div className='text-container center'>
						<div className="subtext fs3">
								Doodle Master Alfie
						</div>
				</div>
      </div>

      {/* INTRO */}


			<div className="zine-splash-container">
				<div className="zine-image-wrap skew-left">
					<img src={alfieReg} alt="Alfie Ink Splash" />
				</div>

			</div>
			<MainSplat setActiveSection={setActiveSection}/>




			{/* SECTION: WHAT */}
			<div className="zine-section-wrapper">
				<section className="zine-section alt">
					<div className="zine-panel">
						<h3 className="zine-heading">WHAT?</h3>

						<p className="writing fs4">
							Guided drawing practice drills that let you pick from millions of inspiring subjects and epic picture references. Sci-fi, Horror, fantasy and more!

						</p>
						<div className="text-container center">
								<div className="emphasis fs5">
										Fun and Free for all!
								</div>
						</div>

						<div onClick={handleLinkClick} className="zine-cta text-container center" id="get-drawing">
								<div className="cta-button fs5 text-link" >
										Get Drawing!
								</div>
						</div>
					</div>
				</section>
			</div>

		</div> // End main-panel

	)
}