// @flow



import {ServiceWorkerUpdateView} from "./view/service-worker-update-view";

export class ServiceWorkerUpdate {
  _view: ServiceWorkerUpdateView;

  constructor() {
    this._view = new ServiceWorkerUpdateView();
    this._view.engage();
  }
}