// @flow

import * as THREE from 'three';

/** レンダリング */
export type Render = {
  type: 'Render',
  scene: typeof THREE.Scene,
  camera: typeof THREE.Camera
};