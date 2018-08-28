// @flow

import * as THREE from "three";

export interface Stage {
  getThreeJsObjects(): THREE.Object;
}