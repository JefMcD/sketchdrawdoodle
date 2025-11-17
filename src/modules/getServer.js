

// Django and react must use same host (localhost or 127.0.0.1) in dev
// In hotdog mode server must be http://127.0.0.1 same a Django server or host in production

export default function getServer(){
  const localhost_dev    = "http://127.0.0.1:8000/"; // React and Django both using 127.0.0.1 (host redefined from localhost to 127.0.0.1 in vite.conf)
  const localhost_hotdog = "http://127.0.0.1:8000/"; // React served inside Django on 127.0.0.1
  const production       = "https://www.sketchdrawdoodle.com/";

  return localhost_dev
}