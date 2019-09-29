// @flow

import {ServiceWorkerUpdateView} from "./view/service-worker-update-view";
import type {ServiceWorkerUpdateState} from "./state/service-worker-update-state";
import {createInitialValue} from "./state/initial-value";
import {Observable, Subscription} from "rxjs";
import type {ServiceWorkerAction, ServiceWorkerWillUpdate} from "../../action/service-worker/service-worker";
import {serviceWorkerWillUpdate} from "./state/service-worker-will-update";

/** サービスワーカー更新 */
export class ServiceWorkerUpdate {
  _view: ServiceWorkerUpdateView;
  _state: ServiceWorkerUpdateState;
  _subscription: Subscription;

  constructor(serviceWorker: Observable<ServiceWorkerAction>) {
    this._view = new ServiceWorkerUpdateView();
    this._state = createInitialValue();
    this._view.engage(this._state);
    this._subscription = serviceWorker.subscribe(action => {
      if (action.type === 'ServiceWorkerWillUpdate') {
        this._onServiceWorkerWillUpdate(action);
      }
    });
  }

  _onServiceWorkerWillUpdate(action: ServiceWorkerWillUpdate): void {
    this._state = serviceWorkerWillUpdate(this._state);
    this._view.engage(this._state);
  }
}