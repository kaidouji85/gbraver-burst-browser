// @flow
import type {Resources} from '../../../resource/index';
import * as THREE from 'three';
import {ThreeDimensionLayer} from './three-dimension-layer';
import {HudLayer} from './hud-layer/index';
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import type {OverlapListener} from "../../../observer/overlap/overlap-listener";
import type {BattleSceneNotifier} from "../../../observer/battle-scene/battle-scene-notifier";
import type {GameLoop} from "../../../action/game-loop/game-loop";
import {Observable} from "rxjs";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  notifier: BattleSceneNotifier,
  depricatedListener: OverlapListener,
  listener: Observable<GameLoop>,
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
      listener: param.listener,
      resources: param.resources,
      playerId: param.playerId,
      players: param.players
    });
    this.hudLayer = new HudLayer({
      resources: param.resources,
      playerId: param.playerId,
      players: param.players,
      notifier: param.notifier,
      listener: param.listener,
      deprecatedListener: param.depricatedListener
    });

    param.listener.subscribe(action => {
      switch (action.type) {
        case 'GameLoop':
          this._render();
          return;
        default:
          return;
      }
    });
  }

  /** レンダリング */
  _render(): void {
    this.renderer.render(this.threeDimensionLayer.scene, this.threeDimensionLayer.camera);
    this.renderer.render(this.hudLayer.scene, this.hudLayer.camera);
  }
}