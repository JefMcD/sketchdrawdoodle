

import logo from "@images/logo1_w500.png"	

export default function Frens(){

	return(

		<div className="main-panel">
			<div className="main-logo">
					<img src={logo} />
			</div>

			<div className="frens-box">
				<div className="text-container">
					<div className="header fs8">
						Support SketchDrawDoodle!
					</div>
				</div>

				<div className="text-container">
					<div className="writing fs1">
						BuyMeACoffee, Kofi, Stripe
					</div>
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
			</div> {/* end frens box */}
		</div>

	)
}