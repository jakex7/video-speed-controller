// Listen for message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "SPEED") {
    const video = document.querySelector("video");

    if(video) {
      video.playbackRate = request.payload.speed;
      console.log(`%c[VSC] Current speed is: ${request.payload.speed}`, "color:green");
    } else {
      console.log(`%c[VSC] No video element found!`, "color:red");
    }
  }

  // Send an empty response
  // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
  sendResponse({});
  return true;
});
