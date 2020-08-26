// @flow

import * as THREE from 'three';
import type {SafeAreaInset} from "../../safe-area/safe-area-inset";

/** レンダリングの直前 */
export type PreRender = {
  type: 'PreRender',
  camera: typeof THREE.Camera,
  rendererDOM: HTMLElement,
  safeAreaInset: SafeAreaInset,
}