import { Messages } from "./messages";

export const sendToCurrentTab = <T>(message: {
  type: Messages;
  payload: T;
}): Promise<T> => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.tabs.sendMessage(tab.id!, message, (response) => {
        if (response) resolve(message.payload);
        else reject("Message type unknown, got: " + message.type);
      });
    });
  });
};
