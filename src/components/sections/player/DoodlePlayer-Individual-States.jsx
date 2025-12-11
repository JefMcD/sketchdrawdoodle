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

  const [isPaused, setIsPaused] = useState(false);     // If the pause button pressed and the player is paused
  const [isPortrait, setIsPortrait] = useState(true);  // orientation of the image
  const [isFullScreen, setIsFullScreen] = useState(true); // fullscreen or windowed
  const [isStopped, setIsStopped] = useState(false)    // viewer has been stopped and is waiting confirmation to quit or return to drawing

  return(
    <div className="pic-player-main-window">
      {isStopped &&<ConfirmQuit 
        setIsDrawing={setIsDrawing} 
        setIsStopped={setIsStopped}
        setIsPaused={setIsPaused}
      />}
      <div className="playerImage">
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

