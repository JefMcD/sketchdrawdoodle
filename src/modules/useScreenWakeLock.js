// src/utils/useWakelock.js   ← plain JavaScript, no TypeScript
import React from 'react'

let wakeLock = null;

// Request the wake lock
async function requestWakeLock() {
  if ("wakeLock" in navigator) {
    try {
      wakeLock = await navigator.wakeLock.request("screen");
      console.log("Screen wake lock activated");

      // Optional: listen if the system releases it (very rare)
      wakeLock.addEventListener("release", () => {
        console.log("Screen wake lock was released by the system");
      });
    } catch (err) {
      console.warn("Wake lock request failed:", err);
    }
  }
}

// Release the wake lock
async function releaseWakeLock() {
  if (wakeLock !== null) {
    await wakeLock.release();
    wakeLock = null;
    console.log("Screen wake lock released");
  }
}

// React hook — this is the easiest way to use it
function useScreenWakeLock(isDrawing) {
  React.useEffect(() => {
    if (isDrawing) {
      requestWakeLock();
    }

    // Cleanup: release when component unmounts OR when isDrawing becomes false
    return () => {
      releaseWakeLock();
    };
  }, [isDrawing]); // re-run only when isPlaying changes
}

export { useScreenWakeLock, requestWakeLock, releaseWakeLock };