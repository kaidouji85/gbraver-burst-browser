// @flow

import {Observable, Subject} from "rxjs";
import type {ServiceWorkerAction} from "../action/service-worker/service-worker";
import type {LoadingAction} from "../action/loading/loading";
import {createLoadingActionListener} from "../action/loading/create-listener";
import * as THREE from "three";
import type {StartBattle} from "../action/game/start-battle";

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

  /**
   * ゲームから各シーンに戦闘開始を伝えるストリーム
   *
   * ストリームの流れ
   * Game -> Game::_domScenes
   *
   * モジュールごとの呼び出し制限
   * Game              -> GameStream::startBattle.next(...)のみ呼び出し可能
   * Game::_domScenes -> GameStream::startBattle.subscribe(...)のみ呼び出し可能
   */
  startBattle: Subject<StartBattle>;

  constructor() {
    this.serviceWorker = new Subject();
    this.loading = createLoadingActionListener(THREE.DefaultLoadingManager);
    this.startBattle = new Subject();
  }
}