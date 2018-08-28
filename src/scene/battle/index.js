// @flow
import type {Resources} from '../../resource/index';
import {BattleSceneView} from "./view";
import type {BattleSceneState} from "./state";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import * as THREE from "three";
import {domEventHandler} from "./action-handler/dom-event";
import {BattleSceneObserver} from "../../deperecated-observer/battle-scene/battle-scene-observer";
import {battleSceneActionHandler} from "./action-handler/battle-scene/index";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import {ProgressBattle} from "./progress-battle";
import type {GameLoop} from "../../action/game-loop/game-loop";
import {Observable, Subject} from "rxjs";
import type {DOMEvent} from "../../action/dom-event";
import type {BattleSceneAction} from "../../action/battle-scene";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  playerId: PlayerId,
  players: Player[],
  initialState: GameState[],
  progressBattle: ProgressBattle,
  renderer: THREE.WebGLRenderer,
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
  /** 戦闘画面アクションのサブジェクト */
  _battleActionSubject: Subject<BattleSceneAction>;

  constructor(param: Param) {
    this._state = {
      playerId: param.playerId,
      lastBatteryValue: 0
    };

    param.domEventListener.subscribe(action => {
      domEventHandler(action, this._view, this._state);
    });

    this._battleActionSubject = new Subject();
    this._battleActionSubject.subscribe(action => {
      battleSceneActionHandler(action, this._view, this._state, param.progressBattle);
    });

    this._view = new BattleSceneView({
      resources: param.resources,
      playerId: param.playerId,
      players: param.players,
      battleActionNotifier: this._battleActionSubject,
      gameLoopListener: param.gameLoopListener,
      domEventListener: param.domEventListener,
      renderer: param.renderer
    });

    this._battleActionSubject.next({
      type: 'startBattleScene',
      initialState: param.initialState
    });
  };
}