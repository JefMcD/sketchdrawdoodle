// DoodlePlayer.jsx
import { useReducer, useEffect, useRef } from "react";
import ConfirmQuit from "@components/sections/player/ConfirmQuit";

import PlayBtn       from "@components/sections/player/buttons/PlayBtn";
import PauseBtn      from "@components/sections/player/buttons/PauseBtn";

// === ACTION TYPES ===
const ACTIONS = {
  START: "START",
  LOAD_NEXT_IMAGE: "LOAD_NEXT_IMAGE",
  IMAGE_LOADED: "IMAGE_LOADED",
  FETCH_ERROR: "FETCH_ERROR",
  STEP_COMPLETE: "STEP_COMPLETE",
  NO_MORE_STEPS: "NO_MORE_STEPS",
  ENTER_PLAYING: "ENTER_PLAYING",
  TIMER_TICK: "TIMER_TICK",
  TIME_ELAPSED: "TIME_ELAPSED",
  PAUSE: "PAUSE",
  RESUME: "RESUME",
  NEXT: "NEXT",
  PREV: "PREV",
  STOP: "STOP",
  CONFIRM_QUIT: "CONFIRM_QUIT",
  CANCEL_QUIT: "CANCEL_QUIT",
  QUIT: "QUIT",
};

// === INITIAL STATE ===
const initialState = {
  status: "Idle", // matches state machine
  currentStep: 0,
  currentImageIndex: 0,
  picsShown: 0,
  currentImageUrl: null,
  isPaused: false,
  isFullScreen: true,
  isPortrait: true,
  error: null,
  totalSteps: 0,
  timerId: null,
};

// === REDUCER (Your State Machine in Code) ===
function playerReducer(state, action) {
  console.log("playerReducer")

  switch (action.type) {
    // ====================== IDLE → LOADING ======================
    case ACTIONS.START:
      const totalSteps = action.drillArr.length; // 
      const firstStep = action.drillArr[0].step_order
      console.log(`step = ${firstStep}`)
      return {
        ...state,
        status: "LoadingImage",
        totalSteps: totalSteps,
        currentStep: firstStep,
        currentImageIndex: 0,
        picsShown: 0,
      };

    // ====================== STEP LOADING ======================
    case ACTIONS.LOAD_NEXT_IMAGE:
      const currentStep = state.currentStep;
      console.log(`currentStep = ${currentStep}`);
      console.log(`num_pics = ${action.drill_list[currentStep].num_pics}`);
      console.log(`picsShown = ${state.picsShown}`);

      const stepObj     = action.drill_list[currentStep];
      console.log(`stepObj = ${stepObj}`);

      const nextPic = state.currentImageIndex+1;
      const picsShownCount = state.picsShown+1;
      // == Check if all pics shown for step
      if(picsShownCount === currentStep.num_pics){ 
        // all pics shown for step. move to next step
        playerReducer(state, { type: ACTIONS.STEP_COMPLETE, drill_list: action.drill_list, image_list: action.image_list });
      };

      // reset currentImageIndex if last image reached. eg too many next clicks -> recycle images
      const maxImages = action.image_list.length;
      if(state.currentImageIndex === maxImages){
        return {
          ...state,
          currentImageIndex: 0
        }
      }

      // Trigger LoadingImage State 
      return { 
        ...state, 
        status: "LoadingImage",
        currentImageIndex: nextPic,
        picsShown: picsShownCount
        
      };

      // if (state.picsShown >= step.num_pics) {
      //   return state.currentStep + 1 < state.totalSteps
      //     ? playerReducer(state, { type: ACTIONS.STEP_COMPLETE })  // move on to next step
      //     : playerReducer(state, { type: ACTIONS.NO_MORE_STEPS }); // Last step complete
      // }

    case ACTIONS.IMAGE_LOADED:
      return {
        ...state,
        status: "Playing",
        currentImageUrl: action.payload.url,
        picsShown: state.picsShown + 1,
      };

    case ACTIONS.FETCH_ERROR:
      return { ...state, status: "Error", error: action.payload };

    case ACTIONS.STEP_COMPLETE:
      return {
        ...state,
        status: "LoadingSteps",
        currentStep: state.currentStep + 1,
        picsShown: 0,
      };

    case ACTIONS.NO_MORE_STEPS:
      return { ...state, status: "Finished" };

    // ====================== PLAYING LOOP ======================
    case ACTIONS.ENTER_PLAYING:
      return { ...state, status: "Playing", isPaused: false };

    case ACTIONS.TIMER_TICK:
      // Just keep waiting
      return state;

    case ACTIONS.TIME_ELAPSED:
      console.log(`TIME_ELAPSED`)
      return playerReducer(state, 
              { type: ACTIONS.LOAD_NEXT_IMAGE,
                drill_list: action.drill_list,
                image_list: action.image_list
               }); // continue step with next image

    // ====================== PAUSE / RESUME ======================
    case ACTIONS.PAUSE:
      return { ...state, isPaused: true };
    case ACTIONS.RESUME:
      return { ...state, isPaused: false };

    // ====================== NAVIGATION ======================
    case ACTIONS.NEXT:
      const image_list = action.image_list
      const drill_list = action.drill_list
      return playerReducer(state, { type: ACTIONS.LOAD_NEXT_IMAGE, image_list:image_list, drill_list: drill_list });

    case ACTIONS.PREV:
      return playerReducer(state, { type: ACTIONS.LOAD_NEXT_IMAGE });

    // ====================== STOP CONFIRMATION ======================
    case ACTIONS.STOP:
      return { ...state, status: "Stopped" };
    case ACTIONS.CANCEL_QUIT:
      return { ...state, status: "Playing" };
    case ACTIONS.CONFIRM_QUIT:
      return { ...state, status: "Finished" };

    // ====================== QUIT ======================
    case ACTIONS.QUIT:
      return { ...state, status: "Finished" };

    default:
      return state;
  }
}

// === MAIN COMPONENT ===
export default function DoodlePlayerGrok({ 
  setIsDrawing, 
  practicePayload 
}) {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const timerRef = useRef(null);

  // Unpack Payload
  const practiceSettings = practicePayload.practiceSettings;
  const drill_list = practiceSettings.drill_list;
  // for (let obj of drill_list){
  //   console.log(`step_order: ${obj.step_order}`)
  // };

  const mode_dict  = practiceSettings.mode_dict; // never changes
  const time_dict  = practiceSettings.time_dict; // never changes
  const image_list = practicePayload.image_list; // never changes

  // === AUTO-START ON MOUNT ===
  useEffect(() => {
    if (practicePayload) {
      //dispatch({ type: ACTIONS.START, payload: practicePayload });
      dispatch({
        type: ACTIONS.START,
        drillArr: drill_list,
        imageArr: image_list
      })
    }
  }, [practicePayload]);




  // === TIMER EFFECT (Playing → Waiting → TIME_ELAPSED) ===
  useEffect(() => {
    // == Reset timer for picture when pause is hit or stop is clicked or currentStep changes
    if (state.status !== "Playing" || state.isPaused) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    // === get step number and display time for picture (seconds * 1000 = milliseconds)
    const image_list = practicePayload.image_list;
    const step = drill_list[state.currentStep];
    const displayTimeMs = step.display_time * 1000;

    // == hook timerRef to setTimeout() then dispatch TIME_ELAPSED when it completes
    timerRef.current = setTimeout(() => {
      dispatch({ type: ACTIONS.TIME_ELAPSED, drill_list:drill_list, image_list: image_list});
    }, displayTimeMs);

    // == reset timer when component unmounts and re-renders for next image
    return () => clearTimeout(timerRef.current);
  }, [state.status, state.isPaused, state.currentStep]);
  // End Wait for image time




  // === Load Picture ===
  useEffect(() => {
    if (state.status !== "LoadingImage") return;

    const imageArr = practicePayload.image_list;
    const step = drill_list[state.currentStep];
    const imageObj = imageArr[state.currentImageIndex]; // or however you index


    // Simulate fetch (replace with real Pixabay fetch)
    setTimeout(() => {
      //const picUrl = imageArr[imageId].webformatUrl;
      const picUrl = imageObj.webformatURL;
      dispatch({ type: ACTIONS.IMAGE_LOADED, payload: { url: picUrl } });
    }, 250);

    // Real fetch example:
    // fetchFreshImage(imageId).then(url => dispatch(...)).catch(err => dispatch(...))
  }, [state.status, state.currentStep, state.currentImageIndex, practicePayload]);
  // === End Show Picture ===== //





  // === HANDLE QUIT CONFIRMED ===
  const handleQuitConfirmed = () => {
    setIsDrawing(false);
    dispatch({ type: ACTIONS.QUIT });
  };

  // === EARLY EXIT: FINISHED ===
  if (state.status === "Finished") {
    return <div className="finished">Practice Complete!</div>;
  }
  

  return (
    <div className="pic-player-main-window">
      {/* CONFIRM QUIT MODAL */}
      {state.status === "Stopped" && (
        <ConfirmQuit
          onConfirm={() => {
            handleQuitConfirmed();
            dispatch({ type: ACTIONS.CONFIRM_QUIT });
          }}
          onCancel={() => dispatch({ type: ACTIONS.CANCEL_QUIT })}
        />
      )}

      {/* MAIN IMAGE */}
      <div className="playerImage">
        {state.currentImageUrl ? (
          <img src={state.currentImageUrl} alt="practice" />
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>

      {/* NAVIGATION */}
      <div className="player-icons-wrapper">
        <div className="player-icons-box">
          <button onClick={() => dispatch({ type: ACTIONS.PREV })}>Prev</button>

          {state.isPaused ? (
            <PlayBtn onClick={() => dispatch({ type: ACTIONS.RESUME })} />
          ):(
            <PauseBtn onClick={() => dispatch({ type: ACTIONS.PAUSE })}/>
          )}

          <button onClick={() => dispatch({ type: ACTIONS.STOP })}>Stop</button>

          <button onClick={() => dispatch({ type: ACTIONS.NEXT, image_list: image_list, drill_list: drill_list })}>Next</button>
        </div>
      </div>
    </div>
  );
}