import { useState } from 'react';

import NavPanel    from "@panels/NavPanel.jsx";
import ExtrasPanel from "@panels/ExtrasPanel.jsx";

// Context Providers
import {ProfileContext} from "@providers/ProfileContext";

// Authentication sections
import SignIn   from "@auth/SignIn";
import Join     from "@auth/Join";
import Reset    from "@auth/Reset";

// Drawing Session sections
import Draw     from "@draw/Draw";
//import Summary  from "@draw/Summary";

// User Profile sections
import Profile    from "@profile/Profile";
//import Account    from "@profile/Account";
//import Sketchbook from "@profile/Sketchbook";

// General sections
import Welcome  from "@sections/Welcome";
import Journey  from "@sections/Journey";
import Coffee   from "@sections/Coffee";
import UserGuide from "@sections/UserGuide";
import Education from "@sections/Education";
//import Frens    from "@sections/Frens";

// Drawing Practice COponent
import DoodlePlayer from "@components/sections/player/DoodlePlayer";
//import DoodlePlayerGrok from "@components/sections/player/DoodlePlayerGrok";
//import AIPractice   from "@components/sections/player/AIPlayer";


export default function SketchDrawDoodle({
  initialData,
  server
}) { 
  console.log(`********* SketchDrawDoodle *********`);

	const [formData, setFormData]           = useState({
		categoryChoice:{id: null, name:""}, // eg 2, "animals"
		subcategoryChoices:[], // array of {id, name}
		drillChoice: // Default Practice Drill
			{
				id: 104,
				mode: "sketch",
				description: "30 minute Warmup",
				duration_secs: 1800,
				is_pro: false,
				steps: [
					{
						'num_pics': 8, 
						'step_order': 0, 
						'display_time': 30
					}, 
					{
						'num_pics': 6, 
						'step_order': 1, 
						'display_time': 60
					}, 
					{
						'num_pics': 5, 
						'step_order': 2, 
						'display_time': 120
					}, 
					{
						'num_pics': 2, 
						'step_order': 3, 
						'display_time': 300
					}
				]
			},

		musicChoice:{}
	});

  const [isDrawing, setIsDrawing] = useState(false); // Set to true when the user starts the DoodlePlayer and is drawing
  const [practicePayload, setPracticePayload] = useState({}) // The list of image objects returned by the fetch and passed to the DoodlePlayer component 

  const [activeSection, setActiveSection] = useState(initialData["initial_section"]); // PicSection or TimeSection

  // User data is mainly for authorisation (Signin, Join, Reset Password, Nav Panel)
  const [userData, setUserData] = useState({
    is_authenticated: initialData["is_authenticated"],
    max_subcategories: initialData["initial_subcategories"],
    username : initialData["initial_username"],
    server : server
  });

  // Profile Data is generally used by Many components throught the app)
  const profileBanner = `${initialData.initial_banner}`
  const profileAvatar = `${initialData.initial_avatar}`
  const [profileData, setProfileData] = useState({
    banner   : profileBanner,
    avatar   : profileAvatar,
    story    : initialData.initial_story,
    caption  : initialData.initial_caption,
    website  : initialData.initial_website,
  })


  // Note: No quotes around the component name. Its a function not a string!
  const sectionsArray = [
		{id:"welcome-section",   component: Welcome, props: {userData, setUserData, activeSection, setActiveSection}},
		{id:"signin-section",    component: SignIn,  props: {userData, setUserData, activeSection, setActiveSection}},
		{id:"join-section",      component: Join,    props: {userData, setUserData, activeSection, setActiveSection}},
		{id:"reset-section",     component: Reset,   props: {userData, setUserData, activeSection, setActiveSection}},
    
		{id:"draw-section",      component: Draw,    props: {userData, setIsDrawing, setPracticePayload, setActiveSection, formData, setFormData}},
		//{id:"summary-section" ,  component: Summary},

		//{id:"account-section",   component: Account},
		{id:"profile-section",   component: Profile, props: {userData, setUserData, activeSection, setActiveSection}},
		//{id:"sketchbook-section",component: Sketchbook},

		//{id:"frens-section",     component: Frens},
		{id:"coffee-section",    component: Coffee,    props: {}},
  	{id:"userguide-section", component: UserGuide, props: {userData, setUserData, activeSection, setActiveSection}},
		{id:"journey-section",   component: Journey,   props: {userData, setUserData, activeSection, setActiveSection}},
		{id:"education-section", component: Education, props: {setActiveSection}}

  ]

  // Find the active section
  // ActiveSection is a psudo component that dynamically created and used to render the chosen App section
  const activeObj = sectionsArray.find(section => section.id === activeSection);
  const ActiveSection = activeObj?.component; // Dynamically created component
  const componentProps = activeObj.props;
  //<DrawingPractice setIsDrawing={setIsDrawing} practicePayload={practicePaload}/>
  return (

      <ProfileContext.Provider value={{profileData, setProfileData}}>
        {isDrawing ? (
          <DoodlePlayer 
            isDrawing={isDrawing}
            setIsDrawing={setIsDrawing} 
            practicePayload={practicePayload} 
            formData={formData} 
            setActiveSection={setActiveSection}/>

        ):(

          <div className="flex-container"> {/* sketchDrawDoodle.scss */}
            <div className = "app-container"> {/* sketchDrawDoodle.scss */}
              <NavPanel  
                userData = {userData}
                setActiveSection={setActiveSection}
              />
      
              {/* If ActiveSection is a real component - render it*/}
              {/* Pass setActiveSection as a prop to allow nav links inside the section */}
              {ActiveSection && <ActiveSection {...componentProps} />}
      
              <ExtrasPanel />
            </div>
          </div>
        )}
      </ProfileContext.Provider>
      

  )
}



/*
  Alternative way of conditionally rendering the sections

  Explaining:  {sectionsArray.map(
                  ({id, component: Section}) => id === activeSection && <Section key={id} />
                )}

  ({id, component: Section})  Destructuring with renaming.
  This renames component to Section. This means that it will have a valid component name
  Why dont youjust call it Section in the array in the first place? 
  Just bein fancy? Either way is fine

  id===activeSection
  Evaluates to true when the id of the mapped object is th active section

  <Section key={id} />
  Why key={id}?

  React requires a key prop when you render a list of elements (via .map)
  so it can track which item is which between renders. 
  This prevents React from re-mounting or mixing up components unnecessarily.

  Even though in your case only one component actually gets rendered 
  (because of the condition id === activeSection), you’re still using .map() 
  to produce a list of results. 
  React still sees it as a list render, even if most items return null.

  So adding a key is the “React-correct” thing to do in this pattern.


*/