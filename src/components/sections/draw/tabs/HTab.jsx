

export default function HTab({
  tabId,
  label,
  tabImage,
  activeTab,
  setActiveTab,
}){


  return(
  <div  className="htab" id="pic-tab" onClick={()=>setActiveTab(tabId)}>
      <div  className="htab-img-container"> {/* Desktop Only */}
          <img  src={tabImage} />
      </div>

      <div  className="htab-label-container"> {/* Desktop Only */}
          <div  className="htab-label">
              {label}
          </div>
      </div>
  </div>
  )
}