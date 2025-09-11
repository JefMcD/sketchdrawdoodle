


import SocialMediaLinks from "@components/SocialMediaLinks";
import jeferzCoffee from "/static/doodle_app/images/pics/will-code-for-coffee.jpg";
import jeferzForest from "/static/doodle_app/images/pics/jeferzforest1_500.jpg";

export default function About({setActiveSection}){

	function handleClick(e){
		e.stopPropagation();
		setActiveSection("coffee-section");
	}

	return(

		<div className="main-panel">

			<div className="about-box">
				
					<div className="text-container">
						<div className="header center fs8">
							SketchDrawDoodle story!
						</div>
					</div>


				<div className="about-container">
						<span className="emphasis fs5">Who: </span>
						<div className="text-container">
								<p className="para writing fs4">
									SKetch Draw Doodle was created by Jef McDonald, who wanted to create an app to 
									help fellow artists find epic reference pictures 
									to inspire and help them grow. 
								</p>

								<div className="picture">
									<img src={jeferzForest} />
								</div>

								<p className="writing fs4">
									As an artist he has exhibited in venues across the UK and contributes to a small rag tag band of underground comix and magazines. 		
								</p>
								<p onClick={handleClick} className="emphasis fs6">
										Support SketchDrawDoodle!		
								</p>
						</div>
					</div> {/* end about-container */}


					<br />
					<span className="emphasis fs5">What:</span>
					<div className="text-container">
							<p className="writing fs4">
								Everything from the Icons and the artwork to the design, coding, testing and deployment 
								were done by Jeferz over many many months of long days and late nights to bring sketchdrawdodle to life.
														
							</p>
							<p className="writing fs4">
								If you're into techy stuff you can nerd out on Jeferz Rumble channel where he goes onto the details of the development process: 
								<a href="https://rumble.com/c/c-7781876" target="_blank">
									<span className="emphasis fs5">SketchDrawDoodle DevBlog</span>						
								</a>
							</p>
					</div>
					<div className="picture">
						<img src={jeferzCoffee} />
					</div>


					<span className="emphasis fs5">Why:</span>
					<div className="text-container">
							<p className="writing fs4">
								The core app is free and anyone can use it, but it does have maintainance, hosting and development costs, so if you find it useful 
								and would like to help keep the lights on
								please consider becoming a supporter. Thanks Jeferz x		
							</p>
							<br />
							<p onClick={handleClick} className="emphasis fs6">
								Support SketchDrawDoodle!		
							</p>

					</div>
			</div> {/* end frens box */}
				







				<div className="social-media-links-box">
					<SocialMediaLinks />
				</div>
				
		</div> // main-panel

	)
}