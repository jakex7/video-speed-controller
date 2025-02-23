export const storage = {
  get<T>(key: string): Promise<T> {
    return new Promise((resolve) => {
      chrome.storage.local.get([key], (res) => {
        resolve(res as T);
      });
    });
  },
  set<T>(key: string, value: T): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, resolve);
    });
  },
};
