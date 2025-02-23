import { Messages } from "../src/api/messages";
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  const videos = document.querySelectorAll("video");

  switch (message.type) {
    case Messages.SET_SPEED:
      videos.forEach((video) => {
        video.playbackRate = message.payload;
      });
      sendResponse(message.payload);
      break;
    case Messages.TOGGLE_FORCE_CONTROLS:
      videos.forEach((video) => {
        video.controls = message.payload;
      });
      sendResponse(message.payload);
      break;
    case Messages.DETECT_VIDEO:
      sendResponse(videos.length > 0);
      break;
    default:
      sendResponse(Messages.NOT_IMPLEMENTED);
  }
});
