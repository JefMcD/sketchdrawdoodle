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
    <div className="coffee-zine"> {/* coffee_section.scss */}

      {/* TITLE */}
      
      <div className="zine-title "> {/* zine.scss */}
        <h1>
          <div>Fuel</div>
          <div>The</div>
          <div>Art</div>
        </h1>
        <h2>Keeping the Ink flowing</h2>
      </div>

      <div className="zine-section-wrapper">




      {/* INTRO */}
      <section className="zine-section">
        <div className="zine-panel">
          <h3 className="zine-heading">THE DEAL</h3>

          <p className="writing fs4">
            SketchDrawDoodle is free because art is for everyone.
            But hosting, development and snax are costly.
          </p>

          <p className="writing fs4">
            If you enjoy using SketchDrawDoodle help us out. For just the price of a cup of coffee you can make a difference.
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
            <a
              className="tip-card skew-tipcard-right"
              href="https://www.ko-fi.com/sketchdrawdoodle"
              target="_blank"
            >
              <div className="tip-logo-wrap">
                <KofiLogo />
              </div>
            </a>

          </div>
        </div>
      </section>

      {/* TIP OPTIONS */}
      {/* Buy Me A Coffee */}
      {/* <section className="zine-section alt halftone-bg">
        <div className="zine-panel">
          <h3 className="zine-heading">Back The App!</h3>

          <div className="tip-card-box">

            <a
              className="tip-card skew-left"
              href="https://www.buymeacoffee.com/sketchdrawdoodle"
              target="_blank"
            >
              <div className="tip-logo-wrap">
                <BMCFullLogo />
              </div>
            </a>

          </div>
        </div>
      </section> */}



      {/* OUTRO */}
      <section className="zine-section ">
        <div className="zine-panel">
          <h3 className="zine-heading">THANK YOU</h3>

          <p className="writing fs4">
            Every donation — big or small — helps keep the lights on and
            fuels new features, more space and a better app for artists everywhere.
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
