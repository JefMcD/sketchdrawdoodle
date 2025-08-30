




import {useState} from "react"

// Import Tabs
import DrawPicsTab  from "@tabs/DrawPicsTab"
import DrawTimeTab  from "@tabs/DrawTimeTab"
import DrawMusicTab from "@tabs/DrawMusicTab"

// Import form sections
import DrawFormPicsSection  from "@drawForms/DrawFormPicsSection"
import DrawFormTimeSection  from "@drawForms/DrawFormTimeSection"
import DrawFormMusicSection from "@drawForms/DrawFormMusicSection"

// import fancy pulsing inksplat submit button
import DrawFormSplatSubmit  from "@drawForms/DrawFormSplatSubmit"


function Draw(){
	const [activeTab, setActiveTab] = useState("pic-tab")

	const tabsArray = [
		{tab: "pic-tab", 	component: DrawPicsTab},
		{tab: "time-tab", 	component: DrawTimeTab},
		{tab: "music-tab",	component: DrawMusicTab}
	]

	return(
		<>
		<div className="main-panel">
            <div className='text-container'>
                <div className="header fs7">
                    New SketchDrawDoodle Session
                </div>
            </div>

			<div className = "horizontal-tabs-box">
				<DrawPicsTab setActiveTab={setActiveTab}/>
				<DrawTimeTab setActiveTab={setActiveTab} />
				<DrawMusicTab setActiveTab={setActiveTab} />
			</div>

			{/*the section to be shown when a tab is active and hidden when inactive */}
			<div className="session-box">
                <div className="form-wrapper">
                    <form className="standard-form session-config-form" action="">
                        {/* CSKS Moskva We lovePooty Poo */}
                        <DrawFormPicsSection />
                        <DrawFormTimeSection />
                        <DrawFormMusicSection />
                        
                        <DrawFormSplatSubmit />
                    </form>
                </div> {/*form-wrapper */}
		    </div> {/* end session-box */}
		</div> {/* end man-panel */}
		</>
	)
}
export default Draw