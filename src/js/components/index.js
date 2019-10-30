// @flow

import {Loading} from "./loading";
import {Observable} from "rxjs";
import type {LoadingAction} from "../action/loading/loading";
import {ServiceWorkerUpdate} from "./service-worker-update";
import type {ServiceWorkerAction} from "../action/service-worker/service-worker";

/** コンストラクタのパラメータ */
type Param = {
  listener: {
    loading: Observable<LoadingAction>,
    serviceWorker: Observable<ServiceWorkerAction>
  }
};

/** HTML要素を集めたもの */
export class Components {
  /** ローディング */
  loading: Loading;

  /** サービスワーカー更新 */
  serviceWorkerUpdate: ServiceWorkerUpdate;

  constructor(param: Param) {
    const loadingDOM: HTMLElement = document.querySelector('#loading-scene') || document.createElement('div');
    this.loading = new Loading(loadingDOM, param.listener.loading);

    const serviceWorkerDOM: HTMLElement = document.querySelector("#service-worker-update-scene") || document.createElement('div');
    this.serviceWorkerUpdate = new ServiceWorkerUpdate(serviceWorkerDOM, param.listener.serviceWorker);
  }

  /** デストラクタ相当の処理 */
  destructor() {
    this.loading.destructor();
    this.serviceWorkerUpdate.destructor();
  }
}