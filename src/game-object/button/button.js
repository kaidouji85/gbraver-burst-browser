// @flow

import * as THREE from "three";

/** ボタンのゲームオブジェクト */
export interface Button {
  gameLoop(): void;
  getThreeJsObjects(): THREE.Mesh[];
  mouseDown(raycaster: THREE.Raycater): void;
}