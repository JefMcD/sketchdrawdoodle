
import {useProfile} from "@providers/ProfileContext"

import inkBrushes from "@images/ink_brushes.png";
import navPanelBackground from "@images/backgrounds/side_panel.jpg";
import SLogo from "@svgIcons/SLogo";
import SketchDrawDoodleLogo from "@svgIcons/SketchDrawDoodleLogo";


// Authentication
import SignInLink   from "@navLinks/SignInLink.jsx";
import JoinLink     from "@navLinks/JoinLink.jsx";

import WelcomeLink   from "@navLinks/WelcomeLink";
import CoffeeLink    from "@navLinks/CoffeeLink";
import DrawLink      from "@navLinks/DrawLink";
import CompassLink   from "@navLinks/CompassLink";
import EducationLink from "@navLinks/EducationLink";
import WFLink        from "@navLinks/WFLink.jsx"; // This is being used form the profilr link for now
import ContactLink   from "@navLinks/ContactLink";

// import AccountLink  from "@navLinks/AccountLink.jsx";
// import ProfileLink  from "@navLinks/ProfileLink.jsx";
// import FrensLink    from "@navLinks/FrensLink.jsx";
// import UserGuideLink from "@navLinks/UserGuideLink";
// import SummaryLink  from "@navLinks/SummaryLink.jsx";
// import SketchbookLink from "@navLinks/SketchbookLink.jsx";

// import VerticalTab1 from "@draw/tabs/VerticalTab1.jsx";
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

  // The order here is the order they're rendered in the nav
  // open - permanenty visible to all. guest - unsigned users only. fren - signed in users only
  const navLinkData = [
    {id:"welcome-link",  component: WelcomeLink,  linkType: "open"}, // racoon icon
    {id:"draw-link",     component: DrawLink,     linkType: "open"}, // paintbrush icon
    {id:"coffee-link",   component: CoffeeLink,   linkType: "open"}, // coffee cup
    {id:"journey-link",  component: CompassLink,  linkType: "open"}, // compas
    {id:"education-link",component: EducationLink,linkType: "open"}, // open book
    {id:"contact-link",  component: ContactLink,  linkType: "open"}, // 

    //{id:"userguide-link",component: UserGuideLink,linkType: "open"},
    
    
    // Possible Later Additions
    {id:"join-link",     component: JoinLink,     linkType: "guest"}, // Form Icon
    {id:"signin-link",   component: SignInLink,   linkType: "guest"}, // Arrow
    {id:"wf-link",       component: WFLink,       linkType: "fren"},  // white feather (Profile)
    //{id:"profile-link",  component: ProfileLink,  linkType: "fren"},  // Racoon
    //{id:"account-link",  component: AccountLink,  linkType: "fren"}, 
    //{id:"frens-link",    component: FrensLink,    linkType: "open"},
    //{id:"summary-link",  component: SummaryLink,  linkType: "fren"},
    //{id:"support-link",  component: SupportLink,  linkType: "open"},
    
  ]

  return (
    <>
      <div className= "nav-panel-container">
        <div className= "nav-panel-bg">
          <img src={navPanelBackground} />
        </div>

        <div className= "app-logo">
          <img src={inkBrushes} />
        </div>
        <div className="nav-logo-container">
          <div className="nav-title-logo">
                    <SketchDrawDoodleLogo />
          </div>

        </div>


        {/*  Nav Links */}
        <div className= "nav-icons-container">
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

        {/* User Account Avatar */}
        <NavPanelAvatar 
          userData = {userData}
          setUserData = {setUserData}
          setActiveSection={setActiveSection}
        />

        {/** Alternative Title Logo */}
        <div className="nav-footer-logo">
            <div className="s-logo-bg-box">
                  <SLogo />
            </div>
        </div>

        {/* Tabs */}
        {/* <VerticalTab1 setIsDrawing={setIsDrawing}/>  */}



      
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
