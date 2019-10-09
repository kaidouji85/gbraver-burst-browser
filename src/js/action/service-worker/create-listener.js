// @flow

import {Observable} from "rxjs";
import type {ServiceWorkerAction} from "./service-worker";
import {hasActiveServiceWorker, hasWaitingServiceWorker} from "../../service-worker/has-waiting-service-worker";

/**
 * サービスワーカーアクションのストリームを生成する
 *
 * @param serviceWorker サービスワーカー
 * @returns 生成結果
 */
export function createServiceWorkerActionListener(serviceWorker: ServiceWorkerRegistration): Observable<ServiceWorkerAction> {
  return new Observable(subscriber => {
    serviceWorker.onupdatefound = () => {
      if (hasActiveServiceWorker(serviceWorker)) {
        subscriber.next({type: 'ServiceWorkerWillUpdate'});
      }
    };

    if (hasWaitingServiceWorker(serviceWorker)) {
      subscriber.next({type: 'ServiceWorkerWillUpdate'});
    }
  });
}