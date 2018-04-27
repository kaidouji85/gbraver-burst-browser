// @flow
import type {Resources} from '../../../resource/index';
import * as THREE from 'three';
import {ThreeDimensionLayer} from './three-dimension-layer';
import {HudLayer} from './hud-layer/index';
import type {BattleSceneState} from "../state";
import type {Observer} from '../../observer';
import {createRender} from "../../../render/renderer";

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

  constructor(props: {resources: Resources, state: BattleSceneState, observer: Observer}) {
    this.renderer = createRender();
    this.threeDimensionLayer = new ThreeDimensionLayer({
      resources: props.resources,
      state: props.state
    });
    this.hudLayer = new HudLayer({
      resources: props.resources,
      state: props.state,
      observer: props.observer
    });

    const dom = this.renderer.domElement || new HTMLElement();
    const body = document.body || document.createElement('body');
    body.appendChild(dom);
  }

  /** レンダリング処理 */
  render() {
    this.renderer.render(this.threeDimensionLayer.scene, this.threeDimensionLayer.camera);
    this.renderer.render(this.hudLayer.scene, this.hudLayer.camera);
  }
}