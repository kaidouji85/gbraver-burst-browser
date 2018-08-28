// @flow

import * as THREE from "three";

/** スプライトのゲームループ */
export type SpriteGameLoop = {
  type: 'SpriteGameLoop',
  time: DOMHighResTimeStamp,
  camera: THREE.Camera
};