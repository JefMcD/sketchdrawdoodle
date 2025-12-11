import {useRef} from "react";

export default function RewardPopUp({
  setIsDrawing,
  setActiveSection
}){
  function handleRewardClick(){
    setIsDrawing(false);
  };
  function handleCTAClick(e){
    e.stopPropagation();
    setIsDrawing(false);
    setActiveSection("coffee-section")
  };
  const finishBla = [
    {label:"Hero",           message:"Smashing! You levelled up your art superpowers.Feeling the flow?", cta:"🎉 Fan The Flames"},
    {label:"Sketch Samurai", message:"Great work! Your lines are getting sharper than the mighty blade of Nabushini!", cta:"🎉 POW!"},
    {label:"Done!",          message:"That’s a wrap! Another cool page for the sketchbook", cta: "🎉 Nice! 🎉"},
    {label:"XP Boost",       message:"Session crushed! +10 skill points added to your art stats.", cta:"🎉 Pump It Up!"},
    {label:"Brush Warrior",  message:"Nice! You battled through every picture like a pro.", cta:"Power Up! 🎉"},
    //{label:"Cosmic",         message:"Boom! You just blasted through another art drill", cta:"Cosmic!"},
    {label:"Improving!",     message:"Awesome sketching today — regular practice is the way to drawsomeness", cta:"Yay! 🎉"},
    {label:"Phew!",          message:"Practice finished! Time for a brew?", cta:"Coffee Time"},
    //{label:"Inktastic!",     message:"Assessment: You crushed it.", cta:"Boom!"},
    {label:"Congrats",       message:"Nice work! Every practice builds your artist instincts", cta:"🎉 Zap!"},
    {label:"ZAP!",           message:"You just fried that drill with intense drawing energy!", cta:"🎉 Recharge!"},
    {label:"Kapow!",         message:"That practice didnt stand a chance", cta:"🎉 RAAWRR!"},
    {label:"BZZT",           message:"Those line were electifiying today.", cta:"🎉 Buzzing!"},
    {label:"OMG!",           message:"That was some seriously impressive sketching", cta:"🎉 Keep Rollin!"},
    {label:"BANG!",          message:"You blasted through that like a stick of dynamite in a jelly factory!", cta:"🎉 SPLAT! 🎉"},
    {label:"POW!",           message:"Another drill knocked out of the ball park!", cta:"🎉 Keep Flyin!"},
    {label:"COOL",           message:"Slick, Clean and Confident", cta:"Smooth!"},
    {label:"RIBBIT",         message:"You hopped through that like a frog chillin on a lilly with a silly cigar!", cta:"🎉 Hippidy Hop! 🎉"},
    {label:"MOO!",           message:"That was udderly fantastic!", cta:"🎉 Bubbub 🎉"},
    {label:"Meow",           message:"Sleek and smooth, your claws are showin!", cta:"🎉 Ouch! 🎉"},
    {label:"Woof!",          message:"Dogged, determined and strong to the finish", cta:"🎉 How! 🎉"},
    {label:"Howl",           message:"That was a wild run at the full moon", cta:"🎉 Risin! 🎉"},
    {label:"Yap",            message:"Energetic and full of bite, great practice", cta:"🎉 Did I draw Blood? 🎉"},
    //{label:"ARGH!",          message:"You battled through and came out victorious", cta:"🎉 Hero Pose!"},
    {label:"SLITHER",        message:"Smooth lines, sneaky improvement and super cool", cta:"🎉 Evolving 🎉"},
    {label:"HISSS",          message:"Did you just swallow a whole Goat?", cta:"🎉 Yup!"},
    {label:"Quack!",         message:"Looks like you've quacked it! Thats Another practice under your belt ", cta:"🎉 Hellyea! 🎉"},
    {label:"Whoop",          message:"Big win! That drill was a total success!", cta:"🎉 Yup!"},
    {label:"Boing!",         message:"Bouncy energy and solid progress — you're leveling up fast!", cta:"🎉 Zoomies!"},
    {label:"WHAM!",          message:"Wham Bam thank you mam! That drill never saw you coming", cta:"🎉 Go Go Go!"},
    //{label:"POOF",           message:"As if by magic — another session artfully conjured up!!", cta:"🎉 Abracadabra!"},
    
    {label:"ZAP",            message:"Your doodles just unlocked a burst of magical sparkle-power!", cta:"✨ Glitter Bomb! ✨"},
    {label:"BzzT",           message:"Your creative energy is buzzing!", cta:"Spellcasting"},
    {label:"OMG!",           message:"Stop it, seriously — your art is looking too cute right now!", cta:"💕 Cute! 💕"},
    {label:"BANG!",          message:"Boom! A confetti bomb of pure artistic brilliance!", cta:"✨Sprrrrooop✨"},
    {label:"POW",            message:"You just inleashed the art with adorable, unstoppable talent!", cta:"🌟 POW 🌟"},
    {label:"COOL",           message:"Your lines are crisp, your style is chill — frosty vibes activated!", cta:"❄️Frosty❄️"},
    //{label:"RIBBIT",         message:"You magically hopped through that drill — lily-pad level achieved!", cta:"🐸 Slurp! 🐸"},
    {label:"MOO",            message:"A-moo-zing work! Your drawing muscles are udderly fabulous!", cta:"🐮 Parp! 🐮"},
    {label:"OINK",           message:"Cute chaos achieved — you doodled like a happy little pigles!", cta:"🐷 Snurfle 🐷"},
    {label:"Chirp!",         message:"Your creativity is on song — a whole flock of beautiful ideas!", cta:"🐦 La la la 🐦"},
    {label:"MEOW!",          message:"Soft paw-strokes and perfect lines — pure kitty-core cuteness!", cta:"🍠 Yam 🍠"},
    {label:"WOOF",           message:"Playful, inquisitive, fun with the occaisonal mess now an then. Yes you *are* a good pup!", cta:"🐶 Grrr 🐶"},
    //{label:"HOWL",           message:"Your creativity just glowed like a moonlit magical transformation!", cta:"🌕 Shazam 🌕"},
    {label:"YAP",            message:"Quick, playful, and full of spark — your sketch energy is contagious!", cta:"🐾 Nose Boop 🐾"},
    {label:"SLITHER",        message:"Elegant, smooth, and stylish — you glided through this drill effortlessly.", cta:"🐍 Hmmmmm? 🐍"},
    {label:"QUACK",          message:"Look at you go! Today’s progress deserves a whole sparkle-parade!", cta:"🦆 WHOOP! 🦆"},
    //{label:"KABOOM",         message:"A glitter bomb of talent just exploded — your skills are skyrocketing!", cta:"💥 BOING! 🫧"},
    //{label:"WHAM",           message:"Kiss-of-inspiration delivered With a puff of stardust and charm", cta:"🌬️ Poof! 🌬️"},
    //    {label:"",            message:"", cta:""},
    
    // {label:"ARGH",           message:"That was a dramatic romance-arc moment — and you absolutely triumphed!", cta:""},
    //{label:"HISSS",          message:"A little sass, a little flair — fabulous ass and boufant hair!", cta:""},


  ]

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const endBlurb = useRef(0);
  const blaNum = finishBla.length;
  endBlurb.current = finishBla[getRandomInt(blaNum)];


  return(
    <div className="reward-box">

        
          {/* SECTION: WHAT */}
          <div onClick={handleRewardClick} className="zine-section-wrapper ">
            <section className="zine-section alt">
              <div className="zine-panel">
                <h3 className="zine-heading">{endBlurb.current.label}</h3>

                <p className="writing fs4">
                  {endBlurb.current.message}
                </p>

                <div onClick={handleCTAClick} className="zine-cta text-container center" id="finished-cta">
                    <div className="cta-button fs4 text-link" >
                        {endBlurb.current.cta}
                    </div>
                </div>
              </div>
            </section>
        </div>
    </div>
  )
}


/*
1. Romance / Cute / Sparkly (your current request’s vibe)

Think: sparkles, glitter, hearts, pastel chaos.

Examples:

“Your lines are smoother than lip gloss on a first date.”

“You just drew so well Cupid is jealous.”

(I can generate full CTA/label/message sets for these anytime.)

🎨 2. Art School / Pretentious Art Critic

Think: sarcastic gallery snobs, lofty praise, accidental genius.

Examples:

“Bold. Evocative. Slightly worrying. I love it.”

“Your shading just caused a beret to fall off somewhere in Paris.”

🦸‍♀️ 3. Superhero / Comic Book Action

Classic POW! WHAM! but also mentoring hero moments.

Examples:

“You’ve unlocked Ultra-Precision Mode!”

“Your sketching speed now qualifies as a superpower.”

🐙 4. Cosmic / Weird / Lovecraftian / Surreal

Because why not let your drill end with existential dread wrapped in jokes.

Examples:

“Reality bent slightly as you finished that drawing.”

“A small tentacle applauds your effort.”

🐸 5. Cute Animals / Wholesome Vibes

Soft, cosy, silly animal commentary.

Examples:

“A tiny bunny just awarded you 3 kindness points.”

“A frog in a beret says your perspective is magnifique.”

✨ 6. RPG / Fantasy Quest

Swords, magic, XP points, quest rewards.

Examples:

“+10 XP! You are now a Level 3 Gesture Mage.”

“Your pencil is now enchanted with +2 Flow.”

🔧 7. Sci-Fi / Mecha / Cyberpunk

Think neon, tech jargon, cyber upgrades.

Examples:

“Neural sketch implant successfully calibrated.”

“Line stability increased by 12%.”


*/