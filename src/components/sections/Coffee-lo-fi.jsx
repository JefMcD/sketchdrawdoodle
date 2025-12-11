import SocialMediaLinks from "@components/SocialMediaLinks";
import BMCFullLogo from "@socialIcons/BMC/BMCFullLogo";
import KofiLogo from "@socialIcons/kofi/KofiLogo";
import HorizontalAds from "../HorizontalAds";

export default function Coffee() {
  return (
    <div className="coffee-zine">

      {/* TITLE */}
      <div className="coffee-title halftone-bg">
        <h1>Fuel the Machine</h1>
        <h2>Support Sketch • Draw • Doodle</h2>
      </div>

      {/* INTRO */}
      <section className="coffee-section torn-paper">
        <p className="coffee-text fs5">
          SketchDrawDoodle is free — because art should be accessible.
        </p>
        <p className="coffee-text fs5">
          But hosting, servers and all-night coding marathons need fuel.
        </p>
        <p className="coffee-text fs5">
          If the app helps you level up, consider tossing a coin in the jar.
        </p>
      </section>

      {/* TIP OPTIONS */}
      <section className="coffee-section tip-grid halftone-bg">
        {/* BuyMeACoffee */}
        <a
          className="tip-card skew-left"
          href="https://buymeacoffee.com/sketchdrawdoodle"
          target="_blank"
        >
          <div className="tip-logo-wrap">
            <BMCFullLogo />
          </div>
          <p className="tip-caption">Buy Jef a Brew →</p>
        </a>

        {/* Ko-Fi */}
        <a
          className="tip-card skew-right"
          href="https://www.ko-fi.com/sketchdrawdoodle"
          target="_blank"
        >
          <div className="tip-logo-wrap">
            <KofiLogo />
          </div>
          <p className="tip-caption">Tip via Ko-Fi →</p>
        </a>
      </section>

      {/* OUTRO */}
      <section className="coffee-section torn-paper alt">
        <p className="coffee-text fs5">
          Every bit of support goes straight back into making better tools,
          better art sessions, and better features for artists like you.
        </p>
        <p className="coffee-text emphasis fs5">Thank you ❤️</p>
      </section>

      <div className="coffee-footer">
        <SocialMediaLinks />
      </div>

      <HorizontalAds />
    </div>
  );
}
