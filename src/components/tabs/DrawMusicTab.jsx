


import AlfieMusic from "@images/draw/music.webp"

export default function DrawMusicTab(){
  return(<>

    <div className="htab" id="music-tab" onClick={()=>setActiveTab("music-tab")}>
        <div className="htab-img-container"> {/* Desktop Only */} 
            <img className="htab-img" src={AlfieMusic} />
        </div>
        <div className="htab-label-container"> {/* Desktop Only */}
            <div className="htab-label">
                Music
            </div>
        </div>               
    </div>
  </>)
}