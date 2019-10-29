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
    this.loading = new Loading(param.listener.loading);
    this.serviceWorkerUpdate = new ServiceWorkerUpdate(param.listener.serviceWorker);
  }
}