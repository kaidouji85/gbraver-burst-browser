// @flow

import {Subject} from "rxjs";
import type {LoadingAction} from "../action/loading/loading";
import type {ServiceWorkerAction} from "../action/service-worker/service-worker";
import {Loading} from "../outer-game/loading/loading";
import {Game} from "../game";
import {LoadingActionCreator} from "../action/loading/loading-action-creator";
import * as THREE from "three";
import {viewPerformanceStats} from "../stats/view-performance-stats";
import {loadServiceWorker} from "../service-worker/load-service-worker";
import {willServiceWorkerUpdate} from "../service-worker/will-service-worker-update";
import {loadAllResource} from "../resource";
import {resourceBasePath} from "../resource/resource-base-path";

/** Gブレイバーバーストのアプリ全体を制御する */
export class GbraverBurstBrowser {
  _subjects: {
    loading: Subject<LoadingAction>,
    serviceWorker: Subject<ServiceWorkerAction>
  };
  _outerGame: {
    loading: Loading
  };
  _game: ?Game;
  _serviceWorker: ?ServiceWorkerRegistration;

  constructor() {
    this._subjects = {
      loading: new Subject(),
      serviceWorker: new Subject()
    };
    this._outerGame = {
      loading: new Loading({
        listener: {
          loading: this._subjects.loading
        }
      })
    };
    new LoadingActionCreator(THREE.DefaultLoadingManager, this._subjects.loading);

    this._serviceWorker = null;
    this._game = null;
  }

  /**
   * ゲームを開始する
   */
  async start(): Promise<void> {
    try {
      viewPerformanceStats(document.body);

      this._serviceWorker = await loadServiceWorker();
      if (this._serviceWorker && willServiceWorkerUpdate(this._serviceWorker)) {
        this._subjects.serviceWorker.next({type: 'ServiceWorkerWillUpdate'});
        return;
      }

      const resources = await loadAllResource(`${resourceBasePath()}/`);
      this._game = new Game(resources);
    } catch (e) {
      throw e;
    }
  }
}