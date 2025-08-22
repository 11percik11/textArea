// utils/requestManager.ts
type CancelKey = string;

class RequestManager {
  private controllers = new Map<CancelKey, AbortController[]>();

  add(key: CancelKey, controller: AbortController) {
    if (!this.controllers.has(key)) {
      this.controllers.set(key, []);
    }
    this.controllers.get(key)!.push(controller);
  }

  cancel(key: CancelKey) {
    if (this.controllers.has(key)) {
      this.controllers.get(key)!.forEach((ctrl) => ctrl.abort());
      this.controllers.delete(key);
    }
  }

  cancelAll() {
    this.controllers.forEach((controllers) =>
      controllers.forEach((ctrl) => ctrl.abort()),
    );
    this.controllers.clear();
  }
}

export const requestManager = new RequestManager();
