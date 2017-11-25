// @flow
import GameObjects from './game-objects';

/**
 * リサイズ処理を行う
 * 本関数は引数をgameObjectsを変更するという副作用がある
 *
 * @param gameObjects ゲームオブジェクト
 */
export function resize(gameObjects: GameObjects) {
  gameObjects.camera.aspect = window.innerWidth / window.innerHeight;
  gameObjects.camera.updateProjectionMatrix();
}