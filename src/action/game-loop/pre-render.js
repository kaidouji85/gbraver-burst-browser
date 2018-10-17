// @flow

import * as THREE from 'three';

export type PreRender = {
  type: 'PreRender',
  camera: THREE.Camera
}