// @flow
import type {Resources} from '../../resource/index';
import {BattleSceneView} from "./view";
import type {BattleSceneState} from "./state";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import * as THREE from "three";
import {Scene} from "three";
import type {DOMEventListener} from "../../observer/dom-event/dom-event-listener";
import {domEventHandler} from "./action-handler/dom-event";
import {gameLoop} from './game-loop';
import {debugMode} from "./debug-mode";
import {BattleSceneObserver} from "../../observer/battle-scene/battle-scene-observer";
import type {DOMEvent} from "../../action/dom-event";
import type {BattleSceneAction} from "../../action/battle-scene";
import {battleSceneActionHandler} from "./action-handler/battle-scene/inde";

/** コンストラクタのパラメータ */
type Params = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** 画面を開いているプレイヤーID */
  playerId: PlayerId,
  /** プレイヤー情報 */
  players: Player[],
  /** レンダラ */
  renderer: THREE.WebGLRenderer,
  /** HTMLイベントリスナー */
  domEventListener: DOMEventListener;
};

/**
 * 戦闘画面アプリケーション
 */
export class BattleScene implements Scene{
  /** ビュー */
  _view: BattleSceneView;
  /** 戦闘画面全体の状態 */
  _state: BattleSceneState;
  /**
   * HTMLイベントリスナー
   * シーン終了時にハンドラ削除をするためにキャッシュしている
   */
  _domEventListener: DOMEventListener;
  /** 戦闘画面のオブザーバ */
  _battleSceneObserver: BattleSceneObserver;

  constructor(params: Params) {
    this._state = {
      playerId: params.playerId
    };

    this._domEventListener = params.domEventListener;
    this._domEventListener.add(this._domEventHandler.bind(this));

    this._battleSceneObserver = new BattleSceneObserver();
    this._battleSceneObserver.add(this._battleSceneActionHandler.bind(this));

    this._view = new BattleSceneView({
      resources: params.resources,
      playerId: params.playerId,
      players: params.players,
      notifier: this._battleSceneObserver,
      renderer: params.renderer
    });
  };

  /** ゲームループ */
  gameLoop(time: DOMHighResTimeStamp): void {
    gameLoop(this._view, this._state, time);
  }

  /** デバッグモードに設定する */
  debugMode(): void {
    debugMode(this._view, this._state);
  }

  _domEventHandler(event: DOMEvent): void {
    domEventHandler(event, this._view, this._state);
  }

  _battleSceneActionHandler(action: BattleSceneAction): void {
    battleSceneActionHandler(action, this._view, this._state);
  }
}