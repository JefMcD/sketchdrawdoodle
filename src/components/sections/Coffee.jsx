import SocialMediaLinks from "@components/SocialMediaLinks";
import BMCFullLogo from "@socialIcons/BMC/BMCFullLogo";
import KofiLogo from "@socialIcons/kofi/KofiLogo";
import HorizontalAds from "../HorizontalAds";

export default function Coffee({ setActiveSection }) {
  function handleClick(e) {
    e.stopPropagation();
    setActiveSection("coffee-section");
  }

  return (
    <div className="coffee-zine">

      {/* TITLE */}
      <div className="zine-title ">
        <h1>Fuel The Art</h1>
        <h2>Keeping the Ink flowing</h2>
      </div>

      <div className="zine-section-wrapper">
      {/* INTRO */}
      <section className="zine-section">
        <div className="zine-panel">
          <h3 className="zine-heading">THE DEAL</h3>

          <p className="writing fs4">
            SketchDrawDoodle is free because art is for everyone.
            But hosting, development, storage and caffeine are costly.
          </p>

          <p className="writing fs4">
            If you enjoy using SketchDrawDoodle and it makes you happy, consider supporting on any of these patforms. For just the price of a cup of coffee you can make a difference.
          </p>

          {/* <button onClick={handleClick} className="zine-cta">
            WHY SUPPORT? →
          </button> */}
        </div>
      </section>

      {/* TIP OPTIONS */}
      <section className="zine-section alt halftone-bg">
        <div className="zine-panel">
          <h3 className="zine-heading">Support!</h3>

          <div className="tip-card-box">

            {/* Buy Me A Coffee */}
            {/* <a
              className="tip-card skew-left"
              href="https://www.buymeacoffee.com/sketchdrawdoodle"
              target="_blank"
            >
              <div className="tip-logo-wrap">
                <BMCFullLogo />
              </div>
            </a> */}

            {/* Ko-Fi */}
            <a
              className="tip-card skew-tipcard-right"
              href="https://www.ko-fi.com/sketchdrawdoodle"
              target="_blank"
            >
              <div className="tip-logo-wrap">
                <KofiLogo />
              </div>
            </a>
              <p className="writing fs4">
                Click and Tip! 
              </p>


          </div>
        </div>
      </section>

      {/* OUTRO */}
      <section className="zine-section">
        <div className="zine-panel">
          <h3 className="zine-heading">THANK YOU</h3>

          <p className="writing fs4">
            Every donation — big or small — helps keep the lights on and
            fuels new features, more space and better performance for artists everywhere.
          </p>

          <p className="writing emphasis fs4">You rock ❤️</p>
        </div>
      </section>


      </div>

      <div className="zine-footer">
        <SocialMediaLinks />
      </div>

      {/* <HorizontalAds /> */}
    </div>
  );
}
