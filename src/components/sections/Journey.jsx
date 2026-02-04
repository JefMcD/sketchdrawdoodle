import SocialMediaLinks from "@components/SocialMediaLinks";

import jeferzForest from "/static/doodle_app/images/pics/jeferzforest1_500.jpg";
import HorizontalAds from "@components/HorizontalAds";

export default function Journey({ setActiveSection }) {
  function handleClick(e, section) {
    e.stopPropagation();
    setActiveSection(section);
  }

  return (
    <div className="journey-zine">

      {/* HEADER / TITLE */}
      <div className="zine-title">
        <h1>Journey </h1>
      </div>
      <div className="zine-subtitle">

        <h2>The Travellers Tale</h2>
      </div>

      <div className="zine-section-wrapper">

        {/* SECTION: WHO */}
        <section className="zine-section  halftone-bg">
          <div className="zine-panel">
            <h3 className="zine-heading">WHO?</h3>
            <p className="writing fs4">
              SketchDrawDoodle was created by <b>Jef McDonald</b>, an artist obsessed
              with finding the perfect reference pictures and helping other artists
              grow their craft.
            </p>

            <p className="writing fs4">
              Jef has exhibited across the UK and contributes to a rag-tag band of
              underground comix and zines.
            </p>

          </div>
        </section>

        {/* FOREST PIC */}
        <section className="zine-section alt  halftone-bg">
          <div className="zine-image-wrap-box center">
              <div className="zine-image-wrap skew-left">
                <img src={jeferzForest} alt="jeferz forest" />
              </div>
          </div>
        </section>

        {/* ADS */}
        {/* <HorizontalAds /> */}

        {/* SECTION: WHAT */}
        <section className="zine-section alt">
          <div className="zine-panel">
            <h3 className="zine-heading">WHAT?</h3>

            <p className="writing fs4">
              SketchDrawDoodle gives artists instant access to millions of epic public domain pictures with preconfigured filters and practice sessions that help you find inspiration and level up your drawing. 
            </p>
 
            <p className="writing fs4">
              From Traditional Life Drawing, to Landscapes, technology, Dragons, Devils Angels and with much much more to come. 
              The aim is to make the greatest drawing app in the Galaxy!..Or at least a lot of fun.
            </p>
            <button  onClick={(e) => handleClick(e, "coffee-section")} className="zine-cta big">
              Buy Me a Brew →
            </button>
          </div>
        </section>




        {/* SECTION: WHY */}
        <section className="zine-section  halftone-bg">
          <div className="zine-panel">
            <h3 className="zine-heading">WHY?</h3>
            <p className="writing fs4">
              The app is free because art should be accessible to all. But hosting and
              development are costly and takes alot of time. If Sketch Draw Doodle helps you, please consider
              contributing something to its upkeep and continued development.
            </p>



          </div>
        </section>

        {/* SECTION: Nerdzone */}
        <section className="zine-section alt  halftone-bg">
          <div className="zine-panel">
            <h3 className="zine-heading">DevBlog</h3>
            <p className="writing fs4">
              If you like techy stuff, the devblog has a more in depth look at the process 
              of building SketchDrawDoodle 
            </p>


            <button  onClick={(e) => handleClick(e, "devblog-section")} className="zine-cta big">
              Danger NerdZone→
            </button>
          </div>
        </section>
        
      </div> {/* end  zine-section-wrapper */}

      {/* FOOTER */}
      <div className="zine-footer">
        <SocialMediaLinks />
      </div>




    </div> // end Journey-zine 
  );
}
