


import logo from "@images/logo1_w500.png"	;
import SocialMediaLinks from "@components/SocialMediaLinks";
import BMCFullLogo from "@socialIcons/BMC/BMCFullLogo";
import KofiLogo from "@socialIcons/kofi/KofiLogo";
import jeferz from "/static/doodle_app/images/pics/will-code-for-coffee.jpg";

export default function Coffee(){

	return(

		<div className="main-panel">

			<div className="frens-box coffee-box">
				<div className="text-container">
					<div className="header center fs8">
						Support SketchDrawDoodle!
					</div>
				</div>

					<div className="text-container">
							<div className="emphasis center fs7">
								Please consider supporting the site with a one time tip or a monthly subscription.
							</div>
							<div className="writing center fs4">
								All it takes is the cost of a cup of Coffee, (and maybe a slice of cake if yur feeling genrous)
							</div>
					</div>


				<div className="tip-box-wrapper">
						<a href = "https://buymeacoffee.com/sketchdrawdoodle" target="_blank" alt="support sketchdrawdoodle at buymeacoffee">
							<div  className="tip-box">
									<div className="tip-logo">
										<BMCFullLogo />				
									</div>
							</div>
						</a>

						<a href="https://www.Ko-fi.com/sketchdrawdoodle" target="_blank" alt="support sketchdrawdoodle on ko-fi">
							<div className="tip-box">
									<div className="tip-logo">
										<KofiLogo />				
									</div>				
							</div>
						</a>
				</div>



			</div> {/* end frens box */}

				<div className="social-media-links-box">
					<SocialMediaLinks />
				</div>
				
		</div>

	)
}