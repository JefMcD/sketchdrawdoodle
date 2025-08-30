import { useState } from 'react'

import NavPanel    from "@panels/NavPanel.jsx";
import ExtrasPanel from "@panels/ExtrasPanel.jsx";

// Authentication sections
import SignIn   from "@auth/SignIn";
import Join     from "@auth/Join";
import Reset    from "@auth/Reset";

// Drawing Session sections
import Draw     from "@draw/Draw";
import Summary  from "@draw/Summary";

// User Profile sections
import Account    from "@profile/Account";
import Profile    from "@profile/Profile";
import Sketchbook from "@profile/Sketchbook";

// General sections
import Welcome  from "@sections/Welcome";
import About    from "@sections/About";
import Frens    from "@sections/Frens";
import Support  from "@sections/Support";
import Help     from "@sections/Help";



export default function SketchDrawDoodle({
  initialData,
  server,
}) { 
    
  const [activeSection, setActiveSection] = useState(initialData["initial_section"]);
  const [userData, setUserData] = useState({
    is_authenticated: initialData["is_authenticated"],
    username:         initialData["initial_username"],
    avatar:           initialData["initial_avatar"],
  	banner      : null,
		story       : null,
		caption     : null,
		website     : null,
  });

  // Note: No quotes around the component name. Its a function not a string!
  const sectionsArray = [
		{id:"signin-section",    component: SignIn},
		{id:"join-section",      component: Join},
		{id:"reset-section",     component: Reset},
 //   {id:"verify-section",    component: Verify},
//    {id:"new-password",      component: NewPassword},        
//    {id:"verify-reset-code", component: VerifyResetCode},
    
		{id:"draw-section",      component: Draw},
		{id:"summary-section" ,  component: Summary},

		{id:"account-section",   component: Account},
		{id:"profile-section",   component: Profile},
		{id:"sketchbook-section",component: Sketchbook},

		{id:"welcome-section",   component: Welcome},
		{id:"about-section",     component: About},
		{id:"frens-section",     component: Frens},
		{id:"support-section",   component: Support},
  	{id:"help-section",      component: Help},
  ]

  // Find the active section
  // ActiveSection is a psudo component that dynamically created and used to render the chosen App section
  const activeObj = sectionsArray.find(section => section.id === activeSection);
  const ActiveSection = activeObj?.component; // Dynamically created component

  return (
    <>
    <div className="flex-container">
      <div className = "app-container">
        <NavPanel  
          userData = {userData}
          setUserData = {setUserData}
          setActiveSection={setActiveSection}
          server={server}
        />

        {/* If ActiveSection is a real component - render it*/}
        {/* Pass setActiveSection as a prop to allow nav links inside the section */}
        {ActiveSection && 
          <ActiveSection 
            userData = {userData}
            setUserData = {setUserData}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            server={server}
          />}

        <ExtrasPanel />
      </div>
    </div>
    </>
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