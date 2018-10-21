// @flow
import type {Resources} from '../../resource/index';
import {BattleSceneView} from "./view";
import type {BattleSceneState} from "./state/battle-scene-state";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import * as THREE from "three";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import {ProgressBattle} from "./progress-battle/progress-battle";
import type {GameLoop} from "../../action/game-loop/game-loop";
import {Observable, Subject} from "rxjs";
import type {DOMEvent} from "../../action/dom-event";
import type {BattleSceneAction} from "../../action/battle-scene";
import {stateHistoryAnimation} from "./animation/state-history";
import {play} from "../../tween/multi-tween/play";
import type {DecideBattery} from "../../action/battle-scene/decide-battery";
import {invisibleUI} from "./animation/invisible-ui/invisible-u-i";
import {createInitialState} from "./state/initial-state";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  renderer: THREE.WebGLRenderer,
  playerId: PlayerId,
  players: Player[],
  initialState: GameState[],
  progressBattle: ProgressBattle,
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
  _progressBattle: ProgressBattle;

  constructor(param: Param) {
    this._state = createInitialState(param.playerId);
    this._battleAction = new Subject();
    this._progressBattle = param.progressBattle;
    this._view = new BattleSceneView({
      resources: param.resources,
      renderer: param.renderer,
      playerId: param.playerId,
      players: param.players,
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

    const startAnimation = stateHistoryAnimation(this._view, this._state, param.initialState);
    play(startAnimation);
  };

  /** バッテリー決定 */
  async _decideBattery(action: DecideBattery): Promise<void> {
    if (!this._state.canOperation) {
      return;
    }

    this._state.canOperation = false;

    await play(invisibleUI(this._view));
    const updateState = await this._progressBattle({
      type: 'BATTERY_COMMAND',
      battery: action.battery
    });
    await play(stateHistoryAnimation(this._view, this._state, updateState));

    this._state.canOperation = true;
  }
}