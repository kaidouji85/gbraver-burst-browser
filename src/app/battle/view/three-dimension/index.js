// @flow
import {ThreeDimensionObjects} from './game-objects/index';
import type {Resources} from "../../../../resource/resource-manager";
import type {BattleAppState} from "../../state";

/**
 * 3D空間のレイヤー
 */
export class ThreeDimensionLayer {
  /** 関連する全オブジェクト */
  gameObjects: ThreeDimensionObjects;

  constructor(props: {resources: Resources, state: BattleAppState}) {
    this.gameObjects = new ThreeDimensionObjects(props);
  }

  /** ゲームループでの処理 */
  animate() {
    this.gameObjects.battleField.animate(this.gameObjects.camera);
    this.gameObjects.playerSprite.animate(this.gameObjects.camera);
    this.gameObjects.enemySprite.animate(this.gameObjects.camera);
  }

  /** ウインドウリサイズ時の処理 */
  resize() {
    this.gameObjects.camera.aspect = window.innerWidth / window.innerHeight;
    this.gameObjects.camera.updateProjectionMatrix();
  }
}