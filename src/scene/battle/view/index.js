// @flow
import type {Resources} from '../../../resource/index';
import * as THREE from 'three';
import {ThreeDimensionLayer} from './td';
import {HudLayer} from './hud/index';
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import type {GameLoop} from "../../../action/game-loop/game-loop";
import {Observable, Observer, Subject} from "rxjs";
import type {DOMEvent} from "../../../action/dom-event";
import type {BattleSceneAction} from "../../../action/battle-scene";
import type {Render} from "../../../action/game-loop/render";
import {Renderer} from "../../../game-object/renderer";
import TWEEN from "@tweenjs/tween.js";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  rendererDOM: HTMLElement,
  playerId: PlayerId,
  players: Player[],
  listener: {
    gameLoop: Observable<GameLoop>,
    domEvent: Observable<DOMEvent>,
  },
  notifier: {
    render: Observer<Render>,
    battleAction: Observer<BattleSceneAction>,
  },
};

/**
 * 戦闘画面のビュー
 */
export class BattleSceneView {
  td: ThreeDimensionLayer;
  hud: HudLayer;

  _gameLoop3D: Subject<GameLoop>;
  _gameLoopHUD: Subject<GameLoop>;

  constructor(param: Param) {
    this._gameLoop3D = new Subject();
    this._gameLoopHUD = new Subject();
    this.td = new ThreeDimensionLayer({
      resources: param.resources,
      rendererDOM: param.rendererDOM,
      playerId: param.playerId,
      players: param.players,
      listener: {
        domEvent: param.listener.domEvent,
        gameLoop: this._gameLoop3D
      },
      notifier: {
        render: param.notifier.render
      }
    });

    this.hud = new HudLayer({
      resources: param.resources,
      rendererDOM: param.rendererDOM,
      playerId: param.playerId,
      players: param.players,
      listener: {
        domEvent: param.listener.domEvent,
        gameLoop: this._gameLoopHUD,
      },
      notifier: {
        battleAction: param.notifier.battleAction,
        render: param.notifier.render
      }
    });

    param.listener.gameLoop.subscribe(action => {
      this._gameLoop(action);
    });
  }

  /** ゲームループ */
  _gameLoop(action: GameLoop): void {
    TWEEN.update(action.time);
    this._gameLoop3D.next(action);
    this._gameLoopHUD.next(action);
  }
}