

export default function TimeSection({
  setActiveSection
}){
  function handleLinkClick(){
    setActiveSection("coffee-section")
  }
  return(
  <>
    
    <section className="drawing-session-config" id="session-time">

      <div className='text-container center'>
        <br />
          <div className="writing fs5">
              Practice Drill: 30 Minute Warmup
          </div>
          <br />
      </div>


    {/* DEFAULT Practice Drill */}
    {/* SECTION COMING SOON */}
    <div className="zine-section-wrapper">
      <section className="zine-section">
        <div className="zine-panel">
          <h3 className="zine-heading">Drill Summary</h3>
          <div className="writing fs4">
            <ul>
              <li>8 pics for 30 seconds each</li>
              <li>6 pics for 1 minute each</li>
              <li>5 pics for 2 minutes each</li>
              <li>2 pics for 5 minutes each</li>
            </ul>
            <div className="emphasis fs5">Total Time 30 minutes</div>
          </div>
        </div>
      </section>
    </div>

    </section> 

    {/* SECTION COMING SOON */}
    <div className="zine-section-wrapper">
      <section className="zine-section alt">
        <div className="zine-panel">
          <h3 className="zine-heading">Coming Soon</h3>
          <div className="writing fs4">
            <ul>
              <li>Doodle Dash 10 min</li>
              <li>Doodle Dash 20 min</li>
              <li>Warmup Sketching 15 Minute</li>
              <li>Warmup Sketching 30 minute ✔</li>
              <li>Focused Drawing 45 minutes</li>
              <li>Focused Drawing 60 minutes</li>
              <li>Custom Drills</li>
            </ul>
          </div>
          <div className="text-container center">
              <div className="emphasis fs5">
                  Support SketchDrawDoodle!
              </div>
          </div>

          <div onClick={handleLinkClick} className="zine-cta text-container center" id="time-donate">
              <div className="cta-button fs5 text-link" >
                  Donate
              </div>
          </div>
        </div>
      </section>
    </div>

  </>
  )
}