// @flow

import * as THREE from 'three';
import type {LoadingModel} from "./model/loading-model";
import {LoadingView} from "./view/loading-view";
import {createInitialValue} from "./model/initial-value";
import {progress} from "./model/progress";
import {complete} from "./model/complete";
import type {LoadingAction, LoadingComplete} from "../action/loading/loading";
import {Observer, Subject, Subscription} from "rxjs";

/** ローディング画面管理クラス */
export class Loading {
  _model: LoadingModel;
  _view: LoadingView;
  _loadingAction: Subject<LoadingAction>;
  _subscription: Subscription<LoadingAction>;

  constructor() {
    this._model = createInitialValue();
    this._view = new LoadingView();
    this._loadingAction = new Subject();
    this._loadingAction._subscribe(action => {
      if (action.type === 'LoadingProcess') {
        this._onProgress(action);
      } else if (action.type === 'LoadingComplete') {
        this._onComplete(action);
      }
    });

    this._view.engage(this._model);
  }

  destrucotr(): void {
    this._subscription.unsubscribe();
  }

  getNotifier(): Observer<LoadingAction> {
    return this._loadingAction;
  }

  /**
   * リソースのローディング進捗に変化があった際のイベント
   *
   * @param action アクション
   */
  _onProgress(action: LoadingProgress): void {
    this._model = progress(this._model, action.completedRate);
    this._view.engage(this._model);
  }

  /**
   * リソースのローディングが完了した際のイベント
   *
   * @param action アクション
   */
  _onComplete(action: LoadingComplete): void {
    this._model = complete(this._model);
    this._view.engage(this._model);
  }
}

export class LoadingActionCreator {
  _manager: THREE.LoadingManager;
  _notifier: Subject<LoadingAction>;

  constructor(manager: THREE.LoadingManager, notifier: Subject<LoadingAction>) {
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