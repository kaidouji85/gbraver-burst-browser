// @flow

import {Loading} from "./loading";
import {Observable} from "rxjs";
import type {LoadingAction} from "../../action/loading/loading";
import {ServiceWorkerUpdate} from "./service-worker-update";
import type {ServiceWorkerAction} from "../../action/service-worker/service-worker";
import {Title} from "./title";
import type {EndTitle} from "../../action/game/end-title";
import {PlayInLandscape} from "./play-in-landscape";
import {HowToPlay} from "./how-to-play";

/** イベント通知 */
type Notifier = {
  endTitle: Observable<EndTitle>
};

/** コンストラクタのパラメータ */
type Param = {
  listener: {
    loading: Observable<LoadingAction>,
    serviceWorker: Observable<ServiceWorkerAction>,
  }
};

/** HTMLオンリーで生成されたシーンを集めたもの */
export class DOMScenes {
  _loading: Loading;
  _serviceWorkerUpdate: ServiceWorkerUpdate;
  _playInLandscape: PlayInLandscape;
  _title: Title;
  _howToPlay: HowToPlay;

  constructor(param: Param) {
    const loadingDOM: HTMLElement = document.querySelector('#loading-scene') || document.createElement('div');
    this._loading = new Loading(loadingDOM, param.listener.loading);

    const serviceWorkerDOM: HTMLElement = document.querySelector("#service-worker-update-scene") || document.createElement('div');
    this._serviceWorkerUpdate = new ServiceWorkerUpdate(serviceWorkerDOM, param.listener.serviceWorker);

    const titleDOM: HTMLElement = document.querySelector("#title-scene") || document.createElement('div');
    this._title = new Title(titleDOM);

    const playInLandscapeDOM: HTMLElement = document.querySelector("#play-in-landscape") || document.createElement('div');
    this._playInLandscape = new PlayInLandscape(playInLandscapeDOM);

    const howToPlayDOM: HTMLElement = document.getElementById('how-to-play') || document.createElement('div');
    this._howToPlay = new HowToPlay(howToPlayDOM);
  }

  /** デストラクタ相当の処理 */
  destructor() {
    this._loading.destructor();
    this._serviceWorkerUpdate.destructor();
  }

  /**
   * イベント通知ストリームを取得する
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      endTitle: this._title.notifier().endTitle,
    };
  }
}