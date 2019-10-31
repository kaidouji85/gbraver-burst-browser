// @flow

import {ServiceWorkerUpdateView} from "./view";
import type {ServiceWorkerUpdateState} from "./state/service-worker-update-state";
import {createInitialValue} from "./state/initial-value";
import {Observable, Subscription} from "rxjs";
import type {ServiceWorkerAction, ServiceWorkerWillUpdate} from "../../../action/service-worker/service-worker";
import {serviceWorkerWillUpdate} from "./state/service-worker-will-update";

/** サービスワーカー更新 */
export class ServiceWorkerUpdate {
  _view: ServiceWorkerUpdateView;
  _state: ServiceWorkerUpdateState;
  _subscription: Subscription;

  constructor(dom: HTMLElement, serviceWorker: Observable<ServiceWorkerAction>) {
    this._view = new ServiceWorkerUpdateView(dom);
    this._state = createInitialValue();
    this._view.engage(this._state);
    this._subscription = serviceWorker.subscribe(action => {
      if (action.type === 'ServiceWorkerWillUpdate') {
        this._onServiceWorkerWillUpdate(action);
      }
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._subscription.unsubscribe();
  }

  /**
   * サービスワーカーが更新された際の処理
   *
   * @param action アクション
   */
  _onServiceWorkerWillUpdate(action: ServiceWorkerWillUpdate): void {
    this._state = serviceWorkerWillUpdate(this._state);
    this._view.engage(this._state);
  }
}