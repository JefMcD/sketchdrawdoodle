
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

					{/* HEADER / TITLE */}
					<div className="zine-title">
						<h1>Sketch Draw Doodle</h1>
					</div>

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
      


					<div className="zine-splash-container">
						<div className="zine-image-wrap skew-left">
							<img src={alfieReg} alt="Alfie Ink Splash" />
						</div>
					</div>




			{/* SECTION: WHAT */}
			<div className="zine-section-wrapper">
					<section className="zine-section alt">
						<div className="zine-panel">
							<h3 className="zine-heading">WHAT?</h3>

							<p className="writing fs3">
								Guided drawing practice powered by millions of inspiring reference pictures.
								Sketch creatures, people, machines, landscapes, sci-fi worlds, fantasy monsters, 
								wherever your imagination can go SketchDrawDoodle is there for you — all in fast, focused sessions.
							</p>

							<div className="text-container center">
									<div className="emphasis fs5">
											Free for everyone. Built for artists.
									</div>
							</div>

							<div onClick={handleLinkClick} className="zine-cta text-container center" id="get-drawing">
									<div className="cta-button fs4 text-link" >
											Get Drawing!
									</div>
							</div>
						</div>
					</section>

					<MainSplat setActiveSection={setActiveSection}/>

					<section className="zine-section">
						<div className="zine-panel">
							<h3 className="zine-heading">HOW???</h3>

							<p className="writing fs3">
								SketchDrawDoodle pulls reference images from public-domain archives and libraries, 
								unlocking a massive range of inspiring subjects.

								Choose from categories such as Animals, Places, People, Space, Technology, Engineering 
								and let Sketchdrawdoodle scour the web for epic pictures, while you focus on drawing!
							</p>

						</div>
					</section>


			</div>

		</div> // End main-panel

	)
}