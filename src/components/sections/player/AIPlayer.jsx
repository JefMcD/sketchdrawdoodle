// src/App.jsx
import { useState, useEffect, useRef } from 'react';
// import { drill_list, image_list } from './data/images';


export default function AIPlayer({
  setIsDrawing,
  practicePayload
}) {
  const [stepOrder, setStepOrder] = useState(0);
  const [liveImageIndex, setLiveImageIndex] = useState(0);
  const [shownPics, setShownPics] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef(null);

  const drill_list = practicePayload.drill_list;
  const image_list = practicePayload.image_list;

  const currentStep = drill_list[stepOrder];
  const currentImage = image_list[liveImageIndex];

  // Reset counters when step changes
  useEffect(() => {
    setShownPics(0);
  }, [stepOrder]);

  // Main auto-advance timer
  useEffect(() => {
    if (isPaused || isFinished || !currentStep) return;

    timerRef.current = setTimeout(() => {
      // All steps done?
      if (stepOrder >= drill_list.length) {
        setIsFinished(true);
        return;
      }

      // Shown all pics for this step?
      if (shownPics >= currentStep.num_pics) {
        setStepOrder(prev => prev + 1);
        return;
      }

      // Move to next image
      const nextIndex = liveImageIndex >= image_list.length - 1
        ? 0
        : liveImageIndex + 1;

      setLiveImageIndex(nextIndex);
      setShownPics(prev => prev + 1);
    }, currentStep.display_time * 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [liveImageIndex, shownPics, stepOrder, isPaused, isFinished, currentStep]);

  // Keyboard support
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === ' ') setIsPaused(p => !p);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [liveImageIndex]);

  const handlePrev = () => {
    if (liveImageIndex > 0) {
      setLiveImageIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (liveImageIndex < image_list.length - 1) {
      setLiveImageIndex(prev => prev + 1);
    }
  };

  const progress = currentStep ? (shownPics / currentStep.num_pics) * 100 : 0;

  if (isFinished) {
    return (
      <div className="picture-viewer">
        <div className="finished">FINISHED</div>
      </div>
    );
  }

  return (
    <div className="picture-viewer">
      <div className="viewer">
        {currentImage && (
          <img
            src={currentImage.largeImageURL}
            alt={currentImage.tags}
          />
        )}

        <div className="overlay">
          <div>Step: {stepOrder + 1} / {drill_list.length}</div>
          <div>Showing: {shownPics} / {currentStep?.num_pics}</div>
          <div>Image: {liveImageIndex + 1} / {image_list.length}</div>
          <div>Time per image: {currentStep?.display_time}s</div>
        </div>

        <div className="progress-bar">
          <div className="fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="controls">
        <button onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? '▶ Resume' : '⏸ Pause'}
        </button>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handlePrev} disabled={liveImageIndex === 0} className="nav-btn">
            ←
          </button>
          <button onClick={handleNext} disabled={liveImageIndex === image_list.length - 1} className="nav-btn">
            →
          </button>
        </div>

        <button onClick={() => setIsFinished(true)} className="finish-btn">
          Finish Early
        </button>
      </div>
    </div>
  );
}

