// @flow

import * as THREE from "three";

/** ボタンのゲームオブジェクト */
export interface Button {
  gameLoop(time: DOMHighResTimeStamp): void;
  getThreeJsObjects(): THREE.Mesh[];
  mouseDown(raycaster: THREE.Raycater): void;
}