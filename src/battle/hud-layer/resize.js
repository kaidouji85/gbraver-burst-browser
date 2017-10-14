// @flow
import {GameObjects} from './game-objects';

/**
 * リサイズ処理を行う
 * 本関数は引数をgameObjectsを変更するという副作用がある
 *
 * @param gameObjects ゲームオブジェクト
 */
export function resize(gameObjects: GameObjects) {
  gameObjects.camera.left = -window.innerWidth/2;
  gameObjects.camera.right = window.innerWidth/2;
  gameObjects.camera.top = window.innerHeight/2;
  gameObjects.camera.bottom = -window.innerHeight/2;
  gameObjects.camera.updateProjectionMatrix();
}