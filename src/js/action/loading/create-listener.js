// @flow

import {Observable} from "rxjs";
import type {LoadingAction} from "./loading";
import * as THREE from "three";

// TODO 削除する
/**
 * ローディングアクションのストリームを生成する
 *
 * @param manager THREE.jsのローディングマネジャー
 * @return 生成結果
 */
export function createLoadingActionListener(manager: THREE.LoadingManager): Observable<LoadingAction> {
  return new Observable(subscriber => {
    manager.onStart = () => {
      subscriber.next({
        type: 'LoadingStart'
      });
    };

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