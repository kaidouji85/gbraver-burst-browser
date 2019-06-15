// @flow
import type {Resources} from '../../resource/index';
import {BattleSceneView} from "./view";
import type {BattleSceneState} from "./state/battle-scene-state";
import type {GameLoop} from "../../action/game-loop/game-loop";
import {Observable, Observer, Subject} from "rxjs";
import type {DOMEvent} from "../../action/dom-event";
import type {BattleSceneAction} from "../../action/battle-scene";
import type {DecideBattery} from "../../action/battle-scene/decide-battery";
import {createInitialState} from "./state/initial-state";
import type {BattleRoom, InitialState} from "../../battle-room/battle-room";
import {stateHistoryAnimation} from "./animation/state-history";
import {delay} from "../../animation/delay";
import {invisibleUI} from "./animation/invisible-ui";
import type {Render} from "../../action/game-loop/render";
import type {DoBurst} from "../../action/battle-scene/do-burst";
import type {Command} from "gbraver-burst-core/lib/command/command";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  rendererDOM: HTMLElement,
  battleRoom: BattleRoom,
  initialState: InitialState,
  listener: {
    domEvent: Observable<DOMEvent>,
    gameLoop: Observable<GameLoop>,
  },
  notifier: {
    render: Observer<Render>
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
      rendererDOM: param.rendererDOM,
      playerId: param.initialState.playerId,
      players: param.initialState.players,
      listener: {
        gameLoop: param.listener.gameLoop,
        domEvent: param.listener.domEvent,
      },
      notifier: {
        render: param.notifier.render,
        battleAction: this._battleAction,
      }
    });

    this._battleAction.subscribe(action => {
      if (action.type === 'decideBattery') {
        this._decideBattery(action);
      } else if (action.type === 'doBurst') {
        this,this._doBurst(action);
      }
    });

    delay(1000)
      .chain(
        stateHistoryAnimation(this._view, this._state, param.initialState.stateHistory)
      ).play();
  }

  /** バッテリー決定 */
  async _decideBattery(action: DecideBattery): Promise<void> {
    if (!this._state.canOperation) {
      return;
    }

    this._state.canOperation = false;
    await invisibleUI(this._view).play();
    await this._progressGame({
      type: 'BATTERY_COMMAND',
      battery: action.battery
    });
    this._state.canOperation = true;
  }

  /** バースト */
  async _doBurst(action: DoBurst): Promise<void> {
    console.log('burst');
    /*
    if (!this._state.canOperation) {
      return;
    }

    this._state.canOperation = false;
    await this._progressGame({type: 'BURST_COMMAND'});
    await invisibleUI(this._view).play();
    this._state.canOperation = true;
     */
  }

  /** ゲームを進める */
  async _progressGame(command: Command): Promise<void> {
    const updateState = await this._battleRoom.progress(command);
    await stateHistoryAnimation(this._view, this._state, updateState).play();
  }
}
