

// Django and react must use same host (localhost or 127.0.0.1) in dev
// In hotdog mode server must be http://127.0.0.1 same a Django server or host in production
import isDEBUG from "@modules/isDebug.js";

export default function getServer(){
  const localhost_dev    = "http://127.0.0.1:8000/"; // React and Django both using 127.0.0.1 (host redefined from localhost to 127.0.0.1 in vite.conf)
  const localhost_hotdog = "http://127.0.0.1:8000/"; // React served inside Django on 127.0.0.1
  const sketchdrawdoodle = "https://www.sketchdrawdoodle.com/";
  const production_host  = "https://sketchdrawdoodle.pythonanywhere.com/";

  const TEST = false; // TEST=true for testing a hotdog deployment on localhost before pushing to live production
  
  if(isDEBUG){
    return localhost_dev
  }else{
    if (TEST){
      return localhost_hotdog
    }else{
      return sketchdrawdoodle
    }
  }

  // Somethimes you need isDEBUG === false but you also need to use localhost
  // so that the initial data is loaded from the Django payload 
  // host can be set directly below

  // dev host
  //return localhost_hotdog;

  // live production host
  //return sketchdrawdoodle;

}