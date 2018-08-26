// @flow
import type {Resources} from '../../../resource/index';
import * as THREE from 'three';
import {ThreeDimensionLayer} from './three-dimension-layer';
import {HudLayer} from './hud-layer/index';
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import type {BattleSceneNotifier} from "../../../deperecated-observer/battle-scene/battle-scene-notifier";
import type {GameLoop} from "../../../action/game-loop/game-loop";
import {Observable} from "rxjs";
import type {DOMEvent} from "../../../action/dom-event";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  notifier: BattleSceneNotifier,
  gameLoopListener: Observable<GameLoop>,
  domEventListener: Observable<DOMEvent>,
  renderer: THREE.WebGLRenderer,
  playerId: PlayerId,
  players: Player[]
};

/**
 * 戦闘画面
 */
export class BattleSceneView {
  /** レンダラ */
  renderer: THREE.WebGLRenderer;
  /** 3D空間レイヤー */
  threeDimensionLayer: ThreeDimensionLayer;
  /** Head Up Display(HUD)レイヤー */
  hudLayer: HudLayer;

  constructor(param: Param) {
    this.renderer = param.renderer;
    this.threeDimensionLayer = new ThreeDimensionLayer({
      gameLoopListener: param.gameLoopListener,
      resources: param.resources,
      playerId: param.playerId,
      players: param.players
    });
    this.hudLayer = new HudLayer({
      resources: param.resources,
      renderer: param.renderer,
      playerId: param.playerId,
      players: param.players,
      notifier: param.notifier,
      gameLoopListener: param.gameLoopListener,
      domEventListener: param.domEventListener,
    });

    param.gameLoopListener.subscribe(action => {
      switch (action.type) {
        case 'GameLoop':
          this._gameLoop(action);
          return;
        default:
          return;
      }
    });
  }

  /** ゲームループの処理 */
  _gameLoop(action: GameLoop): void {
    this.renderer.render(this.threeDimensionLayer.scene, this.threeDimensionLayer.camera);
    this.renderer.render(this.hudLayer.scene, this.hudLayer.camera);
  }
}