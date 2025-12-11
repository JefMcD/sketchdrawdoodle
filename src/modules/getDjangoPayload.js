
// Django renders index.html with initialization data in a Json Payload that gets bundeled into the DOM like this
//    <script type="application/json" id="initial-data">
//        {"is_authenticated": true, "username": "looda", "initial_section": "welcome-section", "banner": "/media/user_banner/balls.jpg", "avatar": "/media/user_avatar/boosh.jpg", "story": "Ludicrus Rex", "caption": "Far of travel and wiide of view", "website": "RaaaWWR.com"}
//    </script>
//
// getDjangoPayload retrieves the data and formats it into an object that will be parsed
// into state userData and profileData
export default function getDjangoPayload(id="initial-data"){
  let raw = null;
  //  Validate JSON before parsing
  try{
      //get element containing Json payload from Django
      const init_element = document.getElementById(id);
      if (!init_element){
        throw new Error(`Element #${id} not found`);
      }
      // Grab text and remove BOM if present
      let raw = init_element.textContent;
      raw = raw.replace(/^\uFEFF/, ""); // Replace UTF-8 BOM (a sequence of bytes at the start of a text stream ( 0xEF, 0xBB, 0xBF ) that allows the reader to more reliably guess a file as being encoded in UTF-8)

      //2 Trim leading/trailing whitespace
      raw = raw.trim();
      const initialData = JSON.parse(raw);
      // create initial data object
      const initializationData ={
        is_authenticated  : initialData["is_authenticated"],
        initial_username  : initialData["username"] ?? "Doodler",
        initial_section   : initialData["initial_section"]  ?? "welcome-section",
        initial_banner    : initialData["banner"]   ?? "",
        initial_avatar    : initialData["avatar"]   ?? "",
        initial_story     : initialData["story"]    ?? "",
        initial_caption   : initialData["caption"]  ?? "",
        initial_website   : initialData["website"]  ?? ""
      } // null-coalescing mofo

        return initializationData;
  }catch (err){
    // On error, initializationData may not exist. log error and then return default data
    console.error(`Failed to parse initial JSON from #${id}: Using defaults. Error: ${err}, Json: ${raw}`);
    const defaultData ={
        is_authenticated  : false,
        initial_username  : "Doodler",
        initial_section   : "welcome-section",
        initial_banner    : "",
        initial_avatar    : "",
        initial_story     : "",
        initial_caption   : "",
        initial_website   : ""
      } // null-coalescing mofo
    return defaultData
  }
}