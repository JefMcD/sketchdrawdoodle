
import {useState, useEffect} from "react";


import DevBlogNav from "@panels/DevBlogNav";
import alfieThink1 from "@images/education/alfie-think1.jpg";
import sddERD    from "/static/doodle_app/images/devblog/query-engine-V2-erd-500.jpg";
import sddSchema from "/static/doodle_app/images/devblog/SDD-schema-V2.jpg";
import doodleDB  from "/static/doodle_app/images/devblog/doodle_db.jpg";
import seedDB    from "/static/doodle_app/images/devblog/seed_db_processes.jpg";
import linux    from "/static/doodle_app/images/devblog/penguin.jpg";
import pingu    from "/static/doodle_app/images/devblog/pingu.jpg";



export default function Help({
	setActiveSection
}){

	const [isHamOpen, setIsHamOpen] = useState(false)

	function handleLinkClick(e, section){
		e.stopPropagation();
		setActiveSection(section)
	}

	function disable_ham(e){
		e.stopPropagation();
		setIsHamOpen(false);
	}

	return(
	<>



		<div className="devblog-zine" >
			
			{/** The shroud to disable the page when the Hamburger is open */}
			<div className={`${isHamOpen && "shroud-overlay"}`} onClick={disable_ham}></div>

				<DevBlogNav
					isHamOpen={isHamOpen}
					setIsHamOpen = {setIsHamOpen} 
				/>

				{/* SECTION: WHAT IS SKETCHDRAWDOODLE ? */}
				<div className="zine-section-wrapper">


						{/** Config & Setup */}
						<section className="zine-section zine-anchor-section straight-up" id="backend-section">
							<div className="section-background-image">
								{/* <img src={alfiePainting} /> */}
							</div>
							<div className="zine-panel">
									<h2 className="zine-heading">Backend</h2>
							</div>

							<div className="zine-panel">
									<h2>Dev environment</h2>
									<div className="zine-section-para writing fs3">
										The development environment is configured as a reproducible system: 
										one that can be rebuilt from scratch, seeded with data, and trusted to behave 
										consistently across machines and deployments.
									</div>
							</div>

							<div className="zine-panel">
							
									<h2>Linux-first</h2>
									<div className="zine-section-para writing fs3">
										Development is carried out on Ubuntu 22.04, providing a stable, well-supported Linux environment that closely resembles 
										typical server deployments. This reduces the gap between local development and production, particularly when working with 
										Python, system libraries, and environment. 
									</div>
									
									<div className="zine-image-wrap-box center">
										<div className="zine-image-wrap skew-right">
											<img src={pingu} alt="Linux or WIndows" />
										</div>
									</div>

									<div className="zine-section-para writing fs3">	
										A Linux-first workflow is stable, low fuss and simplifies scripting, automation, and with the possibility of 
										integration with containerised or cloud-based services later on.
									</div>
								</div>

							<div className="zine-panel">

									<h2>Spinning Up React</h2>
									<div className="zine-section-para writing fs3">
										The frontend is scaffolded using React/Javascript with Vite, chosen for its fast startup times and minimal configuration. 
										During early development, the frontend is treated as a consumer of a future API rather than being tightly coupled to 
										backend implementation details. 
										
										This separation allows UI and interaction patterns to evolve independently while API endpoints are implemented to meet its needs.

									</div>
							</div>

							<div className="zine-panel">
									<h2>Seed data</h2>
									<div className="zine-section-para writing fs3">
										SketchDrawDoodle uses structured seed data defined in JSON files. 
										These files are designed to populate the database with predefined static data such as defining external sources and picture categories, subcategories and practice drills. 
										In addition it can also be used in conjuction with the doode_sb extension for testing specific data that 
										reflect real usage scenarios. 
									</div>
									<div className="zine-image-wrap-box center">
										<div className="zine-image-wrap skew-left">
											<img src={doodleDB} alt="sketch draw doodle Schema" />
										</div>
									</div>

									<div className="zine-section-para writing fs3">
										Treating seed data as part of the codebase makes it possible to reset the database at 
										any point, reproduce bugs reliably, and test new features against meaningful data instead 
										of empty tables.
									</div>
								
							</div>

							<div className="zine-panel">

									<h2>
										Warming the cache
									</h2>
									<div className="zine-section-para writing fs3">
										Certain backend operations—such as requesting picture sets benefit 
										from caching to reduce repeated computation and producing a faster more responsive app. 
										During development, the environment includes cache-warming 
										steps that populate frequently accessed data ahead of time. This helps surface performance issues early 
										and ensures that development behaviour more closely matches real-world usage patterns.
									</div>
							</div>

							<div className="zine-panel">
									<h2>
											Git Version Control
									</h2>
									<div className="zine-section-para writing fs3">
										Git and GitHub are used not only for version control, but as an extension of the development environment itself. 
										Database schema changes, seed data, and configuration decisions are committed alongside application code, making architectural evolution 
										visible and traceable over time. This reinforces the idea that backend design decisions deserve the same level of scrutiny as 
										application logic.
									</div>
							</div>

							<div className="zine-panel">

									<h2>
										Environment as a foundation
										</h2>
									<div className="zine-section-para writing fs3">
										By investing early in a robust development environment, SketchDrawDoodle avoids many of the pitfalls that emerge when prototypes 
										evolve into long-lived projects. The result is an environment that supports experimentation without sacrificing correctness — 
										one that can be torn down, rebuilt, and extended as the project grows.
									</div> 
							</div>


						</section>




						<section className="zine-section zine-anchor-section skew-left" id="database-section">
							<div className="section-background-image">
								{/* <img src={alfiePainting} /> */}
							</div>

							<div className="zine-panel">
									<h2 className="zine-heading">Database</h2>
									<h3 className="writing fs2">Django database design and implementation</h3>
							</div>

							
									<div className="zine-panel">
											
											<div className="zine-section-para writing fs3">
													SketchDrawDoodle is built on a relational database implemented in Django, using its ORM as the 
													primary interface between application logic and data storage. While Django abstracts away much of the 
													underlying SQL, the database itself was designed explicitly rather than emerging accidentally from models 
													added over time.
											</div>

											<div className="zine-image-wrap-box center">
												<div className="zine-image-wrap skew-right">
													<img src={sddERD} alt="sketch draw doodle erd" />
												</div>
											</div>

											<div className="zine-section-para writing fs3">
													Before writing a single line of code, the schema was modelled using MySQL Workbench and Draw.io to 
													produce entity relationship diagrams (ERDs) and a Logical Model. This process helped visualise not only how data would be 
													stored, but app functionality and how users would move through the system: creating sessions, choosing pictures, selecting a
													a practice drill, then requesting and caching image sets. In addition to this, also leaving the door open to eventually extending the platform with features like
													statistics, favourites, saved images sets, user profiles, social media connectivity and image analysis tools.
											</div>

											<div className="zine-image-wrap-box center">
												<div className="zine-image-wrap skew-left">
													<img src={sddSchema} alt="sketch draw doodle Schema" />
												</div>
											</div>

											<div className="zine-section-para writing fs3">
													The goal was to design a schema that supports the app’s core functionality while remaining 
													flexible enough to grow without major refactors — a database that forms a foundation and the backbone of 
													the App and the development process.

											</div>

											{/* <div className="pic-attachment-box">
												<img src={alfieThink2} /> 
											</div> */}
									</div>
									
						</section>

{/**
						<section className="zine-section zine-anchor-section straight-up alt-turq" id="REST-API-section">


							<div className="zine-panel">
									<h2 className="zine-heading alt">Django API</h2>
									<h3 className="writing alt fs2">Client Server API</h3>
							</div>

							
									<div className="zine-panel">

									</div>
							</section>





						<section className="zine-section zine-anchor-section skew-right" id="interfaces-section">


							<div className="zine-panel">
									<h2 className="zine-heading">External Interfaces</h2>
									<h3 className="writing fs2">Retrieving Data from External Systems</h3>
							</div>

							
									<div className="zine-panel">

									</div>
							</section>



						<section className="zine-section zine-anchor-section skew-left" id="data-modelling-section">


							<div className="zine-panel">
									<h2 className="zine-heading">Data Modelling</h2>
									<h3 className="writing fs2">Researching API's and modelling Searches</h3>
							</div>

							
									<div className="zine-panel">

									</div>
							</section>



						<section className="zine-section zine-anchor-section skew-left" id="UI-design-section">


							<div className="zine-panel">
									<h2 className="zine-heading">UI Design</h2>
									<h3 className="writing fs2">Designing the User Interface</h3>
							</div>

							
									<div className="zine-panel">

									</div>
							</section>



						<section className="zine-section zine-anchor-section straight-up" id="icons-section">


							<div className="zine-panel">
									<h2 className="zine-heading">Icons & Logos</h2>
									<h3 className="writing fs2">Designing Icons & Logos</h3>
							</div>

							
									<div className="zine-panel">

									</div>
							</section>



						<section className="zine-section zine-anchor-section skew-right" id="graphics-section">


							<div className="zine-panel">
									<h2 className="zine-heading">Graphic Art</h2>
									<h3 className="writing fs2">Creating the Sites Original Artwork</h3>
							</div>

							
									<div className="zine-panel">

									</div>
							</section>



						<section className="zine-section zine-anchor-section straight-up" id="client-section">


							<div className="zine-panel">
									<h2 className="zine-heading">React Client</h2>
									<h3 className="writing fs2">Developing the Client with React</h3>
							</div>

							
									<div className="zine-panel">

									</div>
							</section>



						<section className="zine-section zine-anchor-section straight-up" id="state-machine-section">
	

							<div className="zine-panel">
									<h2 className="zine-heading">State Machine</h2>
									<h3 className="writing fs2">Implementing the Practice Drill Player</h3>
							</div>

							
									<div className="zine-panel">

									</div>
							</section>



						<section className="zine-section zine-anchor-section skew-left" id="deployment-section">


							<div className="zine-panel">
									<h2 className="zine-heading">Live Deployment</h2>
									<h3 className="writing fs2">Deploying the SIte & CD/CI</h3>
							</div>

							
									<div className="zine-panel">

									</div>
							</section>



						<section className="zine-section zine-anchor-section skew-right" id="cache-section">


							<div className="zine-panel">
									<h2 className="zine-heading">Performance</h2>
									<h3 className="writing fs2">Caching requests and Performance Tweaks</h3>
							</div>

							
									<div className="zine-panel">

									</div>
							</section>



						<section className="zine-section zine-anchor-section skew-left" id="seo-section">


							<div className="zine-panel">
									<h2 className="zine-heading">SEO</h2>
									<h3 className="writing fs2">Search Engine Optimization with an SPA</h3>
							</div>

							
									<div className="zine-panel">

									</div>
							</section>


 
						<section className="zine-section zine-anchor-section straight-up" id="future-section">


							<div className="zine-panel">
									<h2 className="zine-heading">Future Plans</h2>
									<h3 className="writing fs2">Whats coming up</h3>
							</div>

							
									<div className="zine-panel">

									</div>
							</section>
 */}





				</div> {/** End sine-section-wrapper */}

		</div>


	
	</>
	)
}