// @flow
import type {Resources} from '../../../resource/index';
import * as THREE from 'three';
import {ThreeDimensionLayer} from './three-dimension-layer';
import {HudLayer} from './hud-layer/index';
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import type {GameLoop} from "../../../action/game-loop/game-loop";
import {Observable, Observer, Subject} from "rxjs";
import type {DOMEvent} from "../../../action/dom-event";
import type {BattleSceneAction} from "../../../action/battle-scene";
import type {Render} from "../../../action/game-loop/render";
import {Renderer} from "../../../game-object/renderer";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  renderer: THREE.WebGLRenderer,
  playerId: PlayerId,
  players: Player[],
  listener: {
    gameLoop: Observable<GameLoop>,
    domEvent: Observable<DOMEvent>,
  },
  notifier: {
    battleAction: Observer<BattleSceneAction>,
  },
};

/**
 * 戦闘画面のビュー
 */
export class BattleSceneView {
  renderer: Renderer;
  threeDimensionLayer: ThreeDimensionLayer;
  hudLayer: HudLayer;

  _gameLoop3D: Subject<GameLoop>;
  _gameLoopHUD: Subject<GameLoop>;

  constructor(param: Param) {
    const render: Subject<Render> = new Subject();
    this._gameLoop3D = new Subject();
    this._gameLoopHUD = new Subject();

    this.renderer = new Renderer({
      renderer: param.renderer,
      listener: {
        domEvent: param.listener.domEvent,
        render: render
      }
    });

    this.threeDimensionLayer = new ThreeDimensionLayer({
      resources: param.resources,
      playerId: param.playerId,
      players: param.players,
      listener: {
        domEvent: param.listener.domEvent,
        gameLoop: this._gameLoop3D
      },
      notifier: {
        render: render
      }
    });

    this.hudLayer = new HudLayer({
      resources: param.resources,
      rendererDOM: param.renderer.domElement,
      playerId: param.playerId,
      players: param.players,
      listener: {
        domEvent: param.listener.domEvent,
        gameLoop: this._gameLoopHUD,
      },
      notifier: {
        battleAction: param.notifier.battleAction,
        render: render
      }
    });

    param.listener.gameLoop.subscribe(action => {
      this._gameLoop(action);
    });
  }

  /** ゲームループ */
  _gameLoop(action: GameLoop): void {
    this._gameLoop3D.next(action);
    this._gameLoopHUD.next(action);
  }
}