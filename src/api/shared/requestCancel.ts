import { requestManager } from "./requestManager";

const cancelRequestEmitter = new EventTarget();

cancelRequestEmitter.addEventListener("cancel", (obj) => {
  const event = obj as CustomEvent<string>;
  requestManager.cancel(event.detail);
});

export const cancelRequest = (key: string) => {
  const event = new CustomEvent("cancel", { detail: key });
  cancelRequestEmitter.dispatchEvent(event);
};
