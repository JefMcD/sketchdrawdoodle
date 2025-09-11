
import {useProfile} from "@providers/ProfileContext"

import inkBrushes from "@images/ink_brushes.png";
import navPanelBackground from "@images/backgrounds/side_panel.jpg";

// Authentication
import SignInLink   from "@navLinks/SignInLink.jsx";
import JoinLink     from "@navLinks/JoinLink.jsx";

import WelcomeLink  from "@navLinks/WelcomeLink";
//import FrensLink    from "@navLinks/FrensLink.jsx";
import CoffeeLink   from "@navLinks/CoffeeLink.jsx";
import DrawLink     from "@navLinks/DrawLink";
import ProfileLink  from "@navLinks/ProfileLink.jsx";

import AboutLink    from "@navLinks/AboutLink3";

// import WFLink       from "@navLinks/WFLink.jsx";
// import AccountLink  from "@navLinks/AccountLink.jsx";
// import SummaryLink  from "@navLinks/SummaryLink.jsx";
// import SketchbookLink from "@navLinks/SketchbookLink.jsx";

import VerticalTab1 from "@components/tabs/VerticalTab1.jsx";
import NavPanelAvatar  from "@panels/NavPanelAvatar.jsx";

export default function NavPanel({
  userData,
  setUserData,
  setActiveSection, 
  // userData.isAuthenticated - Boolean, is the user logged in 
  // userData.username        - String
  // setActiveSection         - function, Set Active Section state to new value
}) {
  const {profileData, setProfileData} = useProfile()
  console.log(`NavPanel: avatar = ${profileData.avatar}`)

  // The order here is the order they're rendered in the nav
  const navLinkData = [
    {id:"welcome-link",  component: WelcomeLink,  linkType: "open"},
    {id:"draw-link",     component: DrawLink,     linkType: "open"},
    {id:"profile-link",  component: ProfileLink,  linkType: "fren"}, 
    {id:"coffee-link",   component: CoffeeLink,   linkType: "open"},
    {id:"signin-link",   component: SignInLink,   linkType: "guest"}, 
    {id:"join-link",     component: JoinLink,     linkType: "guest"}, 
    {id:"about-link",    component: AboutLink,    linkType: "open"},
    
    
    // Possible Later Additions
    //{id:"wf-link",       component: WFLink,       linkType: "open"},
    //{id:"frens-link",    component: FrensLink,    linkType: "open"},
    //{id:"summary-link",  component: SummaryLink,  linkType: "fren"},
    //{id:"account-link",  component: AccountLink,  linkType: "fren"}, 
    //{id:"support-link",  component: SupportLink,  linkType: "open"},
    //{id:"help-link",     component: HelpLink,     linkType: "open"},
    
  ]

  console.log(`Nav Links setActiveSection and rerender SketchDrawDoodle`)

  return (
    <>
      <div className= "nav-panel-container">
        <div className= "nav-panel-bg">
          <img src={navPanelBackground} />
        </div>

        <div className= "app-logo">
          <img src={inkBrushes} />
        </div>

        {/*  Nav Links */}
        <div className= "nav-icons-container main-nav">
          { // Get The Links
            navLinkData.filter(({linkType})=>(
              userData["is_authenticated"] ? 
                linkType === "open" || linkType === "fren" :
                linkType === "open" || linkType === "guest"
            ))
            .map(({id, component: Link})=>(
              <Link 
                key={id} 
                setActiveSection={setActiveSection} 
              />
            ))
          }
        </div>

        {/* Tabs */}
        {/* <VerticalTab1 /> */}

        {/* User Account Avatar */}
        <NavPanelAvatar 
          userData = {userData}
          setUserData = {setUserData}
          setActiveSection={setActiveSection}
        />
      
      </div>
    </>
  );
}


/**
 *  Brute Force Solution
 *  Components all listed and conditionally rendered
 *  setActiveSection prop passed into component to be handled in the onClick event there
 * 
        //  Nav Links //
        <div className= "nav-icons-container">
          <WelcomeLink  setActiveSection = {setActiveSection}/>
          <DrawLink     setActiveSection = {setActiveSection}/>
          <Frens  setActiveSection = {setActiveSection}/>
          {isAuthenticated && <Sketchbook />} // signed in users 
          {!isAuthenticated && <SignIn onClick={""}/>} /* guest users
          {!isAuthenticated && <Join />} /* guest users 
        </div>

 */
