
import SocialMediaLinks from "@components/SocialMediaLinks";
import alfieReg from "@images/alfie_ink.webp";

import ContactForm from "@forms/contact/ContactForm.jsx";


export default function Contact({
  userData,
	setActiveSection,
}){
	function handleLinkClick(e){
		//e.stopPropagation();
		setActiveSection("welcome-section")
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
    

					<div className="zine-splash-container">
						<div className="zine-image-wrap skew-left">
							<img src={alfieReg} alt="Alfie Ink Splash" />
						</div>
					</div>




			{/* SECTION: Contact Form */}
			<div className="zine-section-wrapper">
					<section className="zine-section alt">
						<div className="zine-panel">
							<h3 className="zine-heading">Contact</h3>

              <ContactForm userData={userData} setActiveSection={setActiveSection}/>

							<div className="text-container center">
									<div className="emphasis fs5">
											Happy to talk.
									</div>
							</div>


						</div>
					</section>
          <SocialMediaLinks />



			</div>

		</div> // End main-panel

	)
}