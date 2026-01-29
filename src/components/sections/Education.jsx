import EducationNav from "@panels/EducationNav";
import alfieThink1 from "@images/education/alfie-think1.jpg";
import alfieThink2 from "@images/education/alfie-think2.jpg";
import alfiePainting from "@images/education/alfie_painting_1500.webp";
import alfieYes      from "@images/education/yes2.jpg";
import alfieTeachin  from "@images/education/teachin2.webp";
import alfieOk       from "@images/education/ok2.jpg";
import alfieFAQ       from "@images/education/faq1.jpg";


export default function Education({
  setActiveSection
}){

  function handleLinkClick(e){
    //e.stopPropagation();
    setActiveSection("draw-section")
  }

  return(
    <>
		<div className="education-zine">

        <EducationNav />

        {/* SECTION: WHAT IS SKETCHDRAWDOODLE ? */}
        <div className="zine-section-wrapper">

          <section className="zine-section zine-anchor-section" id="start-section">
            <div className="section-background-image">
              <img src={alfiePainting} />
            </div>

            <div className="zine-panel">
                <h2 className="zine-heading">What is SketchDrawDoodle?</h2>
                <h3 className="writing fs2">Using Sketchdrawdoodle as a Teaching Tool for Art & Illustration</h3>

                <div className="zine-panel-with-image">
                    
                    <p className="zine-para writing fs3">
                      SketchDrawDoodle is a free, browser-based drawing practice platform designed for art education.
                      It provides structured, timed drawing sessions using public-domain reference images, making it
                      ideal for classroom teaching, homework assignments, and independent study.
                    </p>

                    <div className="pic-attachment-box">
                      <img src={alfieThink2} />
                    </div>
                </div>
                
            </div>

            {/* FEATURE: TL:DR */}
            <div className="feature-flex">
                <div className="zine-feature tldr">
                    <div className="zine-panel">
                        <h3 className="zine-heading lt-turq">TL:DR?</h3>

                        <ul className="bullet-list light-list fs3">
                          <li>Free</li>
                          <li>Requires no installation</li>
                          <li>Works on all devices</li>
                          <li>Encourages self learning</li>
                          <li>Supports structured practice</li>
                          <li>No copyright worries</li>
                          <li>Nurtures Creativity</li>

                        </ul>

                        <div className="text-container center">
                            <div className="emphasis lt-turq fs5">
                                Free for everyone. Built for artists.
                            </div>
                        </div>

                        <div onClick={handleLinkClick} className="zine-cta text-container center" id="get-drawing">
                            <div className="cta-button writing fs4 text-link" >
                                Try It!
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-container center">
              <div className="emphasis fs5">
                  Great for students of all levels!
              </div>
          </div>

          </section>


          {/** CLASSROOM SECTION */}
          <section className="zine-section zine-anchor-section alt" id="classroom-section">
              <div className="section-background-image">
                <img src={alfieTeachin} />
              </div>


              <div className="zine-panel">
                <h3 className="zine-heading">Perfect for the classroom</h3>

                <div className="zine-panel-with-image">
                
                    <p className="zine-para fs3">
                        Teaching drawing is as much about practice structure as it is about talent.
                        SketchDrawDoodle helps students build observation, speed, and confidence through 
                        guided drawing sessions that fit naturally into lessons, workshops, and homework.
                    </p>

                    <div className="pic-attachment-box">
                      <img src={alfieYes} />
                    </div>

                </div>

              </div> {/* end zine-panel*/}

              {/* FEATURE: CLASSROOM IDEAS */}
              <div className="feature-flex">
                  <div className="zine-feature classroom-ideas alt">
                      <div className="zine-panel">

                          <h3 className="zine-heading alt">Classroom & Homework Ideas</h3>

                          <ul className="bullet-list light-list fs3">
                            <li>Warm-up exercises </li>
                            <li>Timed observational drawing </li>
                            <li>Homework assignments </li>
                            <li>Life drawing backup</li>
                            <li>Drawing Challenges</li>
                          </ul>

                      </div>
                  </div>

                <div className="zine-feature classroom-postscript">
                    <div className="zine-panel">

                    <p className="zine-para fs3">

                      SketchDrawDoodle makes regular drawing practice easier to teach and its fun, 
                      and that makes keeping regular practice
                      easier to maintain.
                      It’s free to use, quick to explain, and flexible enough to fit a wide range of art 
                      and design curricula.

                    </p>

                    </div>
                </div>
            </div> {/** end feature-flex */}
          </section>



          {/* SECTION: FAQ */}
          <section className="zine-section zine-anchor-section" id="faq-section">
              <div className="section-background-image">
                <img src={alfieFAQ} />
              </div>

              <div className="zine-panel">
                  <h3 className="zine-heading">Who Uses SketchDrawdoodle?</h3>

                  <div className="zine-panel-with-image">

                          <div className="zine-div-list">
                            <ul className="bullet-list fs3">
                              <li>Secondary school art classes</li>
                              <li className= "alt">Further education colleges</li>
                              <li>University illustration courses</li>
                              <li className= "alt">Concept art & game design students</li>
                              <li>Independent Artists</li>
                              <li className= "alt">Architecture and industrial design sketching</li>
                              <li>Self-directed study and portfolio practice</li>
                              <li className= "alt">Art Clubs and Organizations</li>
                            </ul>
                          </div>

                          {/** image */}
                          <div className="pic-attachment-box">
                            <img src={alfieOk} />
                          </div>
                  </div> {/** end zine-panel-with-image */}

              </div> {/* end zine-panel*/}


            {/* SECTION: FAQ LIST */}
            <div className="feature-flex">
                <div className="zine-feature education-faq alt2">
                    <div className="zine-panel">
                      <h3 className="zine-heading lt-turq">Teacher FAQ</h3>

                      <dl className="faq-list writing fs3">
                        <dt className="faq-term">Is SketchDrawDoodle free for schools and students?</dt>
                        <dd className="faq-defn">SketchDrawDoodle is free to use and does not require payment to run drawing sessions. Schools, teachers, and students can use it without subscriptions or licenses.</dd>

                        <dt className="faq-term">Do students need accounts or logins?</dt>
                        <dd className="faq-defn">No. SketchDrawDoodle does not require accounts, email addresses, or sign-ups. Students can start drawing immediately in a web browser.</dd>

                        <dt className="faq-term">Can SketchDrawDoodle be used in the classroom?</dt>
                        <dd className="faq-defn">Yes. SketchDrawDoodle is designed to work well in classrooms, workshops, and remote learning environments. Teachers can use it for warm-ups, timed exercises, or structured drawing activities.</dd>

                        <dt className="faq-term">Are the reference images copyright-free?</dt>
                        <dd className="faq-defn">Yes. All reference images are sourced from public-domain archives 
                          and libraries, with no copyright or licensing concerns for classroom, project or personel use.</dd>

                        <dt className="faq-term">What age groups is SketchDrawDoodle suitable for?</dt>
                        <dd className="faq-defn">SketchDrawDoodle is suitable for secondary school students, further education, university-level courses, and adult learners.</dd>
                      </dl>
                    </div>
                </div>
            </div>


          </section>


        </div>
  

    </div>
    
    </>

  )
}