

import logo from "@images/logo1_w500.png"	

import SocialMediaLinks from "@components/SocialMediaLinks"

export default function Frens(){

	return(

		<div className="main-panel">
			<div className="main-logo">
					<img src={logo} />
			</div>

			<div className="frens-box">
				<div className="text-container">
					<div className="header fs5">
						Follow SketchDrawDoodle!
					</div>
				</div>


				<div className="social-media-links-box">
					<SocialMediaLinks />
				</div>

			</div> {/* end frens box */}

			<div className="social-media-feed-box">

				<div className="text-container">
					<div className="writing fs5">
						Social Media feed for clicked Icon where user can follow
					</div>
				<div className="text-container">
					<div className="writing fs3">
						Jefferz picture
					</div>
				</div>

				<div className="text-container">
					<div className="writing fs3">
						The development process. What a lot of amazing work!
					</div>
				</div>
				</div>
				
			</div>

		</div>

	)
}