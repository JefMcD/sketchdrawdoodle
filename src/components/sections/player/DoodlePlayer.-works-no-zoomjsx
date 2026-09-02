import { useState, useEffect, useRef, useReducer } from "react";
import {useScreenWakeLock} from "@modules/useScreenWakeLock.js";
import {formatTime, numToText} from "@modules/timeUtils.js"

import PlayBtn       from "@components/sections/player/buttons/PlayBtn";
import PauseBtn      from "@components/sections/player/buttons/PauseBtn";
import StopBtn       from "@components/sections/player/buttons/StopBtn";
import NextBtn       from "@components/sections/player/buttons/NextBtn";
import PrevBtn       from "@components/sections/player/buttons/PrevBtn";
import LandscapeBtn  from "@components/sections/player/buttons/LandscapeBtn";
import PortraitBtn   from "@components/sections/player/buttons/PortraitBtn";
import TagsToggleBtn from "@components/sections/player/buttons/TagsToggleBtn";

import ConfirmQuit   from "@components/sections/player/ConfirmQuit";
import RewardPopUp   from "@components/sections/player/RewardPopUp";

import Spinner  from "@components/Spinner";



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
  TOGGLE_TAGS    : "TOGGLE_TAGS",    // Toggle the pictures tags on/off
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
  status            : "Idle", // the overall state of the machine. 
  isStarting        : true,   // After the initial state is set this set to false. Used to display a spinner during initialization
  activeStep        : 0,      // the practice step currently being run
  activeImgIndex    : 0,      // the current image index in the image_list
  picsShown         : 0,      // the total number of pics show for a step
  activeImgURL      : null,   // webformatURL of image in image_list object
  preloadImgURL     : null,   // the preloaded image to be displayed after the current active image
  isPaused          : null,   // If the pause button pressed and waiting to return to drawing
  isStopped         : null,   // viewer has been stopped and is waiting confirmation to quit or return to drawing
  isPortrait        : null,   // orientation of the image
  rotationClass     : "",
  error             : null,   // Error occurred
  timeStart         : 0,      // Time when a picture started in viewer          
  timeRemaining     : 0,      // The time the picture has remaining in the setTimeout(). Can be full or partial if it is paused/stopped and resumed
  picTime           : 0,      // The length of time the picture is to be displayed
  picNum            : 0,      // sequence number of the picture within the step
  isTagsOn          : false,  // Tags are on or off, Boolean true or false
  tagList           : "",     // The tags the image has on pixabay
  pageURL           : "",     // The URL of the pixabay page 
  isLoading         : false    // Something is waiting to finish
};







// == Player Reducer. State Machine ==>
function playerReducer(state, action){
  let newIndex = 0;
  let newURL = null;

  function getNextImage(){
    let newIndex = 0;
    let newURL = null;
    let newPreloadIndex = 1;
    let newPreloadURL = null;
    let imgPackage = {};

    const maxPicIndex = action.imageList.length-1; // eg imageList == [image1, image2, image2] maxPictureIndex == 2
    if (state.activeImgIndex === maxPicIndex){ // eg end is activeImgIndex == 2
      // if end of imageList circle back to the beginning
        newIndex = 0;
        newPreloadIndex = 1;
    }else{        
        //  Step still running and pictures incomplete. play next picture
        // eg activeImgIndex < 2 eg 0
        newIndex = state.activeImgIndex+1; // eg 1
        newPreloadIndex = newIndex+1; // eg 2

        // bugfix: Its necessary to consider one step before the player circles back. Then preload index will be 0
        if (state.activeImgIndex === maxPicIndex - 1){ // eg 1
          newPreloadIndex = 0;
        }
    };
    newURL = action.imageList[newIndex].webformatURL;
    newPreloadURL = action.imageList[newPreloadIndex].webformatURL;

    imgPackage = {
      newIndex: newIndex,
      newURL: newURL,
      newPreloadIndex: newPreloadIndex,
      newPreloadURL: newPreloadURL
    }
    return imgPackage;
  } // End getNextImage


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
  }// End getPrevImage

  switch (action.type) {
    // ====================== IDLE → LOADING ======================
    case ACTIONS.START:{
      // initialise first step
      const firstPicURL = action.imageList[0].webformatURL;  // https://url.jpg
      const firstPreload = action.imageList[1].webformatURL
      const firstStep = action.stepList[0].step_order; // ie 0
      const displayTimeMs = action.stepList[0].display_time * 1000; // eg 30000
      const startTimer = new Date().getTime(); //the time in milliseconds(since 1/1/1970) 
      const picNum = 1;


      return {
        ...state,
        status        : "Playing",   // Status of the State Machine/Reducer
        activeStep    : firstStep,   // First step is always 0 (to align with array idices)     
        activeImgIndex: 0,           // First image in the imageList
        picsShown     : 0,           // No pics have been fully shown ie completed their time
        activeImgURL  : firstPicURL, // webformatURL of first image in image_list object
        preloadImgURL : firstPreload,// webformatURL of second image to be displayed
        isPaused      : false,       // Not paused
        isStopped     : false,       // viewer is playing
        isPortrait    : true,        // Portrait orientation
        rotationClass : "rotate-0",  // The rotation of the image
        error         : false,       // Error occurred
        timeStart     : startTimer,  // The time in Ms when the pic is loaded into the viewer 
        timeRemaining : displayTimeMs, // The full display time in milliseconds
        picTime       : action.stepList[0].display_time, // The time a picture is displayed in seconds
        picNum        : picNum,       // sequence number of the pin within the step
        tagList       : action.imageList[0].tag_list, // The list of tags returned by Pixabay for an image
        isTagsOn      : false,        // tags are not displayed by default
        picURL        : action.imageList[0].page_url,  // The url of an image 
        isLoading     : true          // The player is setting up and an image is loading
      };

    } // End START case

    case ACTIONS.TIME_ELAPSED:{
      // check if step is complete
      const picsShownCount = state.picsShown+1; 
      const numberOfPicsForThisStep = action.stepList[state.activeStep].num_pics;
      // if all pics for this step already shown, move to the next step
      if(picsShownCount === numberOfPicsForThisStep){
        // update state and get new step
        return playerReducer(state, { type: ACTIONS.STEP_COMPLETE, stepList: action.stepList, imageList: action.imageList });
      }
      
      // else move to next picture
      const now = new Date().getTime()
      const displayTimeMs = action.stepList[state.activeStep].display_time * 1000;
      const {newIndex, newURL, newPreloadIndex, newPreloadURL} = getNextImage();
      const picNum = state.picNum+1;


      return{
        ...state,
        status        : "Playing",
        activeImgIndex: newIndex,
        preloadImgURL : newPreloadURL,
        activeImgURL  : newURL,
        picsShown     : picsShownCount,
        timeStart     : now, 
        timeRemaining : displayTimeMs,
        picNum        : picNum,
        tagList       : action.imageList[newIndex].tag_list,
        picURL        : action.imageList[newIndex].page_url
      }
    } // End TIME_ELAPSED case

    case ACTIONS.STEP_COMPLETE:{
      // check if last step
      let lastStep = action.stepList.length; // The array index number of the last step
      const newStep = state.activeStep+1;
      if (newStep === lastStep){
        return playerReducer(state, { type: ACTIONS.ALL_STEPS_COMPLETE});
      };
      
      const newPicsShownCount = 0;
      const now = new Date().getTime()
      const displayTimeMs = action.stepList[newStep].display_time * 1000;
      const {newIndex, newURL} = getNextImage();
      const picNum = 1;
      return{
        ...state,
        status: "Playing",
        activeStep: newStep,
        activeImgIndex: newIndex,
        activeImgURL : newURL,
        picsShown : newPicsShownCount,
        timeStart: now, 
        timeRemaining: displayTimeMs,
        picTime       : action.stepList[newStep].display_time, // The time a picture is displayed in seconds
        picNum: picNum,
        tagList       : action.imageList[newIndex].tag_list,
        picURL        : action.imageList[newIndex].page_url
      }
    } // End STEP_COMPLETE case

    case ACTIONS.ALL_STEPS_COMPLETE:{
      return {
        ...state,
        status: "Congratulations",
      }
    } // End ALL_STEPS_COMPLETE case

    case ACTIONS.NEXT_PIC:{
      // load next picture and pre-load the one after (or first if end of list)
      const {newIndex, newURL} = getNextImage();
      return{
        ...state,
        status: "Playing",
        activeImgIndex: newIndex,
        activeImgURL : newURL,
        tagList       : action.imageList[newIndex].tag_list,
        picURL        : action.imageList[newIndex].page_url
      }
    } // End NEXT_PIC case

    case ACTIONS.PREV_PIC:{
      const {newIndex, newURL} = getPrevImage();
      return{
        ...state,
        status: "Playing",
        activeImgIndex: newIndex,
        activeImgURL : newURL,
        tagList       : action.imageList[newIndex].tag_list,
        picURL        : action.imageList[newIndex].page_url
      }
    } // End PREV_PIC case

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
    } // End PAUSE case

    case ACTIONS.PLAY:{
      const now = new Date().getTime();
      const displayTimeMs = action.stepList[0].display_time * 1000;

      return{
        ...state,
        status: "Playing",
        isPaused: false,
        timeStart: now,
      }
    } // End PLAY case

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
    } // End STOP case

    case ACTIONS.CANCEL_QUIT:{ // Cancel the QUIT and return to drawing
      const now = new Date().getTime();
      return { 
        ...state, 
        status: "Playing",
        isStopped: false,
        isPaused: false, 
        timeStart: now
      };
    } // End CANCEL_QUIT case

    case ACTIONS.CONFIRM_QUIT:{ // Finish the player after confirm
      return { 
        ...state, 
        status: "Finished", 
        isStopped: false };
    } // End CONFRIM_QUIT case

    case ACTIONS.FINISHED:{ // Finsih the player after complete
      return{
        ...state,
        status:"Finished"
      }
    }
 
    case ACTIONS.TOGGLE_ROTATION:{ // toggle Rotation of the image in the viewer
      const rotation = state.isPortrait;
      return{
        ...state,
        isPortrait    : !rotation,
        rotationClass : rotation ? "rotate-90" : "rotate-0"
      }

    } // End TOGGLE_ROTATION case

    case ACTIONS.TOGGLE_TAGS:{ // Show/Hide Tags
      const visibility = state.isTagsOn;
      return{
        ...state,
        isTagsOn: !visibility
      }
    } // End TOGGLE_TAGS case

  }
}
// == END Player Reducer. State Machine ==>



























export default function DoodlePlayer({
  isDrawing, // true | false is the doodler drawing or not
  setIsDrawing, // is the player actively running or not
  practicePayload, // data retrieved from the sketchdrawdoodle api
  setActiveSection, // sets active section after player finished
  formData
}){

  //== Unpack practicePayload
  const imageList = practicePayload.image_list;
  const stepList  = formData.drillChoice.steps;
  
  
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const timerRef = useRef(null);
  // Keep the screen on while drawing
  useScreenWakeLock(isDrawing);

  
  // Initialising step. Run on component first mount
  const [isPreLoading, setIsPreLoading] = useState(true);
  useEffect(()=>{
      // Preload first two images, then initiaize START Player. 
      const firstImage = new Image();
      const secondImage = new Image();
      
      // Load first image, then the second then dispatch START initialization
      firstImage.onload = () => { // 
        secondImage.onload =  ()=> {
          setIsPreLoading(false);
          dispatch({
              type: ACTIONS.START,
              stepList: stepList,
              imageList: imageList
          });
  
        };
        secondImage.src = imageList[1].webformatURL;
      }
      firstImage.src = imageList[0].webformatURL;


  },[]); // no dependencies in array. run on mount only not on re-render





  // wait for the apporopriate time to allow picture to be shown
  useEffect(()=>{
    // == Reset timer for picture when pause is hit or stop is clicked or currentStep changes
    if (state.status !== "Playing" || state.isPaused || state.isStopped) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    // preload subsequent image after activeImage
    const preloadImg = new Image();
      preloadImg.src = state.preloadImgURL

    const newPicsShownCount = state.picsShown+1; 
    const step = stepList[state.activeStep];
    const num_pics = step.num_pics;
    const displayTimeMs = state.timeRemaining;

    // step time_delay. setTimeout is async so dispatch callback executed when delay is completed
    // === get step number and display time for picture (seconds * 1000 = milliseconds)
    timerRef.current = setTimeout(() => {
      dispatch({ type: ACTIONS.TIME_ELAPSED, stepList:stepList, imageList: imageList});
    }, state.timeRemaining);

    // setTimeout is async so the rest og the log carries on

    // make tiny movement to the image to prevent screen dimming (or sleeping)
    let lastX = 0;
    const interval = setInterval(() => {
      // Tiny movement to keep screen on – usually enough to prevent Android from turning screen off
      window.dispatchEvent(new MouseEvent('mousemove', {
        clientX: lastX + 0.1,  // almost invisible
        clientY: 0,
        bubbles: true
      }));
      lastX = lastX === 0 ? 1 : 0;
      console.log("touch")
    }, 15000); // every 15s – adjust (10-25s usually works)

    return () => {
      // == reset timer and interval swhen component unmounts and re-renders for next image or paused
      clearInterval(interval);
      clearTimeout(timerRef.current);
    
    }

  })

  useEffect(()=>{
    if(state.status==="Finished"){
      useScreenWakeLock(false)
      setIsDrawing(false)

    }
  },[state.status])



  /* Color wheel and Kelvin scale modals with color picker. Super useful for color studies */

  return(

    isPreLoading ? (
      <div className="pic-player-main-window">
        <Spinner />
      </div>
    ):(

      <div className="pic-player-main-window">

          <div className="pic-player-logo-container fs3">
              <div className="player-label-flex"> 
                    {/* www.sketchdrawdoodle.com step:{state.activeStep} picture: {state.picNum} time: {state.timeRemaining} */}
                    www.sketchdrawdoodle.com
                    {/*Tags; {state.tagList} */}
              </div>
          </div>

          <div 
            // key: Force re-render pic-time-box when image changes //
            key= {state.activeImgIndex} 
            className = "pic-time-box">
            <div className="player-label-flex alt">
                  {formatTime(state.picTime)}
            </div>
          </div>

          

          {/* <div className="pic-player-logo-container fs3">
            URL; {state.picURL}
          </div> 
          */}

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
              {/* React rerenders img contents when it sees src value has changed  */}
              <img 
                className="active-pic" src={state.activeImgURL} alt="image description" />
            </div>

            {state.isTagsOn && 
              <div className="pic-player-tags-container fs3">
                {state.tagList} 
              </div>
            }


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
                <TagsToggleBtn onClick={()=>dispatch({type:ACTIONS.TOGGLE_TAGS})} />

              </div>
            </div> {/* end player-icons-wrapper */}


          </div> {/* end pic-player-flex-container */}
          
        </div> 
    )
 
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