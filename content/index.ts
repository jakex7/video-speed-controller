import { Messages } from "../src/api/messages";
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const videos = document.querySelectorAll("video");

  switch (message.type) {
    case Messages.SET_SPEED:
      videos.forEach((video) => {
        video.playbackRate = message.payload;
      });
      break;
    case Messages.TOGGLE_FORCE_CONTROLS:
      videos.forEach((video) => {
        video.controls = message.payload;
      });
      break;
    default:
      return false;
      break;
  }
  sendResponse(true);
});
