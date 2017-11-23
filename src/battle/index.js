// @flow
import type {Resources} from '../resource/resource-manager';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import ThreeDimensionLayer from './three-dimension-layer';
import HudLayer from './hud-layer';

/**
 * 戦闘画面
 */
export default class Battle {
  /** レンダラ */
  renderer: THREE.WebGLRenderer;

  /** 3D空間レイヤー */
  threeDimensionLayer: ThreeDimensionLayer;

  /** Head Up Display(HUD)レイヤー */
  hudLayer: HudLayer;

  constructor(props: {resources: Resources}) {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.autoClear = false;
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.threeDimensionLayer = new ThreeDimensionLayer({
      resources: props.resources
    });

    this.hudLayer = new HudLayer({
      resources: props.resources
    });
  }

  /** ゲームループでの処理 */
  animate() {
    this.threeDimensionLayer.animate();
    this.hudLayer.animate();
  }

  /** レンダリング処理 */
  render() {
    this.renderer.render(this.threeDimensionLayer.gameObjects.scene, this.threeDimensionLayer.gameObjects.camera);
    this.renderer.render(this.hudLayer.gameObjects.scene, this.hudLayer.gameObjects.camera);
  }

  /** リサイズ時の処理 */
  resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.threeDimensionLayer.resize();
    this.hudLayer.resize();
  }

  /** デバッグモードの設定を行う */
  debugMode() {
    this.threeDimensionLayer.gameObjects.scene.add(new THREE.AxisHelper(1000));

    const controls = new OrbitControls(this.threeDimensionLayer.gameObjects.camera, this.renderer.domElement);
    controls.maxDistance = 1000;
    controls.maxPolarAngle = Math.PI * 0.48;
  }
}