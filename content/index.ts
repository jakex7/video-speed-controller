import { Messages, MessageRequest } from "../src/api/messages";

chrome.runtime.onMessage.addListener(
  (message: MessageRequest, _sender, sendResponse) => {
    const videos = document.querySelectorAll("video");

    switch (message.type) {
      case Messages.SET_SPEED: {
        const target = Math.max(0.0625, Math.min(16, message.payload));
        videos.forEach((video) => {
          video.playbackRate = target;
        });
        sendResponse(target);
        break;
      }
      case Messages.TOGGLE_FORCE_CONTROLS: {
        let result: boolean | undefined = undefined;
        videos.forEach((video) => {
          const next =
            typeof message.payload === "boolean"
              ? message.payload
              : !video.controls;
          video.controls = next;
          result = next;
        });
        sendResponse(!!result);
        break;
      }
      case Messages.DETECT_VIDEO:
        sendResponse(videos.length > 0);
        break;
      default:
        sendResponse(Messages.NOT_IMPLEMENTED);
    }
  }
);
