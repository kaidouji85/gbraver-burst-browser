// @flow

import {render} from 'react-dom';
import type {ServiceWorkerUpdateState} from "./state/service-worker-update-state";
import {createInitialValue} from "./state/initial-value";
import {Observable, Subscription} from "rxjs";
import type {ServiceWorkerAction, ServiceWorkerWillUpdate} from "../../../action/service-worker/service-worker";
import {serviceWorkerWillUpdate} from "./state/service-worker-will-update";
import {serviceWorkerUpdateView} from "./view/service-worker-update-view";

/** サービスワーカー更新 */
export class ServiceWorkerUpdate {
  _dom: HTMLElement;
  _state: ServiceWorkerUpdateState;
  _subscription: Subscription;

  constructor(dom: HTMLElement, serviceWorker: Observable<ServiceWorkerAction>) {
    this._dom = dom;
    this._state = createInitialValue();
    this._subscription = serviceWorker.subscribe(action => {
      if (action.type === 'ServiceWorkerWillUpdate') {
        this._onServiceWorkerWillUpdate(action);
      }
    });

    this._engage();
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._subscription.unsubscribe();
  }

  /** ステートをビューに反映させる */
  _engage(): void {
    const components = serviceWorkerUpdateView({
      state: this._state
    });
    render(components, this._dom);
  }

  /**
   * サービスワーカーが更新された際の処理
   *
   * @param action アクション
   */
  _onServiceWorkerWillUpdate(action: ServiceWorkerWillUpdate): void {
    this._state = serviceWorkerWillUpdate(this._state);
    this._engage();
  }
}