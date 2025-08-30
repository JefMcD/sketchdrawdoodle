import inkBrushes from "@images/ink_brushes.png";
import navPanelBackground from "@images/backgrounds/side_panel.jpg";

import WelcomeLink  from "@navLinks/WelcomeLink";
import FrensLink    from "@navLinks/FrensLink.jsx";
import DrawLink     from "@navLinks/DrawLink";
import ProfileLink  from "@navLinks/ProfileLink.jsx";
import JoinLink     from "@navLinks/JoinLink.jsx";
import SignInLink   from "@navLinks/SignInLink.jsx";

import AboutLink    from "@navLinks/AboutLink";
import SupportLink  from "@navLinks/SupportLink.jsx";
import AccountLink  from "@navLinks/AccountLink.jsx";
import SummaryLink  from "@navLinks/SummaryLink.jsx";
import SketchbookLink from "@navLinks/SketchbookLink.jsx";

import VerticalTab1 from "@components/tabs/VerticalTab1.jsx";
import AccountBall  from "@profile/AccountBall.jsx";

function NavPanel({
  userData,
  setUserData,
  setActiveSection, 
  server}) {
    // userData.isAuthenticated - Boolean, is the user logged in 
    // userData.username        - String
    // userData.avatar          - String, url of the users avatar
    // setActiveSection         - function, Set Active Section state to new value
    // server                   - production or developmet server

  const navLinkData = [
    {id:"welcome-link",  component: WelcomeLink,  linkType: "open"},
    {id:"frens-link",    component: FrensLink,    linkType: "open"},
    {id:"draw-link",     component: DrawLink,     linkType: "open"},
    {id:"profile-link",  component: ProfileLink,  linkType: "fren"}, 
    {id:"signin-link",   component: SignInLink,   linkType: "guest"}, 
    {id:"join-link",     component: JoinLink,     linkType: "guest"}, 

    // Possible Later Additions
    //{id:"summary-link",  component: SummaryLink,  linkType: "fren"},
    //{id:"account-link",  component: AccountLink,  linkType: "fren"}, 
    //{id:"support-link",  component: SupportLink,  linkType: "open"},
    //{id:"about-link",    component: AboutLink,    linkType: "open"},

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

        {/* Tabs */}
        <VerticalTab1 />

        {/* User Account Avatar */}
        <AccountBall 
          userData = {userData}
          setUserData = {setUserData}
          setActiveSection={setActiveSection}
          server={server}/>
      
      </div>
    </>
  );
}
export default NavPanel;


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
