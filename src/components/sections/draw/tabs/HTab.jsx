

// Make the tabs Buttons so that they can be tabbed through

export default function HTab({
  tabId,
  label,
  tabImage,
  activeTab,
  setActiveTab,
}){
  // set the active tab
  let isActive = activeTab === tabId ? "active-tab" : "";

  return(
  <button  className={`htab ${isActive}`} id={tabId} onClick={()=>setActiveTab(tabId)}> {/* Overlay applied to this div */}
      <div  className="htab-img-container"> {/* Desktop Only */}
          <img  src={tabImage} />
      </div>

      <div  className="htab-label-container"> {/* Desktop Only */}
          <div  className="htab-label">
              {label}
          </div>
      </div>
  </button>
  )
}