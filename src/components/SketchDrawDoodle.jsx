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
import Help     from "@sections/Help";
//import Frens    from "@sections/Frens";

// Drawing Practice COponent
import DoodlePlayer from "@components/sections/player/DoodlePlayer";
//import DoodlePlayerGrok from "@components/sections/player/DoodlePlayerGrok";
//import AIPractice   from "@components/sections/player/AIPlayer";

export default function SketchDrawDoodle({
  initialData,
  server
}) { 
  console.log(`********* SketchDrawDoodle *********`)

  const [isDrawing, setIsDrawing] = useState(false);
  const [practicePayload, setPracticePayload] = useState({})

  const [activeSection, setActiveSection] = useState(initialData["initial_section"]);

  // User data is mainly for authorisation (Signin, Join, Reset Password, Nav Panel)
  const [userData, setUserData] = useState({
    is_authenticated: initialData["is_authenticated"],
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
    
		{id:"draw-section",      component: Draw,    props: {userData, setUserData, setIsDrawing, setPracticePayload, setActiveSection}},
		//{id:"summary-section" ,  component: Summary},

		//{id:"account-section",   component: Account},
		{id:"profile-section",   component: Profile, props: {userData, setUserData, activeSection, setActiveSection}},
		//{id:"sketchbook-section",component: Sketchbook},

		//{id:"frens-section",     component: Frens},
		{id:"coffee-section",    component: Coffee, props: {userData, setUserData, activeSection, setActiveSection}},
  	{id:"help-section",      component: Help,   props: {userData, setUserData, activeSection, setActiveSection}},
		{id:"journey-section",   component: Journey,props: {userData, setUserData, activeSection, setActiveSection}},
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
          <DoodlePlayer setIsDrawing={setIsDrawing} practicePayload={practicePayload} />

        ):(

          <div className="flex-container">
            <div className = "app-container">
              <NavPanel  
                userData = {userData}
                setUserData = {setUserData}
                setActiveSection={setActiveSection}
                setIsDrawing = {setIsDrawing}
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