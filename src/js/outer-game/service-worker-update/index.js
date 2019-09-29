// @flow



import {ServiceWorkerUpdateView} from "./view/service-worker-update-view";
import type {ServiceWorkerUpdateModel} from "./state/service-worker-update-model";
import {createInitialValue} from "./state/initial-value";

/** サービスワーカー更新 */
export class ServiceWorkerUpdate {
  _view: ServiceWorkerUpdateView;
  _model: ServiceWorkerUpdateModel;

  constructor() {
    this._view = new ServiceWorkerUpdateView();
    this._model = createInitialValue();
    this._view.engage(this._model);
  }
}