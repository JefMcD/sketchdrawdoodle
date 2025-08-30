

import WelcomeSection from "@components/sections/WelcomeSection.jsx"
import AboutSection 	from "@components/sections/AboutSection.jsx"
import FrensSection 	from "@components/sections/FrensSection.jsx"
import SignIn 				from "@components/sections/SignIn.jsx"

function AppSections({activeSection}){

	console.log("Attempt to mount section: "+activeSection)
	// state is activeSection

	const sectionIdArray = [
		"welcome-section",
		"about-section",
		"frens-section",
		"support-section",
		"session-config",
		"user-section",
		"profile-section",
		"session-summary",
		"signin-section",
		"join-section",
		"code-verification-section",
		"resetpass-section"
	]

	const sectionRoutes = [
		{sectionId : "welcome-section", component : <WelcomeSection />},
		{sectionId : "about-section",   component : <AboutSection />},
		{sectionId : "frens-section",   component : <FrensSection />},
	]

	const sectionLookup = {
		"welcome-section" : <WelcomeSection />,
		"about-section" 	: <AboutSection />,
		"frens-section"		: <FrensSection />,
		"signIn-section"	: <SignIn />,
	}
	let component = null
	try{
			component = sectionLookup[activeSection]
			if (!component){
				throw new Error(`Invalid Active Section ${activeSection}. Loading Welcome Section`)
			}
	}catch (err){
		component = <WelcomeSection />
		console.error(err)
	}

	return(
		<>
			 <div className="main-panel">
					{component}
			</div>
		</>
	)
}
export default AppSections