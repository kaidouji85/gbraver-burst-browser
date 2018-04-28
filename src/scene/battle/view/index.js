// @flow
import type {Resources} from '../../../resource/index';
import * as THREE from 'three';
import {ThreeDimensionLayer} from './three-dimension-layer';
import {HudLayer} from './hud-layer/index';
import type {BattleSceneState} from "../state";
import type {BattleSceneNotifier} from "../../../observer/battle-scene/battle-scene-notifier";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  state: BattleSceneState,
  notifier: BattleSceneNotifier,
  renderer: THREE.WebGLRenderer
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
      resources: param.resources,
      state: param.state
    });
    this.hudLayer = new HudLayer({
      resources: param.resources,
      state: param.state,
      notifier: param.notifier
    });
  }

  /** レンダリング処理 */
  render() {
    this.renderer.render(this.threeDimensionLayer.scene, this.threeDimensionLayer.camera);
    this.renderer.render(this.hudLayer.scene, this.hudLayer.camera);
  }
}