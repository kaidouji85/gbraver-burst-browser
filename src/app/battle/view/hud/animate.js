// @flow
import {GameObjects} from './game-objects';
import {MESH_WIDTH, MESH_HEIGHT} from '../../../../gauge/index';

/**
 * アニメーション処理を実施する
 * 本関数は引数をgameObjectsを変更するという副作用がある
 *
 * @param gameObjects ゲームオブジェクト
 */
export function animate(gameObjects: GameObjects) {
  gameObjects.playerGauge.mesh.position.x = (window.innerWidth - MESH_WIDTH) / 2;
  gameObjects.playerGauge.mesh.position.y = (window.innerHeight - MESH_HEIGHT) / 2;

  gameObjects.enemyGauge.mesh.position.x = (-window.innerWidth + MESH_WIDTH) / 2;
  gameObjects.enemyGauge.mesh.position.y = (window.innerHeight - MESH_HEIGHT) / 2;
}