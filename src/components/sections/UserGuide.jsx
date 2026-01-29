

import logo from "@images/logo1_w500.png"	


export default function Help({
	setActiveSection
}){
	function handleLinkClick(e){
		//e.stopPropagation();
		setActiveSection("draw-section")
	}


	return(
	<>
		<div className="education-zine">

				{/* <EducationNav /> */}

				{/* SECTION: WHAT IS SKETCHDRAWDOODLE ? */}
				<div className="zine-section-wrapper">

					<section className="zine-section zine-anchor-section" id="start-section">
						<div className="section-background-image">
							{/* <img src={alfiePainting} /> */}
						</div>

						<div className="zine-panel">
								<h2 className="zine-heading">SketchDrawDoodle User Guide</h2>
								<h3 className="writing fs2">Some quick tips to get you started</h3>

								<div className="zine-panel-with-image">
										
										<p className="zine-para writing fs3">
											SketchDrawDoodle is a free, browser-based drawing practice platform designed for art education.
											It provides structured, timed drawing sessions using public-domain reference images, making it
											ideal for classroom teaching, homework assignments, and independent study.
										</p>

										<div className="pic-attachment-box">
											{/* <img src={alfieThink2} /> */}
										</div>
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



		</div>
	</>
	)
}