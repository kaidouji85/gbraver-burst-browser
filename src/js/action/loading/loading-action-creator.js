// @flow

import * as THREE from "three";
import {Observer} from "rxjs";
import type {LoadingAction} from "./loading";

/** リソース読み込みアクションを発行する */
export class LoadingActionCreator {
  _manager: THREE.LoadingManager;
  _notifier: Observer<LoadingAction>;

  constructor(manager: THREE.LoadingManager, notifier: Observer<LoadingAction>) {
    this._manager = manager;
    this._manager.onProgress = this._onProgress.bind(this);
    this._manager.onLoad = this._onComplete.bind(this);

    this._notifier = notifier;
  }

  /**
   * リソースのローディング進捗に変化があった際のイベント
   *
   * @param url 読み込んだリソースのURL
   * @param itemsLoaded これまでに読み込んだリソース数
   * @param itemsTotal トータルのリソース数
   */
  _onProgress(url: string, itemsLoaded: number, itemsTotal: number): void {
    this._notifier.next({
      type: 'LoadingProgress',
      completedRate: itemsLoaded / itemsTotal
    });
  }

  /**
   * リソースのローディングが完了した際のイベント
   *
   * @param url 最後に読み込んだリソースのURL
   */
  _onComplete(url: string): void {
    this._notifier.next({
      type: 'LoadingComplete'
    });
  }
}