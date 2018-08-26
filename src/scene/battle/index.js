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
import type {DOMEvent} from "../../action/dom-event";
import {Observer} from "../../observer/base/observer";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  playerId: PlayerId,
  players: Player[],
  initialState: GameState[],
  progressBattle: ProgressBattle,
  renderer: THREE.WebGLRenderer,
  oldDomListener: Observer<DOMEvent>,
  domEventListener: Observable<DOMEvent>,
  gameLoopListener: Observable<GameLoop>,
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

  constructor(param: Param) {
    this._state = {
      playerId: param.playerId,
      lastBatteryValue: 0
    };

    this._raycasterObserver = new OverlapObserver();

    this._domEventListener = param.oldDomListener;
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

    this._progressBattle = param.progressBattle;

    this._view = new BattleSceneView({
      resources: param.resources,
      playerId: param.playerId,
      players: param.players,
      notifier: this._battleSceneObserver,
      gameLoopListener: param.gameLoopListener,
      domEventListener: param.domEventListener,
      depricatedListener: this._raycasterObserver,
      renderer: param.renderer
    });

    this._battleSceneObserver.notify({
      type: 'startBattleScene',
      initialState: param.initialState
    });
  };
}