// @flow
import type {Resources} from '../../common/resource-manager';
import ThreeLib from 'three-js';
import ThreeDimensionLayer from './three-dimension';
import HudLayer from './hud';

const THREE = ThreeLib(['JSONLoader', 'OrbitControls']);

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
      resources: props.resources,
      renderer: this.renderer
    });
    this.hudLayer = new HudLayer();
  }

  /** ゲームループでの処理 */
  animate() {
    this.threeDimensionLayer.animate();

    this.hudLayer.animate();
    this.renderer.render(this.hudLayer.scene, this.hudLayer.camera);
  }

  /** リサイズ時の処理 */
  resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.threeDimensionLayer.resize();
    this.hudLayer.resize();
  }

  /**
   * デバッグモードの設定を行う
   */
  debugMode() {
    this.threeDimensionLayer.actors.scene.add(new THREE.AxisHelper(1000));

    const controls = new THREE.OrbitControls(this.threeDimensionLayer.actors.camera, this.renderer.domElement);
    controls.maxDistance = 1000;
    controls.maxPolarAngle = Math.PI * 0.48;
  }

  /**
   * プレイヤーキャラがパンチする
   */
  punchPlayer() {
    /*
    this.threeDimensionLayer.playerSprite.tween.stop();
    this.threeDimensionLayer.playerSprite.tween.start();
    */
  }
}