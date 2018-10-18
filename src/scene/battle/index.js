// @flow
import type {Resources} from '../../resource/index';
import {BattleSceneView} from "./view";
import type {BattleSceneState} from "./state/battle-scene-state";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import * as THREE from "three";
import {battleSceneActionHandler} from "./action-handler/battle-scene/index";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import {ProgressBattle} from "./progress-battle/progress-battle";
import type {GameLoop} from "../../action/game-loop/game-loop";
import {Observable, Subject} from "rxjs";
import type {DOMEvent} from "../../action/dom-event";
import type {BattleSceneAction} from "../../action/battle-scene";
import type {Resize} from "../../action/dom-event/resize";
import {resize} from "./resize";

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

  constructor(param: Param) {
    this._state = {
      playerId: param.playerId,
      canOperation: true
    };

    this._battleAction = new Subject();

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


    param.listener.domEvent.subscribe(action => {
      if (action.type === 'resize') {
        this._resize(action);
      }
    });

    this._battleAction.subscribe(action => {
      battleSceneActionHandler(action, this._view, this._state, param.progressBattle);
    });


    this._battleAction.next({
      type: 'startBattleScene',
      initialState: param.initialState
    });
  };

  /** リサイズ */
  _resize(action: Resize): void {
    resize(this._view);
  }
}