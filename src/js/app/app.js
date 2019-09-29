// @flow

import {Subject} from "rxjs";
import type {LoadingAction} from "../action/loading/loading";
import type {ServiceWorkerAction} from "../action/service-worker/service-worker";
import {Game} from "../game";
import {LoadingActionCreator} from "../action/loading/loading-action-creator";
import * as THREE from "three";
import {viewPerformanceStats} from "../stats/view-performance-stats";
import {loadServiceWorker} from "../service-worker/load-service-worker";
import {hasWaitingServiceWorker} from "../service-worker/will-service-worker-update";
import {loadAllResource} from "../resource";
import {resourceBasePath} from "../resource/resource-base-path";
import {OuterGame} from "../outer-game";
import {ServiceWorkerActionCreator} from "../action/service-worker/service-worker-action-creator";

// TODO 削除する
/** Gブレイバーバーストのアプリ全体を制御する */
export class GbraverBurstBrowser {
  /** rxjs subjectをあつめたもの */
  _subjects: {
    loading: Subject<LoadingAction>,
    serviceWorker: Subject<ServiceWorkerAction>
  };

  /** three.js以外のシーンをあつめたもの */
  _outerGame: OuterGame;

  /**
   * three.jsのシーンをあつめたもの
   * ゲーム内リソースを全て読み込んだ後でないと、Gameを生成することができない
   * したがって、アプリ起動時にGameを即座に生成することができない
   * よって、初期状態ではnullをセットし、ゲーム内リソース読み込み完了後に、
   * 本プロパティに値をセットする
   */
  _game: ?Game;

  /**
   * サービスワーカーレジストリーション
   * サービスワーカー読み込み失敗、ブラウザがサービスワーカーに対応していない等、
   * サービスワーカーレジストレーションが生成できないケースがある
   * そのため、初期値にnullをセットし、
   * サービスワーカー登録成功後に本プロパティに値をセットする
   */
  _serviceWorker: ?ServiceWorkerRegistration;

  constructor() {
    this._subjects = {
      loading: new Subject(),
      serviceWorker: new Subject()
    };
    this._outerGame = new OuterGame({
      listener: {
        loading: this._subjects.loading,
        serviceWorker: this._subjects.serviceWorker
      }
    });
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
      if (this._serviceWorker && hasWaitingServiceWorker(this._serviceWorker)) {
        this._subjects.serviceWorker.next({type: 'ServiceWorkerWillUpdate'});
        return;
      }

      if (this._serviceWorker) {
        new ServiceWorkerActionCreator(this._subjects.serviceWorker, this._serviceWorker);
      }

      const resources = await loadAllResource(`${resourceBasePath()}/`);
      this._game = new Game(resources);
    } catch (e) {
      throw e;
    }
  }
}
