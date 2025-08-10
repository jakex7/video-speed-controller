export const storage = {
  get<T>(key: string, fallback?: T): Promise<T> {
    return new Promise((resolve) => {
      chrome.storage.local.get([key], (res) => {
        const value = res[key] as T | undefined;
        resolve((value ?? fallback) as T);
      });
    });
  },
  set<T>(key: string, value: T): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, resolve);
    });
  },
};
