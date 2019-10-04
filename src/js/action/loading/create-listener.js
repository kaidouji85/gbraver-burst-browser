// @flow

import {Observable} from "rxjs";
import type {LoadingAction} from "./loading";
import * as THREE from "three";

export function createLoadingActionListener(manager: THREE.LoadingManager): Observable<LoadingAction> {
  return new Observable(subscriber => {
    manager.onProgress = (url: string, itemsLoaded: number, itemsTotal: number) => {
      subscriber.next({
        type: 'LoadingProgress',
        completedRate: itemsLoaded / itemsTotal
      });
    };

    manager.onLoad = (url: string) => {
      subscriber.next({
        type: 'LoadingComplete'
      });
    };
  });
}