// @flow

import {Observable} from "rxjs";
import type {ServiceWorkerAction} from "./service-worker";
import {hasWaitingServiceWorker} from "../../service-worker/has-waiting-service-worker";

export function createServiceWorkerActionListener(serviceWorker: ServiceWorkerRegistration): Observable<ServiceWorkerAction> {
  return new Observable(subscriber => {
    serviceWorker.onupdatefound = () => {
      subscriber.next({type: 'ServiceWorkerWillUpdate'});
    };

    if (hasWaitingServiceWorker(serviceWorker)) {
      subscriber.next({type: 'ServiceWorkerWillUpdate'});
    }
  });
}