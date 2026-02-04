
import {useState, useEffect} from "react";


import DevBlogNav from "@panels/DevBlogNav";
import alfieThink1 from "@images/education/alfie-think1.jpg";


export default function Help({
	setActiveSection
}){

	const [isHamOpen, setIsHamOpen] = useState(false)

	function handleLinkClick(e, section){
		//e.stopPropagation();
		setActiveSection(section)
	}


	return(
	<>
		<div className={`devblog-zine ${isHamOpen && 'shroud-overlay'}`}>

				<DevBlogNav
					isHamOpen={isHamOpen}
					setIsHamOpen = {setIsHamOpen} 
				/>

				{/* SECTION: WHAT IS SKETCHDRAWDOODLE ? */}
				<div className="zine-section-wrapper">

					<section className="zine-section zine-anchor-section" id="start-section">
						<div className="section-background-image">
							{/* <img src={alfiePainting} /> */}
						</div>

						<div className="zine-panel">
								<h2 className="zine-heading">Backend</h2>
								<h3 className="writing fs2">Django database with REST API</h3>

								<div className="zine-panel-with-image">
										
										<p className="zine-para writing fs3">
											SketchDrawDoodle is a free, browser-based drawing practice platform designed for art education.
											It provides structured, timed drawing sessions using public-domain reference images, making it
											ideal for classroom teaching, homework assignments, and independent study.
										</p>

										{/* <div className="pic-attachment-box">
											 <img src={alfieThink2} /> 
										</div> */}
								</div>
								
						</div>

						{/* FEATURE: TL:DR */}
						<div className="feature-flex">
								<div className="zine-feature tldr">
										<div className="zine-panel">
												<h3 className="zine-heading lt-turq">TL:DR?</h3>

												<ul className="bullet-list light-list fs3">
													<li>Free</li>
													<li>Requires no installation</li>
													<li>Works on all devices</li>
													<li>Encourages self learning</li>
													<li>Supports structured practice</li>
													<li>No copyright worries</li>
													<li>Nurtures Creativity</li>

												</ul>

												<div className="text-container center">
														<div className="emphasis lt-turq fs5">
																Free for everyone. Built for artists.
														</div>
												</div>

												<div onClick={handleLinkClick} className="zine-cta text-container center" id="get-drawing">
														<div className="cta-button writing fs4 text-link" >
																Try It!
														</div>
												</div>
										</div>
								</div>
						</div>

						<div className="text-container center">
							<div className="emphasis fs5">
									Great for students of all levels!
							</div>
					</div>

					</section>
				</div>
		<div className="main-panel">


			<div className="text-container">
				<div className="writing fs6">Config & Setup</div>
			</div>

			<div className="text-container">
				<div className="writing fs6">Database Design</div>
			</div>

			<div className="text-container">
				<div className="writing fs6">Database Implemention</div>
			</div>
      
      <div className="text-container">
				<div className="writing fs6">Client Server REST API</div>
			</div>
      
      <div className="text-container">
				<div className="writing fs6">External API Interfaces</div>
			</div>
      
      <div className="text-container">
				<div className="writing fs6">Data Modeling</div>
			</div>

      <div className="text-container">
				<div className="writing fs6">UI Design</div>
			</div>
      
      <div className="text-container">
				<div className="writing fs6">Icons & Logo's</div>
			</div>
      
      <div className="text-container">
				<div className="writing fs6">Alfie & Graphic Art</div>
			</div>

      <div className="text-container">
				<div className="writing fs6">React Client</div>
			</div>

      <div className="text-container">
				<div className="writing fs6">Player State Machine</div>
			</div>
		
      <div className="text-container">
				<div className="writing fs6">Hosting and Domain Registratiom</div>
			</div>

      <div className="text-container">
				<div className="writing fs6">Production Deployment</div>
			</div>

      <div className="text-container">
				<div className="writing fs6">Rolling Cache</div>
			</div>

      <div className="text-container">
				<div className="writing fs6">SEO </div>
			</div>

      <div className="text-container">
				<div className="writing fs6">Marketing & Promotion</div>
			</div>

      <div className="text-container">
				<div className="writing fs6">Future Expansion</div>
			</div>

      <div className="text-container">
				<div className="writing fs6">User Registration & Pro Features</div>
			</div>

      <div className="text-container">
				<div className="writing fs6">Custom Image Sets</div>
			</div>

      <div className="text-container">
				<div className="writing fs6">Extended Categories and Subcategories</div>
			</div>

      <div className="text-container">
				<div className="writing fs6">Node Map Selection Feature</div>
			</div>

      <div className="text-container">
				<div className="writing fs6">ArtMutts Magazine</div>
			</div>

      <div className="text-container">
				<div className="writing fs6">Merchandising</div>
			</div>

    </div>



		</div>
	</>
	)
}