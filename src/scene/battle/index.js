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
import {Observable} from "rxjs";
import type {DOMEvent} from "../../action/dom-event";

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
  /** 戦闘画面のオブザーバ */
  _battleSceneObserver: BattleSceneObserver;
  /** 戦闘進行関数 */
  _progressBattle: ProgressBattle;

  constructor(param: Param) {
    this._state = {
      playerId: param.playerId,
      lastBatteryValue: 0
    };

    param.domEventListener.subscribe(action => {
      domEventHandler(action, this._view, this._state);
    });

    // TODO 削除する
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
      renderer: param.renderer
    });

    this._battleSceneObserver.notify({
      type: 'startBattleScene',
      initialState: param.initialState
    });
  };
}