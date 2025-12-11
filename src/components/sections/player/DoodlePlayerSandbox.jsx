import { useState, useEffect, useRef } from "react";

import PlayerNav   from "@components/sections/player/PlayerNav";
import StopBtn       from "@playerIcons/StopBtn";
import PlayBtn       from "@playerIcons/PlayBtn";
import PauseBtn      from "@playerIcons/PauseBtn";
import NextBtn       from "@playerIcons/NextBtn";
import PrevBtn       from "@playerIcons/PrevBtn";
import FullScreenBtn from "@playerIcons/FullScreenBtn";
import NormScreenBtn from "@playerIcons/NormScreenBtn";
import LandscapeBtn  from "@playerIcons/LandscapeBtn";
import PortraitBtn   from "@playerIcons/PortraitBtn";
import ConfirmQuit from "@components/sections/player/ConfirmQuit";



export default function DoodlePlayer({
  setIsDrawing, // is the player actively running or not
  practicePayload // data retrieved from the sketchdrawdoodle api
}){
  // Initialising step
  const [stepOrder, setStepOrder] = useState(1); //  Step order starts at 1 and goes to a maximum of 4
  const numPics     = useRef(0); // no re-render when value changes
  const displayTime = useRef(0); // the length of time pics in a step are displayed
 
  // 
 
  const [isFinished, setIsFinished] = useState(false); // WHen finished is true a message is displayed to say bye before closing the viewer. Is the player finished or active
  const [isAllStepsComplete, setIsAllStepsComplete] = useState(false) // Set true when all steps are complete

  const [liveImageIndex, setLiveImageIndex] = useState(0); // Start with the first image in the image_list
  const [shownPics, setShownPics] = useState(0); // The running total of pics show for a step
  const [isStepComplete, setIsStepComplete] = useState(false) // updated when all pics in a step have been shown

  const [isPaused, setIsPaused] = useState(false);     // If the pause button pressed and the player is paused
  const [isPortrait, setIsPortrait] = useState(true);  // orientation of the image
  const [isFullScreen, setIsFullScreen] = useState(true); // fullscreen or windowed
  const [isStopped, setIsStopped] = useState(false)    // viewer has been stopped and is waiting confirmation to quit or return to drawing
  
  const timerRef    = useRef(null);

  const practiceSettings = practicePayload.practiceSettings
  const drillArr = practiceSettings.drill_list;   // Array of Objs order_by("step_order") [{"num_pics":8, "step_order":1, "display_time":30}, {"num_pics": 5, "step_order": 2, "display_time": 60}, ...]
  const totalSteps = drillArr.length;

  const imageArr = practicePayload.imageList;
  const maxImages = imageArr.length;

  const timeObj  = practiceSettings.time_dict;    // Obj {"duration": total_practice_time, "description":"30 minute warmup drill"}
  const modeObj  = practiceSettings.mode_dict;    // Obj {"name":"warmup", "description":"warmup sketching"}
  const currentStep = drillArr[stepOrder];
  const currentImage = imageArr[liveImageIndex];
  
  for(let attr in currentImage){
    console.log(`key: ${attr} value: ${attr}`)
  }

  // Each time stepOrder changes the component renders and the useEffect hook runs
  // This means that useEffect is a defact loop. Reset counters when step changes
  // Initialise values for step. Called every time stepOrder state changes
  useEffect(() => {

    setShownPics(0); // reset shown pics to zero for every step
    setIsStepComplete(false) // reset step complete status to false
    numPics.current = drillArr[stepOrder].numPics;
    displayTime.current = drillArr[stepOrder].displayTime
  }, [stepOrder]);


  // Main auto-advance timer. Called everytime all pics in a step have been shown. ie shownPics===numPics
  useEffect(() => {
    if (isPaused || isFinished || !currentStep) return;

    // All steps done? steoOrder will be one greater than totalSteps when all are complete
    if (stepOrder > totalSteps) {
      setIsAllStepsComplete(true)
      setIsFinished(true);
      return;
    }

    // recycle images if skipped to end of image_list
    let newImageIndex = 0; // initialise to zero by default
    if(liveImageIndex < maxImages){
      newImageIndex = liveImageIndex+1; // get next available image index
    };
    setLiveImageIndex(newImageIndex);

    // Shown all pics for this step?
    if (shownPics >= numPics) {
      setStepOrder(prev => prev + 1);
      return;
    }

    setShownPics(prev => prev + 1);

    timerRef.current = setTimeout(() => {
    }, displayTime * 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [liveImageIndex, shownPics, stepOrder, isPaused, isFinished, currentStep]);










  //const [isPaused, setIsPaused] = useState(false);
 

  return(
    <div className="pic-player-main-window">
      {isStopped &&<ConfirmQuit 
        setIsDrawing={setIsDrawing} 
        setIsStopped={setIsStopped}
        setIsPaused={setIsPaused}
      />}
      <div className="playerImage">
        <img src={currentImage.webformatURL} />
      </div>
      <div className="player-icons-wrapper">
        <div className="player-icons-box">
          <PrevBtn />
          {isPaused ? (
            <PlayBtn  setIsPaused={setIsPaused} />
          ):(
            <PauseBtn setIsPaused={setIsPaused} />
          )}
          <StopBtn setIsStopped={setIsStopped} setIsPaused={setIsPaused}/>
          <NextBtn />
          {isPortrait ? (
            <LandscapeBtn setIsPortrait={setIsPortrait}/>
          ): (
            <PortraitBtn setIsPortrait={setIsPortrait}/>
          )}
          {isFullScreen ? (
            <NormScreenBtn setIsFullScreen={setIsFullScreen}/>
          ):(
            <FullScreenBtn setIsFullScreen={setIsFullScreen}/>
          )}
        </div>
      </div>
    </div>
  )
}

