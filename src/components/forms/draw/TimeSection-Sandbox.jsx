
import {useEffect} from "react";

export default function TimeSection({
  formData,
  setFormData,
  drillList, // Array of objects
  setFormError
}){

  function handleLinkClick(){
    setActiveSection("coffee-section");
  }

  function handleDrillClick(e){
    e.stopPropagation();
    // get drill id from clicked radio button

    // get corrosponding drill data from drillList

    // set fromData with drill data 

  }


  return(
  <div className="time-section-container">
    
      <div className="time-section-options-box">

            <div className="writing fs5">Drill Selection:</div>
            <div className="drill-grid">

              <span className="row-label">Doodle Dash: </span>
              <input className="grid-radio" type="radio" name="practiceTime" value="drillList.id" />5min
              <input className="grid-radio" type="radio" name="practiceTime" value="drillList.id" />10min
              
              <span className="row-label">WarmupSketch: </span>
              <input className="grid-radio" type="radio" name="practiceTime" value="drillList.id" />15min
              <input className="grid-radio" type="radio" name="practiceTime" value="drillList.id" />30min
              <span className="row-label">FocusDrawing: </span>
              <input className="grid-radio" type="radio" name="practiceTime" value="drillList.id" />45min
              <input className="grid-radio" type="radio" name="practiceTime" value="drillList.id" />60min

            </div>

      </div>

      <section className="time-section-summary-box">

          {/* DEFAULT Practice Drill */}
          <div className="zine-section-wrapper">
            <section className="zine-section">
              <div className="zine-panel">
                <h3 className="zine-heading fs6">{formData.practiceTimeChoice.name}</h3>
                <div className="writing fs4">
                  <ul>
                    <li>8 pics for 30s</li>
                    <li>6 pics for 1 mins</li>
                    <li>5 pics for 2 mins</li>
                    <li>2 pics for 5 mins</li>
                  </ul>
                  <div className="emphasis fs5">Total Time 30 minutes</div>
                </div>
              </div>
            </section>
          </div>


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

      </section> 

  </div>
  )
}