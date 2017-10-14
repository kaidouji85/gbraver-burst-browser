// @flow
import type {Resources} from '../../resource/resource-manager';
import {GameObjects} from './game-objects';
import {animate} from './animate';
import {resize} from './resize';

/** Head Up Display(HUD)のレイヤー */
export default class HudLayer {
  /** 本レイヤーで使用するThree.js関連オブジェクト */
  gameObjects: GameObjects;

  constructor(props: {resources: Resources}) {
    this.gameObjects = new GameObjects({resources: props.resources});
  }

  /** ゲームループでの処理 */
  animate() {
    animate(this.gameObjects);
  }

  /** リサイズ時の処理 */
  resize() {
    resize(this.gameObjects);
  }
}