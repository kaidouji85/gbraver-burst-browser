// @flow

import {Observable, Subject} from "rxjs";
import type {ServiceWorkerAction} from "../action/service-worker/service-worker";
import type {LoadingAction} from "../action/loading/loading";
import {createLoadingActionListener} from "../action/loading/create-listener";
import * as THREE from "three";

/** Gameが利用するストリームをまとめたもの */
export class GameStream {
  /**
   * サービスワーカーストリームの緩衝材
   * 以下のように、サービスワーカのイベントをGame::_componentsに伝搬している
   *
   * ServiceWorkerRegistration -> GameStream::serviceWorker -> Game::_domScenes
   *
   * Gmae::_components生成にはサービスワーカーストリームが必要だが、
   * このタイミングではサービスワーカー登録が完了していないため同ストリームを用意することがでいない
   * そのため、Gmae::_components生成には、本プロパティのようにダミーのサービスワーカーストリームを使用している
   * サービスワーカー登録が完了したら、本プロパティとサービスワーカーストリームを結合する
   */
  serviceWorker: Subject<ServiceWorkerAction>;

  /**
   * three.jsリソース ローディング進捗 ストリーム
   */
  loading: Observable<LoadingAction>;

  constructor() {
    this.serviceWorker = new Subject();
    this.loading = createLoadingActionListener(THREE.DefaultLoadingManager);
  }
}