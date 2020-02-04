// @flow

import {Loading} from "./loading";
import {Observable} from "rxjs";
import type {LoadingAction} from "../../action/loading/loading";
import {ServiceWorkerUpdate} from "./service-worker-update";
import type {ServiceWorkerAction} from "../../action/service-worker/service-worker";
import {PlayInLandscape} from "./play-in-landscape";


/** コンストラクタのパラメータ */
type Param = {
  listener: {
    loading: Observable<LoadingAction>,
    serviceWorker: Observable<ServiceWorkerAction>,
  }
};

/**
 * 割り込みで表示されるシーンをあつめたもの
 */
export class InterruptScenes {
  _loading: Loading;
  _serviceWorkerUpdate: ServiceWorkerUpdate;
  _playInLandscape: PlayInLandscape;

  constructor(param: Param) {
    const loadingDOM: HTMLElement = document.querySelector('#loading-scene') || document.createElement('div');
    this._loading = new Loading(loadingDOM, param.listener.loading);

    const serviceWorkerDOM: HTMLElement = document.querySelector("#service-worker-update-scene") || document.createElement('div');
    this._serviceWorkerUpdate = new ServiceWorkerUpdate(serviceWorkerDOM, param.listener.serviceWorker);

    const playInLandscapeDOM: HTMLElement = document.querySelector("#play-in-landscape") || document.createElement('div');
    this._playInLandscape = new PlayInLandscape(playInLandscapeDOM);
  }

  /** デストラクタ相当の処理 */
  destructor() {
    this._loading.destructor();
    this._serviceWorkerUpdate.destructor();
  }
}