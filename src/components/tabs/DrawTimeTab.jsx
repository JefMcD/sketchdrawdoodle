

import AlfieTime from "@images/draw/time.webp"

export default function DrawTimeTab(setActiveTab){
  return(<>

    <div  className="htab" id="time-tab" onClick={()=>setActiveTab("time-tab")}>
        <div  className="htab-img-container"> {/* Desktop Only */}
            <img src={AlfieTime} />
        </div>

        <div  className="htab-label-container"> {/* Desktop Only */}
            <div  className="htab-label">
                Time
            </div>
        </div>  
    </div>
  </>)
}