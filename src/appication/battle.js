// @flow
import ThreeLib from 'three-js';
import {Resources} from '../common/resource-manager';
import BattleFieldLayer from '../layer/battle-field';
import HudLayer from '../layer/hud';

const THREE = ThreeLib(['JSONLoader', 'OrbitControls']);

/**
 * 戦闘画面
 */
export default class Battle {
  /** レンダラ */
  renderer: THREE.WebGLRenderer;

  /** バトルフィールドレイヤー */
  battleFieldLayer: BattleFieldLayer;

  /** Head Up Display(HUD)レイヤー */
  hudLayer: HudLayer;

  constructor(props: {resources: Resources}) {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.autoClear = false;
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.battleFieldLayer = new BattleFieldLayer({resources: props.resources});
    this.battleFieldLayer.scene.add(new THREE.AxisHelper(1000));

    const controls = new THREE.OrbitControls(this.battleFieldLayer.camera, this.renderer.domElement);
    controls.maxDistance = 1000;
    controls.maxPolarAngle = Math.PI * 0.48;

    this.hudLayer = new HudLayer();
  }

  /** ゲームループでの処理 */
  animate() {
    this.battleFieldLayer.animate();
    this.renderer.render( this.battleFieldLayer.scene, this.battleFieldLayer.camera );

    this.hudLayer.animate();
    this.renderer.render(this.hudLayer.scene, this.hudLayer.camera);
  }

  /** リサイズ時の処理 */
  resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.battleFieldLayer.resize();
    this.hudLayer.resize();
  }

  /**
   * プレイヤーキャラがパンチする
   */
  punchPlayer() {
    this.battleFieldLayer.playerSprite.tween.stop();
    this.battleFieldLayer.playerSprite.tween.start();
  }
}