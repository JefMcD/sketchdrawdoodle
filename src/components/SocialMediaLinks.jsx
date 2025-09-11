
import {Tooltip } from "react-tooltip";
// https://www.npmjs.com/package/react-tooltip


import YouTubeIcon from "@socialIcons/YouTubeIcon";
import RumbleIcon  from "@socialIcons/RumbleIcon";
import OdyseeIcon  from "@socialIcons/OdyseeIcon";
import XIcon       from "@socialIcons/XIcon";
import TiktokIcon   from "@socialIcons/TiktokIcon";
import FacebookIcon   from "@socialIcons/FacebookIcon";
import InstagramIcon  from "@socialIcons/InstagramIcon";

export default function SocialMediaLinks(){

  const socialMediaSites = [
    { 
      name      : "YouTube", 
      component : <YouTubeIcon />, 
      url       : "https://www.youtube.com/@thejeferzone",
      tooltip   : "Follow On YouTube!",
      preview   : "/path/to/youtube-preview.jpg"
    },
    {
      name      : "Rumble",
      component : <RumbleIcon  />, 
      url       : "https://www.rumble.com",
      tooltip   : "Check out our Rumble Videos",
      preview   : "/path/to/youtube-preview.jpg",
    },
    {
      name      : "Odysee",
      component : <OdyseeIcon  />, 
      url       : "https://www.odysee.com",
      tooltip   : "Join our Odysee Community",
      preview   : "/path/to/youtube-preview.jpg",
    },
    {
      name      : "X",
      component : <XIcon       />, 
      url       : "https://x.com/sketchdrawdoodl",
      tooltip   : "Follow for the lastest updates on X!",
      preview   : "/path/to/youtube-preview.jpg"
    },
    { name      : "Tik Tok",
      component : <TiktokIcon  />, 
      url       : "https://www.tiktok.com/@sketchdrawdoodle",
      tooltip   : "See our art videos on TikTok!"
    },
    { name      : "Facebook",
      component : <FacebookIcon/>, 
      url       : "https://www.facebook.com/sketchdrawdoodle/",
      tooltip   : "Like and Follow on Facebook",
      preview   : "path to facebool prevew",
      
    },
    {
      name      : "Instagram",
      component : <InstagramIcon/>,
      url       : "https://www.instagram.com/jeffersweb/",
      tooltip   : "Follow our art on Instagram!",
      preview   : "preview.jpg"
    }
  ]




  return(
    <div className="social-media-links-box">
      {
        socialMediaSites.map((link)=>(
          <a key={link.name} // unique key for each iterable
            href={link.url} 
            target="_blank"
            rel="noopener noreferrer" // security best practice
            data-tooltip-id={`tooltip-${link.name}`}
            data-tooltip-content={link.tooltip}
            //data-tooltip-html={`<img src="${link.preview}" alt="${link.name} preview" style="width: 100px; height: auto;" />`}
>
            <div className="social-media-icon-wrapper">
              {link.component}
            </div>
          </a>
        ))
      }
      {socialMediaSites.map((link) => (
        <Tooltip key={`tooltip-${link.name}`} id={`tooltip-${link.name}`} place="top" />
      ))}
    </div>
  )
}

/*
Same effect as 


      <a href="https://www.youtube.com/@thejeferzone" target="_blank">
        <div onClick="" className="social-media-icon-wrapper">
          <YouTubeIcon />
        </div>
      </a>
      <div className="social-media-icon-wrapper">
        <RumbleIcon />
      </div>
      <div className="social-media-icon-wrapper">
        <OdyseeIcon />
      </div>
     <div className="social-media-icon-wrapper">
        <XIcon />
      </div>
      <div className="social-media-icon-wrapper">
        <InstagramIcon />
      </div>
      <div className="social-media-icon-wrapper">
        <TiktokIcon />
      </div>
      <div className="social-media-icon-wrapper">
        <FacebookIcon />
      </div>

*/