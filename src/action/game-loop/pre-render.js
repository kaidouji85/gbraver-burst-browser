// @flow

import * as THREE from 'three';

/** レンダリングの直前 */
export type PreRender = {
  type: 'PreRender',
  camera: THREE.Camera,
  rendererDOM: HTMLElement,
}