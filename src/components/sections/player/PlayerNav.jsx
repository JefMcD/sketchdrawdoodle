
import {useState} from "react";

import CloseBtn      from "@playerIcons/CloseBtn";
import StopBtn       from "@playerIcons/StopBtn";
import PlayBtn       from "@playerIcons/PlayBtn";
import PauseBtn      from "@playerIcons/PauseBtn";
import NextBtn       from "@playerIcons/NextBtn";
import PrevBtn       from "@playerIcons/PrevBtn";
import FullScreenBtn from "@playerIcons/FullScreenBtn";
import NormScreenBtn from "@playerIcons/NormScreenBtn";
import LandscapeBtn  from "@playerIcons/LandscapeBtn";
import PortraitBtn   from "@playerIcons/PortraitBtn";

export default function PlayerNav({
  setIsDrawing,
  isPaused,
  setIsPaused,
  isPortrait,
  setIsPortrait,
  isFullScreen,
  setIsFullScreen,
  isStopped,
  setIsStopped
}){

  return(
      <div className="player-icons-wrapper bottom-fixed">
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
  )
}