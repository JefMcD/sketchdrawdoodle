// styles 
// _nav_horiz.scss and _nav_hamburger.scss

export default function EducationNav({

}){

  return(
  <>

  {/**         <div className="horizontal-nav education">education horizontal-nav</div> */}
    {/* <!-- **************************************************************** -->
    <!--                     Hidden Mobile Menu Panel                     -->
    <!-- **************************************************************** --> */}
    {/* <div className="mobile-menu-panel mobile">

        <ul className="mobile-menu"> 
            
            <li className="mobile-nav-item">
                <a className='nav-link'     href="{% url 'doodle_app:index' %}#fullstack-section">Fullstack</a>
            </li>

            <li className="mobile-nav-item">
                <a className='nav-link'     href="{% url 'doodle_app:index' %}#design-section">Design</a>
            </li>

            <li className="mobile-nav-item">
                    <a className='nav-link' href="{% url 'doodle_app:index' %}#portfolio-section">Portfolio</a>
            </li>

            <li className="mobile-nav-item">
                <a className='nav-link'     href="{% url 'doodle_app:index' %}#prices-section">Prices</a>
            </li>

            <li className="mobile-nav-item">
                <a className='nav-link'     href="{% url 'doodle_app:index' %}#contact-section">Get Started</a>
            </li>

        </ul>

    </div> */}



    {/* <!-- **************************************************************** -->
    <!--                     Main Nav Bar                                 -->
    <!-- **************************************************************** --> */}
    <div className = "horizontal-nav-flex">
        <div className="horizontal-nav-logo">
            Art Education
        </div>

        <nav className="horizontal-nav-items-flex">
            <ul className="horizontal-menu">
                <li className="menu-item">
                    <a className='nav-link' href="#start-section">Start</a>
                </li>   

                <li className="menu-item">
                    <a className='nav-link'  href="#classroom-section">Classroom</a>
                </li>
                
                
                <li className="menu-item">
                    <a className='nav-link'  href="#faq-section">FAQ</a>
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