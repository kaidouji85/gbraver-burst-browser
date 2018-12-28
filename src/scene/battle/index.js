// @flow
import type {Resources} from '../../resource/index';
import {BattleSceneView} from "./view";
import type {BattleSceneState} from "./state/battle-scene-state";
import * as THREE from "three";
import type {GameLoop} from "../../action/game-loop/game-loop";
import {Observable, Subject} from "rxjs";
import type {DOMEvent} from "../../action/dom-event";
import type {BattleSceneAction} from "../../action/battle-scene";
import type {DecideBattery} from "../../action/battle-scene/decide-battery";
import {createInitialState} from "./state/initial-state";
import type {BattleRoom, InitialState} from "../../battle-room/battle-room";
import {stateHistoryAnimation} from "./animation/state-history";
import {delay} from "../../animation/delay";
import {invisibleUI} from "./animation/invisible-ui";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  renderer: THREE.WebGLRenderer,
  battleRoom: BattleRoom,
  initialState: InitialState,
  listener: {
    domEvent: Observable<DOMEvent>,
    gameLoop: Observable<GameLoop>,
  }
};

/**
 * 戦闘画面アプリケーション
 */
export class BattleScene {
  _view: BattleSceneView;
  _state: BattleSceneState;
  _battleAction: Subject<BattleSceneAction>;
  _battleRoom: BattleRoom;

  constructor(param: Param) {
    this._state = createInitialState(param.initialState.playerId);
    this._battleAction = new Subject();
    this._battleRoom = param.battleRoom;
    this._view = new BattleSceneView({
      resources: param.resources,
      renderer: param.renderer,
      playerId: param.initialState.playerId,
      players: param.initialState.players,
      listener: {
        gameLoop: param.listener.gameLoop,
        domEvent: param.listener.domEvent,
      },
      notifier: {
        battleAction: this._battleAction,
      }
    });

    this._battleAction.subscribe(action => {
      if (action.type === 'decideBattery') {
        this._decideBattery(action);
      }
    });

    delay(1000)
      .chain(
        stateHistoryAnimation(this._view, this._state, param.initialState.stateHistory)
      ).play();
  };

  /** バッテリー決定 */
  async _decideBattery(action: DecideBattery): Promise<void> {
    if (!this._state.canOperation) {
      return;
    }

    this._state.canOperation = false;
    await invisibleUI(this._view).play();
    const updateState = await this._battleRoom.progress({
      type: 'BATTERY_COMMAND',
      battery: action.battery
    });
    await stateHistoryAnimation(this._view, this._state, updateState).play();
    this._state.canOperation = true;
  }
}