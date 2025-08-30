

function addSessionConfigSubmitPulse() {

  const submitButton = document.querySelector('.inksplat-submit');

  function triggerPulse() {
    submitButton.classList.add('pulse');
    // Remove the class after the animation duration (700ms)
    setTimeout(() => {
      submitButton.classList.remove('pulse');
    }, 700);
  }

  // Trigger immediately on load
  triggerPulse();

  // Repeat every 5 seconds
  setInterval(triggerPulse, 5000);
}