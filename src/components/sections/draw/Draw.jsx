

// Do the horizontal Netflix scroller for Category selection  on Desktop
// Maybe Vertical stacked accordion on Mobile


import {useState} from "react"

// Import Horizontal Tab
import HTab  from "@draw/tabs/HTab";

// Import Tab images
import alfieCamera from "@images/draw/camera.webp"
import alfieMusic from "@images/draw/music.webp"
import alfieTime   from "@images/draw/time.webp"

// Import form sections
import PicsSection  from "@forms/draw/PicsSection";
import TimeSection  from "@forms/draw/TimeSection";
import MusicSection from "@forms/draw/MusicSection";
import DrawError    from "@forms/draw/DrawError";

// import fancy pulsing inksplat submit button
import SplatSubmit  from "@forms/draw/SplatSubmit";

export default function Draw({
	userData,
	setUserData,
	activeSection,
	setActiveSection
}){
	const [activeTab, setActiveTab] = useState("pic-tab");
	const [configForm, setConfigForm] = useState({
		picsSection:{},
		timeSection:{},
		musicSection:{}
	})
	const [error, setError] = useState(false);

	// tabId corrosponds to setActiveTab and used to set the activeTab. Also used as a unique key for map function
	const tabsArray = [
		{tabId: "pic-tab", 	tab: HTab, image: alfieCamera, section: PicsSection,  label: "Pics"},
		{tabId: "time-tab", tab: HTab, image: alfieTime,   section: TimeSection,  label: "Time"},
		{tabId: "music-tab",tab: HTab, image: alfieMusic,  section: MusicSection, label: "Music"}
	];

	// Get the active Section Component
	const activeTabObj = tabsArray.find( (tab) => (tab.tabId === activeTab));
	const SectionComponent = activeTabObj?.section;

	return(
		<>
		<div className="main-panel">

			<div className='text-container'>
					<div className="header fs7">
							New SketchDrawDoodle Session
					</div>
			</div>

			<div className = "horizontal-tabs-box">
				{
					// render all the tab components listed in tabsArray
					tabsArray.map((tabObj)=>(
						<tabObj.tab 
							  key={tabObj.tabId}
							  tabId={tabObj.tabId}
  							label={tabObj.label}
  							tabImage={tabObj.image}
  							activeTab={activeTab}
  							setActiveTab={setActiveTab}
						/>
					))
				}
			</div>

			{/*the section to be rendered when a tab is active or unmounted when inactive */}
			<div className="practice-setup-box">
						<div className="form-wrapper">
								<form className="standard-form practice-setup-form" action="">
										{<SectionComponent /> ? (<SectionComponent />) : (<DrawError />)}
										<SplatSubmit />
								</form>
						</div> {/*form-wrapper */}

						{error && <DrawError />}
		    </div> {/* end practice-setup-box */}
		</div> {/* end man-panel */}
		</>
	)
}