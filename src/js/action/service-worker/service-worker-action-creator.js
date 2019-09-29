// @flow

import {Observer} from "rxjs";
import type {ServiceWorkerAction} from "./service-worker";

/** サービスワーカーからアクションを生成する */
export class ServiceWorkerActionCreator {
  _notifier: Observer<ServiceWorkerAction>;
  _serviceWorker: ServiceWorkerRegistration;

  constructor(notifier: Observer<ServiceWorkerAction>,serviceWorker: ServiceWorkerRegistration) {
    this._notifier = notifier;
    this._serviceWorker = serviceWorker;
    this._serviceWorker.onupdatefound = this._onUpdateFound.bind(this);
  }

  /** サービスワーカーの更新を発見した際のイベント */
  _onUpdateFound(): void {
    this._notifier.next({type: 'ServiceWorkerWillUpdate'});
  }
}