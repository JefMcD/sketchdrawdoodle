


import SocialMediaLinks from "@components/SocialMediaLinks";
import BMCFullLogo from "@socialIcons/BMC/BMCFullLogo";
import KofiLogo from "@socialIcons/kofi/KofiLogo";
import HorizontalAds from "../HorizontalAds";

export default function Coffee(){

	return(

		<div className="main-panel">

			<div className="frens-box coffee-box">
				<div className="text-container">
					<div className="header center fs5">
						Support SketchDrawDoodle!
					</div>
				</div>

				<div className="text-container">
						<div className="emphasis center fs5">
							If you like SketchDrawDoodle consider lending you support.
						</div>
						<br />
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

				{/* <div className="large-banner-ad-container">
					large banner here
				</div> */}

				<SocialMediaLinks />


			</div> {/* end frens box */}

			<HorizontalAds />
				
		</div>

	)
}