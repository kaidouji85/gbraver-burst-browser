// @flow
import type {Resources} from '../../../common/resource-manager';
import type {State} from '../state';
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

  /**
   * 状態変更時の処理
   *
   * @param state 画面状態
   * @return 結果を返すPromise
   */
  update(state: State): Promise<void> {
    // 本来ならstateに応じて処理分岐をするところだが、
    // 現状ではパンチアクションしかないため、ベタ書きしている
    this.actors.playerSprite.tween.stop();
    this.actors.playerSprite.tween.start();
    return Promise.resolve();
  }
}