import { useState, useEffect, useRef, useReducer } from "react";
import {useScreenWakeLock} from "@modules/useScreenWakeLock.js";

import PlayBtn       from "@components/sections/player/buttons/PlayBtn";
import PauseBtn      from "@components/sections/player/buttons/PauseBtn";
import StopBtn       from "@components/sections/player/buttons/StopBtn";
import NextBtn       from "@components/sections/player/buttons/NextBtn";
import PrevBtn       from "@components/sections/player/buttons/PrevBtn";
import LandscapeBtn  from "@components/sections/player/buttons/LandscapeBtn";
import PortraitBtn   from "@components/sections/player/buttons/PortraitBtn";
import ConfirmQuit   from "@components/sections/player/ConfirmQuit";
import RewardPopUp   from "@components/sections/player/RewardPopUp";

//import FullScreenBtn from "@components/sections/player/buttons/FullScreenBtn";
//import NormScreenBtn from "@components/sections/player/buttons/NormScreenBtn";

const ACTIONS = {
  START          : "START",          // Picture Viewer mounted when isDrawing state set to true in the SketchDrawDoodle component
  INITIALIZED    : "INITIALIZED",    // State machine ready to showfirst pic
  LOAD_NEXT_STEP : "LOAD_NEXT_STEP", // Active step finished and moving to the next step in the step_order 
  NEXT_PIC       : "NEXT_PIC",       // Move to the next pic in the image list or first if end of list
  PREV_PIC       : "PREV_PIC",       // Move to the previous pic in the image list or ignore if start of list
  URLVALID       : "URLVALID",       // Unneeded until using old URL's
  TIME_ELAPSED   : "TIME_ELAPSED",   // Active Pic's time has elapsed
  PAUSE          : "PAUSE",          // The viewer is paused 
  PLAY           : "PLAY",           // Resume playback 
  STEP_COMPLETE  : "STEP_COMPLETE",  // Individual step has displayed all pics
  ALL_STEPS_COMPLETE: "ALL_STEPS_COMPLETE", // Every step completed
  TOGGLE_ROTATION: "TOGGLE_ROTATION",
  STOP           : "STOP",            // Player is stopped and waiting confirmation to quit
  CANCEL_QUIT    : "CANCEL_QUIT",
  CONFIRM_QUIT   : "CONFIRM_QUIT",
  FINISHED       : "FINISHED"
};

// === INITIAL STATE ===
const initialState = {
  status            : "Idle", // the state of the machine
  activeStep        : 0,      // the practice step currently being run
  activeImgIndex    : 0,      // the current image index in the image_list
  picsShown         : 0,      // the total number of pics show for a step
  activeImgURL      : null,   // webformatURL of image in image_list object
  isPaused          : null,   // If the pause button pressed and waiting to return to drawing
  isStopped         : null,   // viewer has been stopped and is waiting confirmation to quit or return to drawing
  isPortrait        : null,   // orientation of the image
  rotationClass     : "",
  error             : null,   // Error occurred
  timeStart         : 0,      // Time when a picture started in viewer          
  timeRemaining     : 0,      // The time the picture has remaining in the setTimeout(). Can be full or partial if it is paused/stopped and resumed
};

// == Player Reducer. State Machine ==>
function playerReducer(state, action){
  let newIndex = 0;
  let newURL = null;

  function getNextImage(){
    let newIndex = 0;
    let newURL = null;
    let imgPackage = {};
    // check if end of imageList
    const maxPicIndex = action.imageList.length-1;
    if (state.activeImgIndex === maxPicIndex){
        newIndex = 0;
    }else{        
        //  Step still running and pictures incomplete. play next picture 
        newIndex = state.activeImgIndex+1;
    };
    newURL = action.imageList[newIndex].webformatURL;
    imgPackage = {
      newIndex: newIndex,
      newURL: newURL,
    }
    return imgPackage;
  }
  function getPrevImage(){
    let newIndex = 0;
    let newURL = null;
    let imgPackage = {};
    // check if start of imageList
    const maxPicIndex = action.imageList.length-1;
    if (state.activeImgIndex === 0){
        newIndex = 0; // clicking prev in first image will do nothing
    }else{        
        //  Step still running and pictures incomplete. play next picture 
        newIndex = state.activeImgIndex-1;
    };
    newURL = action.imageList[newIndex].webformatURL;
    imgPackage = {
      newIndex: newIndex,
      newURL: newURL,
    }
    return imgPackage;
  }

    switch (action.type) {
      // ====================== IDLE → LOADING ======================
      case ACTIONS.START:{
        const firstStep = action.stepList[0].step_order;
        const firstPicURL = action.imageList[0].webformatURL; 
        const displayTimeMs = action.stepList[0].display_time * 1000;
        const startTimer = new Date().getTime(); //the time in milliseconds(since 1/1/1970) 

        return {
          ...state,
          status        : "Playing",
          activeStep    : firstStep,   // First step is always 0 (to align with array idices)     
          activeImgIndex: 0,           // First image in the imageList
          picsShown     : 0,           // No pics have been fully shown ie completed their time
          activeImgURL  : firstPicURL, // webformatURL of image in image_list object
          isPaused      : false,       // Not paused
          isStopped     : false,       // viewer is playing
          isPortrait    : true,        // Portrait orientation
          rotationClass : "rotate-0",  // The rotation of the image
          error         : false,       // Error occurred
          timeStart     : startTimer,  // The time in Ms when the pic is loaded into the viewer 
          timeRemaining : displayTimeMs, // The full display time in milliseconds
        };
      }
      case ACTIONS.TIME_ELAPSED:{
        // check if step is complete

        const now = new Date().getTime()
        const newPicsShownCount = state.picsShown+1; 
        const num_pics = action.stepList[state.activeStep].num_pics;
        const displayTimeMs = action.stepList[0].display_time * 1000;
        if(newPicsShownCount === num_pics){
          // update state and get new step
          return playerReducer(state, { type: ACTIONS.STEP_COMPLETE, stepList: action.stepList, imageList: action.imageList });
        }
        const {newIndex, newURL} = getNextImage();
        return{
          ...state,
          status: "Playing",
          activeImgIndex: newIndex,
          activeImgURL : newURL,
          picsShown : newPicsShownCount,
          timeStart: now, 
          timeRemaining: displayTimeMs
        }
      }

      case ACTIONS.STEP_COMPLETE:{
        // check if last step
        let lastStep = action.stepList.length;
        const newStep = state.activeStep+1;
        const newPicsShownCount = 0;
        const {newIndex, newURL} = getNextImage();
        if (newStep === lastStep){
          return playerReducer(state, { type: ACTIONS.ALL_STEPS_COMPLETE});
        };

        return{
          ...state,
          status: "Playing",
          activeStep: newStep,
          activeImgIndex: newIndex,
          activeImgURL : newURL,
          picsShown : newPicsShownCount
        }
      }

    case ACTIONS.ALL_STEPS_COMPLETE:{
      return {
        ...state,
        status: "Congratulations",
      }
    }

    case ACTIONS.NEXT_PIC:{
      const {newIndex, newURL} = getNextImage();
      return{
        ...state,
        status: "Playing",
        activeImgIndex: newIndex,
        activeImgURL : newURL
      }
    }
    case ACTIONS.PREV_PIC:{
      const {newIndex, newURL} = getPrevImage();
      return{
        ...state,
        status: "Playing",
        activeImgIndex: newIndex,
        activeImgURL : newURL
      }
    }

    case ACTIONS.PAUSE:{
      const start = state.timeStart;
      const now = new Date().getTime();
      const timeRemaining = state.timeRemaining - (now - start)
      return{
        ...state,
        status: "Paused",
        isPaused: true,
        timeRemaining: timeRemaining
      }
    }

    case ACTIONS.PLAY:{
      const now = new Date().getTime();
      const displayTimeMs = action.stepList[0].display_time * 1000;

      return{
        ...state,
        status: "Playing",
        isPaused: false,
        timeStart: now,
      }
    }

    case ACTIONS.STOP:{
      const start = state.timeStart;
      const now = new Date().getTime();
      const timeRemaining = state.timeRemaining - (now - start)
      return { 
        ...state,
        status: "Paused",
        isPaused: true,
        isStopped: true ,
        timeRemaining: timeRemaining
      };
    }

    case ACTIONS.CANCEL_QUIT:{
      const now = new Date().getTime();
      return { 
        ...state, 
        status: "Playing",
        isStopped: false,
        isPaused: false, 
        timeStart: now
      };
    }

    case ACTIONS.CONFIRM_QUIT:{
      return { 
        ...state, 
        status: "Finished", 
        isStopped: false };
    }

    case ACTIONS.FINISHED:{
      return{
        ...state,
        status:"Finished"
      }
    }

    case ACTIONS.TOGGLE_ROTATION:{
      const rotation = state.isPortrait;
      return{
        ...state,
        isPortrait    : !rotation,
        rotationClass : rotation ? "rotate-90" : "rotate-0"
      }

    }

  }
}


export default function DoodlePlayer({
  isDrawing, // true | false is the doodler drawing or not
  setIsDrawing, // is the player actively running or not
  practicePayload, // data retrieved from the sketchdrawdoodle api
  setActiveSection, // sets active section after player finished
  formData
}){

  // Keep the screen on while drawing
  useScreenWakeLock(isDrawing);
  
  //== Unpack practicePayload
  const imageList = practicePayload.image_list;
  const stepList  = formData.drillChoice.steps;

  const [state, dispatch] = useReducer(playerReducer, initialState);
  const timerRef = useRef(null);

  // Initialising step. Run on component first mount
  useEffect(()=>{

    // Run only on initialization

    // set state to Initializing
    dispatch({
        type: ACTIONS.START,
        stepList: stepList,
        imageList: imageList
    });



  },[]); // no dependencies in array. run on mount only not on re-render




  // wait for the apporopriate time to allow picture to be shown
  useEffect(()=>{
    // == Reset timer for picture when pause is hit or stop is clicked or currentStep changes
    if (state.status !== "Playing" || state.isPaused || state.isStopped) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const newPicsShownCount = state.picsShown+1; 
    const step = stepList[state.activeStep];
    const num_pics = step.num_pics;
    const displayTimeMs = state.timeRemaining;

    // step time_delay
    // === get step number and display time for picture (seconds * 1000 = milliseconds)
    timerRef.current = setTimeout(() => {
      dispatch({ type: ACTIONS.TIME_ELAPSED, stepList:stepList, imageList: imageList});
    }, state.timeRemaining);

    // == reset timer when component unmounts and re-renders for next image or paused
    return () => clearTimeout(timerRef.current);

  })

  useEffect(()=>{
    if(state.status==="Finished"){
      setIsDrawing(false)
    }
  },[state.status])

  /* Color wheel and Kelvin scale modals with color picker. Super useful for color studies */
  return(
    <div className="pic-player-main-window">

      <div className="pic-player-logo-container fs5">
        www.sketchdrawdoodle.com
      </div>

      {/* 
        // Pro feature Color Picker and Kelvin Scale
        <div className="player-color-tools-container">
        <div>KelvinScaleAndColorWheel</div>
        </div> 
      
      */}
      <div className="pic-player-flex-container">
        {state.isStopped &&<ConfirmQuit setIsDrawing={setIsDrawing} dispatch={dispatch}/>}
  
        {state.status === "Congratulations" && <RewardPopUp setIsDrawing={setIsDrawing} setActiveSection={setActiveSection}/>}
  
        <div className={`active-pic-container ${state.rotationClass}`}>
          <img className="active-pic" src={state.activeImgURL} alt="image description" />
        </div>

        <div className="player-icons-wrapper">
          <div className="player-icons-box">
            <PrevBtn onClick={() => dispatch({ type: ACTIONS.PREV_PIC, imageList: imageList, stepList: stepList })}/>
            {state.isPaused ? (
              <PlayBtn onClick={() => dispatch({ type: ACTIONS.PLAY, stepList: stepList})} />
            ):(
              <PauseBtn onClick={() => dispatch({ type: ACTIONS.PAUSE, stepList: stepList})} />
            )}
            <StopBtn onClick={()=>dispatch({type: ACTIONS.STOP})}/>
            <NextBtn onClick={() => dispatch({ type: ACTIONS.NEXT_PIC, imageList: imageList, stepList: stepList })}/>
            {state.isPortrait ? (
              <LandscapeBtn onClick={()=>dispatch({type:ACTIONS.TOGGLE_ROTATION})}/>
            ): (
              <PortraitBtn onClick={()=>dispatch({type:ACTIONS.TOGGLE_ROTATION})}/>
            )}

          </div>
        </div> {/* end player-icons-wrapper */}


      </div> {/* end pic-player-flex-container */}
    </div> // end pic-player-main-window
  )
}





  // Validate URL to ensure no broken links. This is probably unnecessary and definitely not a priority in early access
  // useEffect(()=>{
  //   if (state.status !== "ValidatingUrl") return;
  //   // check pic URL is valid
  //   // if URL is invalid dispatch error state
  //   // if URL ok dispatch to Playing state. Image URLs have just been fetched live so should be fresh and ok 99.99999999% of the time
  //   dispatch({
  //     type: ACTIONS.URLVALID,
  //     drillArr, stepList,
  //     imageArr, imageList
  //   })
  // },[state.status])