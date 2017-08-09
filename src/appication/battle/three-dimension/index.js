// @flow
import type {Resources} from '../../../common/resource-manager';
import ThreeLib from 'three-js';
import Actors from './actors';

const THREE = ThreeLib([]);

/**
 * 3D空間のレイヤー
 */
export default class Battle {
  /** 関連する全オブジェクト */
  actors: Actors;

  /** レンダラー */
  renderer: THREE.WebGLRenderer;

  constructor(props: {resources: Resources, renderer: THREE.WebGLRenderer}) {
    this.actors = new Actors(props);
    this.renderer = props.renderer;
  }

  /** ゲームループでの処理 */
  animate() {
    this.actors.battleField.animate(this.actors.camera);
    this.actors.playerSprite.animate(this.actors.camera);
    this.actors.enemySprite.animate(this.actors.camera);

    this.renderer.render(this.actors.scene, this.actors.camera);
  }

  /** ウインドウリサイズ時の処理 */
  resize() {
    this.actors.camera.aspect = window.innerWidth / window.innerHeight;
    this.actors.camera.updateProjectionMatrix();
  }
}