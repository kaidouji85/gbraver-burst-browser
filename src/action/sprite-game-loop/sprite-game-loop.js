// @flow

import * as THREE from "three";

// TODO 削除する
/** スプライトのゲームループ */
export type SpriteGameLoop = {
  type: 'SpriteGameLoop',
  time: DOMHighResTimeStamp,
  camera: THREE.Camera
};