// @flow

import * as THREE from 'three';

/** レンダリング */
export type Render = {
  type: 'Render',
  scene: THREE.Scene,
  camera: THREE.Camera
};