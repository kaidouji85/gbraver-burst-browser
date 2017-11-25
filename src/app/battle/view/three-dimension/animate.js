// @flow
import GameObjects from './game-objects';

/**
 * アニメーション処理を実施する
 * 本関数は引数をgameObjectsを変更するという副作用がある
 *
 * @param gameObjects ゲームオブジェクト
 */
export function animate(gameObjects: GameObjects) {
  gameObjects.battleField.animate(gameObjects.camera);
  gameObjects.playerSprite.animate(gameObjects.camera);
  gameObjects.enemySprite.animate(gameObjects.camera);
}