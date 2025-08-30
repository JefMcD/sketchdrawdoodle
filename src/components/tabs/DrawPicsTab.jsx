


import AlfieCamera from "@images/draw/camera.webp"

export default function DrawPicsTab(setActiveTab){
  return(
  <>
    <div  className="htab" id="pic-tab" onClick={()=>setActiveTab("pic-tab")}>
        <div  className="htab-img-container"> {/* Desktop Only */}
            <img  src={AlfieCamera} />
        </div>

        <div  className="htab-label-container"> {/* Desktop Only */}
            <div  className="htab-label">
                Pics
            </div>
        </div>
    </div>
  </>
  )
}