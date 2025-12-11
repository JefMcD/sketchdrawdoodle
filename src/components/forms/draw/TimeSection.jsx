
import {useEffect} from "react";

function Drill({
  id,             // the id of the drill being rendered
  duration_secs,  // the duration of the drill in seconds
  drills,         // the list of drills associated with this particular drill doodleDrills etc
  setFormData,    // function to change the formData
  selectedDrillId // the id of the selected drill Id held in the formData
}){

  let isChecked = false;
  if (Number(id) === Number(selectedDrillId)){
    isChecked = true;
  }

  const duration_mins = Number(duration_secs)/60;

  function handleDrillSelection(e){
    // get name-value pair from click event on input
    const {name, value} = e.target;

    // get corrosponding drill data from drillList
    const drillData = drills.find((drill)=>(Number(drill.id) === Number(value))); // returns the drill object

    setFormData(
      prev =>(
        {
          ...prev, // copy the old fields
          drillChoice: drillData // over-ride this one with new drillData
        }
      )
    );

  } // end handleDrillSelection


  return(
    <label className="radio-label">
      <input
        onChange={handleDrillSelection}
        className="grid-radio"
        type="radio"
        name="practiceTime"
        value={id}
        checked = {isChecked}
      />
      <span className="radio-text"> {duration_mins}</span>
    </label>
  )
    
} // end Drill

export default function TimeSection({
  formData,
  setFormData,
  drillList, // Array of drill objects
  setFormError
}){

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    if (mins === 0) return `${secs} second${secs !== 1 ? 's' : ''}`;
    if (secs === 0) return `${mins} minute${mins !== 1 ? 's' : ''}`;

    return `${mins} min ${secs} sec`;
  }

  function numToText(num){
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
                  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    if (num === 0) return 'zero';
    if (num < 20) return ones[num];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '');
    
    // Add more cases if you need hundreds/thousands
    if (num < 1000) {
      return ones[Math.floor(num / 100)] + ' hundred' + (num % 100 ? ' ' + numberToWords(num % 100) : '');
    }
    
    return num.toString(); // fallback for very large numbers

  }


  function handleLinkClick(){
    setActiveSection("coffee-section");
  }


  // define array of doodle dash practice drills
  const doodleDashList = drillList
    .filter((practiceObj)=>practiceObj.mode === "doodle")
    .map((practiceObj) => practiceObj);


  // define array of warmup sketch drills
  const warmupSketchList = drillList
    .filter((practiceObj)=>practiceObj.mode === "sketch")
    .map((practiceObj) => practiceObj);

  // define array of focus drawinf drills
  const focusDrawingList = drillList
    .filter((practiceObj)=>practiceObj.mode === "draw")
    .map((practiceObj) => practiceObj);

  return(
      <section className="pics-setup-section">
          <div className="pictures-selection-title writing fs4"> Drill Selection</div>

          <div className="time-section-options-box">

                <div className="drill-grid">

                  <span className="row-label">Doodle Dash:(mins) </span>
                  {doodleDashList.map((dd) => (
                    <Drill
                      key={dd.id}
                      id={dd.id}
                      duration_secs={dd.duration_secs}
                      drills={doodleDashList}
                      setFormData = {setFormData}
                      selectedDrillId = {formData.drillChoice.id}

                    />
                  ))}

                  <span className="row-label">WarmupSketch:(mins) </span>
                  {warmupSketchList.map((dd) => (
                    <Drill
                      key={dd.id}
                      id={dd.id}
                      duration_secs={dd.duration_secs}
                      drills={warmupSketchList}
                      setFormData = {setFormData}
                      selectedDrillId = {formData.drillChoice.id}

                    />
                  ))}
                  
                  <span className="row-label">FocusDrawing:(mins)</span>
                  {focusDrawingList.map((dd) => (
                    <Drill
                      key={dd.id}
                      id={dd.id}
                      duration_secs={dd.duration_secs}
                      drills={focusDrawingList}
                      setFormData = {setFormData}
                      selectedDrillId = {formData.drillChoice.id}

                    />
                  ))}
                  
                </div> {/* end drill-grid */}

          </div>

          <section className="time-section-summary-box">

                {/* DEFAULT Practice Drill */}
                <div className="zine-section-wrapper">
                  <section className="zine-section">
                    <div className="zine-panel">
                      <h3 className="zine-heading fs6">{formData.drillChoice.description}</h3>
                      <div className="writing fs4">
                        <ul>
                          {formData.drillChoice.steps.map((step)=>(
                            <li key={`drillStep${step.step_order}`}>{numToText(step.num_pics)}, {formatTime(step.display_time)} pics</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>


              {/* SECTION COMING SOON */}
              {/* <div className="zine-section-wrapper">
                <section className="zine-section alt">
                  <div className="zine-panel">
                    <h3 className="zine-heading">Coming Soon</h3>
                    <div className="writing fs4">
                      <ul>
                        <li>The wayward hand</li>
                        <li>Bootleggers Delight</li>
                        <li>Uncanny Fanny's Dilemma</li>
                        <li>My Sisters an ALien</li>
                        <li>Crooked Teeth</li>



                      </ul>
                    </div>


                    <div onClick={handleLinkClick} className="zine-cta text-container center" id="time-donate">
                        <div className="cta-button fs5 text-link" >
                            Make A WIsh
                        </div>
                    </div>
                  </div>
                </section>
              </div> */}

            </section> 




      </section> 
  )
}