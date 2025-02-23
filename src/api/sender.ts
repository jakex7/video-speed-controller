import { Messages } from "./messages";

export const sendToCurrentTab = <T = undefined>(message: {
  type: Messages;
  payload?: unknown;
}): Promise<T> => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.tabs.sendMessage(tab.id!, message, (response) => {
        if (response == Messages.NOT_IMPLEMENTED) {
          reject("Message type not implemented, got: " + message.type);
        } else {
          resolve(response);
        }
      });
    });
  });
};
