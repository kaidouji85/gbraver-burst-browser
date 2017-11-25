// @flow
import GameObjects from './game-objects';
import {animate} from './animate';
import {resize} from './resize';
import type {Resources} from "../../../../resource/resource-manager";

/**
 * 3D空間のレイヤー
 */
export default class Battle {
  /** 関連する全オブジェクト */
  gameObjects: GameObjects;

  constructor(props: {resources: Resources}) {
    this.gameObjects = new GameObjects(props);
  }

  /** ゲームループでの処理 */
  animate() {
    animate(this.gameObjects);
  }

  /** ウインドウリサイズ時の処理 */
  resize() {
    resize(this.gameObjects);
  }
}