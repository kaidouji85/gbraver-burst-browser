// @flow
import type {Resources} from '/../../common/resource-manager';
import type {State} from '../state';
import GameObjects from './game-objects';
import {animate} from './animate';
import {resize} from './resize';

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

  /**
   * 状態変更時の処理
   *
   * @param state 画面状態
   * @return 結果を返すPromise
   */
  update(state: State): Promise<void> {
    // 本来ならstateに応じて処理分岐をするところだが、
    // 現状ではパンチアクションしかないため、ベタ書きしている
    this.gameObjects.playerSprite.tween.stop();
    this.gameObjects.playerSprite.tween.start();
    return Promise.resolve();
  }
}