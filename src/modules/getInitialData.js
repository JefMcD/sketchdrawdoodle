

export default function getInitialData(id="initial-data"){
  let raw = null
  //  Validate JSON before parsing
  try{
      //get element containing Json payload from Django
      const el = document.getElementById(id)
      if (!el){
        throw new Error(`Element #${id} not found`)
      }

      // 1. Grab text and remove BOM if present
      let raw = el.textContent
      raw = raw.replace(/^\uFEFF/, "") // Replace UTF-8 BOM (a sequence of bytes at the start of a text stream ( 0xEF, 0xBB, 0xBF ) that allows the reader to more reliably guess a file as being encoded in UTF-8)

      //2 Trim leading/trailing whitespace
      raw = raw.trim()

      return JSON.parse(raw)

  }catch (err){
    // On error log it and then return default data
    console.error(`Failed to parse initial JSON from #${id}: Using defaults.`, err, raw)
    let defaultData = {
        "is_authenticated": false,
        "username": "default",
        "avatar": "default",
        "initial_section": "welcome-section",
        "csrfToken": null //forms wont work
    }
    return defaultData
  }

}