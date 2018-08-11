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
import {BattleSceneObserver} from "../../observer/battle-scene/battle-scene-observer";
import type {DOMEvent} from "../../observer/dom-event/action/index";
import type {BattleSceneAction} from "../../observer/battle-scene/action/index";
import {battleSceneActionHandler} from "./action-handler/battle-scene/index";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import {ProgressBattle} from "./progress-battle";
import {RaycasterObserver} from "../../observer/raycaster/raycaster-observer";
import {domEventToRaycasterAction} from "./domevent-toraycaster-action";

/** コンストラクタのパラメータ */
type Params = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** 画面を開いているプレイヤーID */
  playerId: PlayerId,
  /** プレイヤー情報 */
  players: Player[],
  /** ゲーム初期状態 */
  initialState: GameState[],
  /** ゲーム進行関数 */
  progressBattle: ProgressBattle,
  /** レンダラ */
  renderer: THREE.WebGLRenderer,
  /** HTMLイベントリスナー */
  domEventListener: DOMEventListener,
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
  /** レイキャスターオブザーバ */
  _raycasterObserver: RaycasterObserver;

  /** 戦闘進行関数 */
  _progressBattle: ProgressBattle;

  constructor(params: Params) {
    this._state = {
      playerId: params.playerId
    };

    this._raycasterObserver = new RaycasterObserver();

    this._domEventListener = params.domEventListener;
    this._domEventListener.add(event => {
      domEventHandler(event, this._view, this._state);
    });
    this._domEventListener.add(event => {
      const raycasterAction = domEventToRaycasterAction(event, this._view);
      if (raycasterAction) {
        this._raycasterObserver.notify(raycasterAction);
      }
    });

    this._battleSceneObserver = new BattleSceneObserver();
    this._battleSceneObserver.add(action => {
      battleSceneActionHandler(action, this._view, this._state, this._progressBattle);
    });

    this._progressBattle = params.progressBattle;

    this._view = new BattleSceneView({
      resources: params.resources,
      playerId: params.playerId,
      players: params.players,
      notifier: this._battleSceneObserver,
      renderer: params.renderer
    });

    this._battleSceneObserver.notify({
      type: 'startBattleScene',
      initialState: params.initialState
    });
  };

  /** ゲームループ */
  gameLoop(time: DOMHighResTimeStamp): void {
    gameLoop(this._view, this._state, time);
  }
}