import { MessageRequest, MessageResponse, Messages } from "./messages";

export const sendToCurrentTab = <T extends MessageRequest>(
  message: T
): Promise<MessageResponse<T>> => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs?.[0];
      if (!tab?.id) {
        reject(new Error("No active tab found"));
        return;
      }

      chrome.tabs.sendMessage(tab.id, message, (response) => {
        const lastError = chrome.runtime.lastError;
        if (lastError) {
          reject(new Error(lastError.message));
          return;
        }
        if (response === Messages.NOT_IMPLEMENTED) {
          reject(new Error("Message type not implemented: " + message.type));
          return;
        }
        resolve(response as MessageResponse<T>);
      });
    });
  });
};
