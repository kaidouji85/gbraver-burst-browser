// @flow

import type {LoadingModel} from "./model/loading-model";
import {LoadingView} from "./view/loading-view";
import {createInitialValue} from "./model/initial-value";
import {progress} from "./model/progress";
import {complete} from "./model/complete";
import type {LoadingAction, LoadingComplete, LoadingProgress} from "../action/loading/loading";
import {merge, Observable, Subscription} from "rxjs";
import type {ServiceWorkerAction, ServiceWorkerWillUpdate} from "../action/service-worker/service-worker";
import {serviceWorkerWillUpdate} from "./model/service-worker-wil-update";

type Param = {
  listener: {
    loading: Observable<LoadingAction>,
    serviceWorker: Observable<ServiceWorkerAction>,
  }
};

/** ローディング画面管理クラス */
export class Loading {
  _model: LoadingModel;
  _view: LoadingView;
  _subscription: Subscription;

  constructor(param: Param) {
    this._model = createInitialValue();
    this._view = new LoadingView();
    this._subscription = merge(
      param.listener.loading,
      param.listener.serviceWorker
    ).subscribe(action => {
      if (action.type === 'LoadingProgress') {
        this._onLoadingProgress(action);
      } else if (action.type === 'LoadingComplete') {
        this._onLoadingComplete(action);
      } else if (action.type === 'ServiceWorkerWillUpdate') {
        this._onServiceWorkerWillUpdate(action);
      }
    });

    this._view.engage(this._model);
  }

  /** デストラクタ相当の処理 */
  destrucotr(): void {
    this._subscription.unsubscribe();
  }

  /**
   * リソースのローディング進捗に変化があった際のイベント
   *
   * @param action アクション
   */
  _onLoadingProgress(action: LoadingProgress): void {
    this._model = progress(this._model, action.completedRate);
    this._view.engage(this._model);
  }

  /**
   * リソースのローディングが完了した際のイベント
   *
   * @param action アクション
   */
  _onLoadingComplete(action: LoadingComplete): void {
    this._model = complete(this._model);
    this._view.engage(this._model);
  }

  /**
   * サービスワーカーが更新される際のイベント
   *
   * @param action アクション
   */
  _onServiceWorkerWillUpdate(action: ServiceWorkerWillUpdate): void {
    this._model = serviceWorkerWillUpdate(this._model);
    this._view.engage(this._model);
  }
}
