// @flow

import {Loading} from "./loading";
import {Observable} from "rxjs";
import type {LoadingAction} from "../../action/loading/loading";
import {ServiceWorkerUpdate} from "./service-worker-update";
import type {ServiceWorkerAction} from "../../action/service-worker/service-worker";
import {Title} from "./title";
import {ThreeJSCanvas} from "./three-js-canvas";
import type {EndBattle} from "../../action/game/end-battle";
import type {EndTitle} from "../../action/game/end-title";

/** イベント通知 */
type Notifier = {
  endBattle: Observable<EndBattle>,
  endTitle: Observable<EndTitle>
};

/** コンストラクタのパラメータ */
type Param = {
  listener: {
    loading: Observable<LoadingAction>,
    serviceWorker: Observable<ServiceWorkerAction>
  }
};

/** HTML要素を集めたもの */
export class Components {
  _loading: Loading;
  _serviceWorkerUpdate: ServiceWorkerUpdate;
  _title: Title;
  _threeJSCanvas: ThreeJSCanvas;

  constructor(param: Param) {
    const loadingDOM: HTMLElement = document.querySelector('#loading-scene') || document.createElement('div');
    this._loading = new Loading(loadingDOM, param.listener.loading);

    const serviceWorkerDOM: HTMLElement = document.querySelector("#service-worker-update-scene") || document.createElement('div');
    this._serviceWorkerUpdate = new ServiceWorkerUpdate(serviceWorkerDOM, param.listener.serviceWorker);

    const titleDOM: HTMLElement = document.querySelector("#title-scene") || document.createElement('div');
    this._title = new Title(titleDOM);

    const body: HTMLElement = document.body
      ? document.body
      : document.createElement('body');
    this._threeJSCanvas = new ThreeJSCanvas(body);
  }

  /** デストラクタ相当の処理 */
  destructor() {
    this._loading.destructor();
    this._serviceWorkerUpdate.destructor();
    this._title.destructor();
    this._threeJSCanvas.destructor();
  }

  notifier(): Notifier {
    return {
      endBattle: this._threeJSCanvas.notifier().endBattle,
      endTitle: this._title.notifier().endTitle,
    };
  }
}