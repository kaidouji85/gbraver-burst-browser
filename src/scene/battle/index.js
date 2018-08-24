// @flow
import type {Resources} from '../../resource/index';
import {BattleSceneView} from "./view";
import type {BattleSceneState} from "./state";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import * as THREE from "three";
import type {DOMEventListener} from "../../observer/dom-event/dom-event-listener";
import {domEventHandler} from "./action-handler/dom-event";
import {BattleSceneObserver} from "../../observer/battle-scene/battle-scene-observer";
import {battleSceneActionHandler} from "./action-handler/battle-scene/index";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import {ProgressBattle} from "./progress-battle";
import {OverlapObserver} from "../../observer/overlap/overlap-observer";
import {domEventToOverlapEvent} from "../../action/overlap/dom-event-to-overlap-event";
import type {GameLoop} from "../../action/game-loop/game-loop";
import {Observable} from "rxjs";

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
  /** イベントリスナー */
  listener: Observable<GameLoop>,
};

/**
 * 戦闘画面アプリケーション
 */
export class BattleScene {
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
  _raycasterObserver: OverlapObserver;

  /** 戦闘進行関数 */
  _progressBattle: ProgressBattle;

  constructor(params: Params) {
    this._state = {
      playerId: params.playerId,
      lastBatteryValue: 0
    };

    this._raycasterObserver = new OverlapObserver();

    this._domEventListener = params.domEventListener;
    this._domEventListener.add(event => {
      domEventHandler(event, this._view, this._state);
    });
    this._domEventListener.add(event => {
      const raycasterAction = domEventToOverlapEvent(event, this._view);
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
      listener: params.listener,
      depricatedListener: this._raycasterObserver,
      renderer: params.renderer
    });

    this._battleSceneObserver.notify({
      type: 'startBattleScene',
      initialState: params.initialState
    });
  };
}