// styles 
// _nav_horiz.scss and _nav_hamburger.scss

import {useState} from "react";

export default function DevBlogNav({
  isHamOpen,
  setIsHamOpen

}){
    function scrollToSection(sectionId) {
    setIsHamOpen(false);

    const el = document.getElementById(sectionId);
    if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    }


    function openHam(e){
        e.stopPropagation(e);
        setIsHamOpen(true);
    }



  return(
  <>
    {/**         <div className="horizontal-nav education">education horizontal-nav</div> */}
    {/* <!-- **************************************************************** -->
    <!--                     Hidden Mobile Menu Panel                     -->
    <!-- **************************************************************** --> */}


    {isHamOpen && (
      <div className="mobile-menu-panel devblog" onClick={(e)=>e.stopPropagation()}>

          <ul className="mobile-menu-list"> 
              
              <li className="mobile-nav-item nav-link" onClick={() => scrollToSection("backend-section")} >
                    Backend Config
              </li>

              <li className="mobile-nav-item ">
                  <a
                    className="nav-link"
                    onClick={() => scrollToSection("database-section")}
                    >
                    Database Design
                  </a>
              </li>

{/** 
              <li className="mobile-nav-item nav-link" onClick={() => scrollToSection("REST-API-section")}>
                  REST API
              </li>

              <li className="mobile-nav-item nav-link" onClick={() => scrollToSection("interfaces-section")}>
                  External Interfaces
              </li>

              <li className="mobile-nav-item nav-link" onClick={() => scrollToSection("data-modelling-section")}>
                  Data Modelling
              </li>

              <li className="mobile-nav-item nav-link" onClick={() => scrollToSection("UI-design-section")}>
                  UI Design
              </li>

              <li className="mobile-nav-item nav-link" onClick={() => scrollToSection("icons-section")}>
                  Icons & Logos
              </li>

              <li className="mobile-nav-item nav-link" onClick={() => scrollToSection("graphics-section")}>
                  Graphic Art
              </li>

              <li className="mobile-nav-item nav-link" onClick={() => scrollToSection("client-section")}>
                  React CLient
              </li>

              <li className="mobile-nav-item nav-link" onClick={() => scrollToSection("state-machine-section")}>
                  State Machine
              </li>

              <li className="mobile-nav-item nav-link" onClick={() => scrollToSection("deployment-section")}>
                  Deployment
              </li>

              <li className="mobile-nav-item nav-link" onClick={() => scrollToSection("cache-section")}>
                  Cache
              </li>

              <li className="mobile-nav-item nav-link" onClick={() => scrollToSection("seo-section")}>
                  SEO
              </li>

              <li className="mobile-nav-item nav-link" onClick={() => scrollToSection("future-section")}>
                  Future Extensions
              </li>
*/}

          </ul>

      </div>

    )}


    {/* <!-- **************************************************************** -->
    <!--                     Main Nav Bar                                 -->
    <!-- **************************************************************** --> */}
    <div className = "horizontal-nav-flex">
        <div className="horizontal-nav-logo">
            Dev Blog
        </div>

        {/** Small Devices only ?? */}
        <div className="ham-flex-container" onClick={openHam}>
            <div className="ham-flex">
                <div className="ham-bar-topbun"></div>
                <div className="ham-bar-filling"></div>
                <div className="ham-bar-bottombun"></div>
            </div>

        </div>

{/* 
        <nav className="horizontal-nav-items-flex">
            <ul className="education-main-menu">

                <li className="menu-item">
                    <a className='nav-link'  href="#backend-section">Backend</a>
                </li>

               <li className="menu-item">
                    <a className='nav-link'  href="#config-section">Config & Setup</a>
                </li>
                
                <li className="menu-item">
                    <a className='nav-link'  href="#client-section">Client</a>
                </li>

                <li className="menu-item">
                    <a className='nav-link'  href="#design-section">Design</a>
                </li>

                <li className="menu-item">
                    <a className='nav-link'  href="#future-section">Future</a>
                </li>


            </ul>
        </nav> */}

        {/* <!-- Hamburger Menu Button --> */}
        {/* <div className = 'mobile'>
            <div className="hamburger-flex">
                <div className="hamburger ham-toggle" id="ham-btn" >
                    <span className="hamburger-top ham-toggle"></span>
                    <span className="hamburger-middle ham-toggle"></span>
                    <span className="hamburger-bottom ham-toggle"></span>
                </div>
            </div>
        </div> */}

    </div>











  
  
  </>
  )
}