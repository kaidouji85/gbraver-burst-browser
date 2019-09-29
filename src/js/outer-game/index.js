// @flow

import {Loading} from "./loading";
import {Observable} from "rxjs";
import type {LoadingAction} from "../action/loading/loading";
import {ServiceWorkerUpdate} from "./service-worker-update";

/** コンストラクタのパラメータ */
type Param = {
  listener: {
    loading: Observable<LoadingAction>
  }
};

/** Three.JSシーン以外をまとめたもの */
export class OuterGame {
  /** ローディング */
  _loading: Loading;

  /** サービスワーカー更新 */
  _serviceWorkerUpdate: ServiceWorkerUpdate;

  constructor(param: Param) {
    this._loading = new Loading(param.listener.loading);
    this._serviceWorkerUpdate = new ServiceWorkerUpdate();
  }
}