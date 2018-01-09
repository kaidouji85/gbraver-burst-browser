// @flow

import * as THREE from "three";

export interface Stage {
  gameLoop(camera: THREE.Camera): void;
  getThreeJsObjects(): THREE.Object;
}