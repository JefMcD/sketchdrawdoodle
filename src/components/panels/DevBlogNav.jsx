// styles 
// _nav_horiz.scss and _nav_hamburger.scss

import {useState} from "react";

export default function DevBlogNav({
  isHamOpen,
  setIsHamOpen

}){
  function handleHamburgerMenuClick(e, section){
    setIsHamburger = false;
    // load section (this get handled entirely in the client)
    window.load(section)
  }

  const [isHamburgerActive, setIsHamburger] = useState(true)

  return(
  <>
    {/**         <div className="horizontal-nav education">education horizontal-nav</div> */}
    {/* <!-- **************************************************************** -->
    <!--                     Hidden Mobile Menu Panel                     -->
    <!-- **************************************************************** --> */}
    {isHamburgerActive && (
      <div className="mobile-menu-panel devblog">

          <ul className="mobile-menu-list"> 
              
              <li className="mobile-nav-item">
                  <a className='nav-link'     href="#backend-section">Backend</a>
              </li>

              <li className="mobile-nav-item">
                  <a className='nav-link'     href="#database-section">Database</a>
              </li>

              <li className="mobile-nav-item">
                  <a className='nav-link'     href="#database-section">Interfaces</a>
              </li>

              <li className="mobile-nav-item">
                      <a className='nav-link' href="#client-section">Client</a>
              </li>

              <li className="mobile-nav-item">
                  <a className='nav-link'     href="#ui-section">UI</a>
              </li>

              <li className="mobile-nav-item">
                  <a className='nav-link'     href="#design-section">Design</a>
              </li>

              <li className="mobile-nav-item">
                  <a className='nav-link'     href="#alfie-section">Alfie</a>
              </li>

              <li className="mobile-nav-item">
                  <a className='nav-link'     href="#deployment-section">Deployment</a>
              </li>

              <li className="mobile-nav-item">
                  <a className='nav-link'     href="#performance-section">Performance</a>
              </li>


              <li className="mobile-nav-item">
                  <a className='nav-link'  href="#future-section">Future</a>
              </li>

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

        <nav className="horizontal-nav-items-flex">
            <ul className="education-main-menu">

                <li className="menu-item">
                    <a className='nav-link'  href="#backend-section">Backend</a>
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
        </nav>

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